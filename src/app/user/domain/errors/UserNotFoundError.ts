import { NotFoundError } from "~/core/domain/errors/NotFoundError"

export default class UserNotFoundError extends NotFoundError {
  constructor() {
    super("User not found")
  }
}
