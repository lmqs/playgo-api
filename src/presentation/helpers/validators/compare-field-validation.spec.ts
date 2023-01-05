import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'
import { Validation } from './validation'

const makeSut = (): Validation => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')
  return sut
}

describe('RequiredFieldValidation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
