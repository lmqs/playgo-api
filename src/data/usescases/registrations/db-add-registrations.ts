/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAccountRepository, ICategoryRepository } from '@/data/protocols/db'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { IRegistrationsAthleteWaitingRepository } from '@/data/protocols/db/registrations-athlete-waiting-repository'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { IRegistrationsWaitingRepository } from '@/data/protocols/db/registrations-waiting-repository'
import { LoadTournamentByIdRepository } from '@/data/protocols/db/tournament'
import { IAddRegistrations } from '@/domain/usecases/registration/add-registrations'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export class AddRegistrationsUseCase implements IAddRegistrations {
  constructor (
    private readonly categoryRepo: ICategoryRepository,
    private readonly tournamentRepo: LoadTournamentByIdRepository,
    private readonly accountRepo: IAccountRepository,
    private readonly registrationsRepo: IRegistrationsRepository,
    private readonly registrationsAthleteRepo: IRegistrationsAthleteRepository,
    private readonly registrationsWaitingRepo: IRegistrationsWaitingRepository,
    private readonly registrationsAthleteWaitingRepo: IRegistrationsAthleteWaitingRepository
  ) {}

  async add (data: IAddRegistrations.Params): Promise<IAddRegistrations.ResultObj> {
    const category = await this.categoryRepo.loadById(data.categoryId)
    if (category.deleted) throw new Error('Categoria não existente')

    const tournament = await this.tournamentRepo.loadById(category.tournamentId)
    if (tournament!.deleted) throw new Error('Torneio não existente')

    const dtFinalRegistrationTournament = new DateHandler().format(tournament!.dtFinalRegistration)
    const nowString = new DateHandler().formatDateToString(new Date())
    const nowDate = new DateHandler().format(nowString)
    if (nowDate > dtFinalRegistrationTournament) throw new Error('Inscrições finalizadas')

    const athletes = data.athletesId.split(',')
    const isAmountAthletes = athletes.length > parseInt(category.numberAthletesRegistration)
    if (isAmountAthletes) throw new Error('Quantidade de atletas maior que o permitido para essa categoria.')

    const usersValid = await Promise.all(athletes.map(async (athleteId) => {
      return await this.accountRepo.loadById(athleteId)
    }))
    const isUsersInvalid = usersValid.includes(undefined)
    if (isUsersInvalid) throw new Error('Usuário inválido')

    const categories = await this.registrationsRepo.loadByCategory(category.id)
    if (categories.length >= parseInt(category.numberAthletes)) {
      const registrationWaiting = await this.registrationsWaitingRepo.add({ categoryId: category.id })

      await Promise.all(usersValid.map(async (athlete) => {
        await this.registrationsAthleteWaitingRepo.add({ registrationsWaitingId: registrationWaiting.id, athleteId: athlete!.id })
      }))
      throw new Error('Vagas esgotadas, sua inscrição foi para a lista de espera.')
    }

    const usersRegistered = await Promise.all(athletes.map(async (athleteId: string) => {
      return await this.registrationsAthleteRepo.loadByCategoryAndUser({ categoryId: data.categoryId, athleteId })
    }))
    const unionUsersRegistered = usersRegistered.flat()
    if (unionUsersRegistered.length) {
      const userRegister = await this.accountRepo.loadById(unionUsersRegistered[0].athlete_id)
      throw new Error(`Usuário ${userRegister!.name} já cadastrado nessa categoria.`)
    }

    const registration = await this.registrationsRepo.add({ categoryId: data.categoryId, registrationDate: 'now()' })
    try {
      const result = await Promise.all(usersValid.map(async (athlete) => {
        const athleteObj = await this.registrationsAthleteRepo.add(
          { registrationsId: registration.id, athleteId: athlete!.id, isPay: data.isPay || false }
        )
        return { athleteObj, userObj: athlete }
      }))

      return result.map((item: any) => ({
        id: item.athleteObj.id,
        isPay: item.athleteObj.isPay,
        deleted: item.athleteObj.deleted || false,
        registrationsId: item.athleteObj.registrationsId,
        athlete: {
          id: item.userObj.id,
          name: item.userObj.name
        }
      }))
    } catch (error) {
      await this.registrationsAthleteRepo.removeByRegistration(registration.id)
      await this.registrationsRepo.remove(registration.id)
      throw error
    }
  }
}
