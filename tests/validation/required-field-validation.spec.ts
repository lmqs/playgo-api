import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/presentation/validation/validators'

const makeSut = (): Validation => {
  const sut = new RequiredFieldValidation('field')
  return sut
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', async () => {
    const sut = makeSut()
    const error = await sut.validate({ name: 'email' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation success', async () => {
    const sut = makeSut()
    const error = await sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
