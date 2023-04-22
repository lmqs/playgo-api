import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/presentation/validation/validators/compare-fields-validation'
import { Validation } from '@/presentation/protocols'

const makeSut = (): Validation => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')
  return sut
}

describe('RequiredFieldValidation', () => {
  test('Should return a InvalidParamError if validation fails', async () => {
    const sut = makeSut()
    const error = await sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('Should not return if validation success', async () => {
    const sut = makeSut()
    const error = await sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
