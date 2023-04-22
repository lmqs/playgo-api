import { InvalidParamError } from '@/presentation/errors'
import { mockEmailValidator } from '../mocks/mock-email-validator'
import { EmailValidator } from '@/presentation/validation/protocols/email-validator'
import { EmailValidation } from '@/presentation/validation/validators/email-validation'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('any_field', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const email = 'any@email.com.br'
    const error = await sut.validate({ any_field: email })
    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const email = 'any@email.com.br'
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    await sut.validate({ any_field: email })
    expect(emailValidatorSpy).toBeCalledWith(email)
  })

  test('Should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const email = 'any@email.com.br'

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.validate({ any_field: email })
    await expect(promise).rejects.toThrow()
  })
})
