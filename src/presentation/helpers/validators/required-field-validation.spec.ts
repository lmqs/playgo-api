import { MissingParamError } from '../../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import { Validation } from './validation'

const makeSut = (): Validation => {
  const sut = new RequiredFieldValidation('field')
  return sut
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'email' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
