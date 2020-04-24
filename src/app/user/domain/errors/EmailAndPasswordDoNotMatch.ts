import { ValidationError } from "~/core/domain/errors/ValidationError"

export class EmailAndPasswordDoNotMatch extends ValidationError {
  constructor() {
    super("Wrong email or password")
  }
}
