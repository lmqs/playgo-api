import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}
const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error> {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

describe('ValidationComposite', () => {
  test('Should return an Error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('field')))
    const error = await sut.validate({ field: 'field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more then one validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(Promise.resolve(new InvalidParamError('field')))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('field')))
    const error = await sut.validate({ field: 'field' })
    expect(error).toEqual(new InvalidParamError('field'))
  })
  test('Should not return if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'field' })
    expect(error).toBeFalsy()
  })
})
