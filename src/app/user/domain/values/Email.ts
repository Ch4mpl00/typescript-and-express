import { Either, Left, Right } from "monet"
import EmailNotValidError from "~/app/user/domain/errors/EmailNotValidError"
import Value from "~/core/domain/values/AbstractValue"

export default class Email extends Value<string> {
  readonly value: Either<EmailNotValidError, string>
  readonly unsafeRawValue: string
  readonly message = (email: string) => `Email '${email}' is not valid`

  constructor(email: string) {
    super()

    this.unsafeRawValue = email
    this.value = Email.isValid(email)
      ? Right(email)
      : Left(new EmailNotValidError(email, this.message(email)))
  }

  static isValid(email: string): boolean {
    // Naive validation
    return email.length < 255
      && email.length > 3
      && /@/.test(email)
  }
}
