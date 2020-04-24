import Email from "~/app/user/domain/values/Email"
import { ValidationError } from "~/core/domain/errors/ValidationError"

export default class EmailAlreadyExistsError extends ValidationError {
  constructor(email: Email) {
    super(`User with email ${email.unsafeRawValue} already exists`)
  }
}
