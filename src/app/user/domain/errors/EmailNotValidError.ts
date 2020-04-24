import { ValidationError } from "~/core/domain/errors/ValidationError"

export default class EmailNotValidError extends ValidationError {
  constructor(readonly email: string, readonly message: string) {
    super(message)
  }
}
