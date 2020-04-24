import { Either } from "monet"
import Value from "~/core/domain/values/AbstractValue"

export default class UserPassword extends Value<string> {
  protected unsafeRawValue: string
  protected value: Either<Error, string>

  constructor(password: string) {
    super()
    this.unsafeRawValue = password

    if (!password) {
      this.value = Either.left(Error("Password should not be empty"))
      return
    }

    if (password.length < 6) {
      this.value = Either.left(Error("Password too weak"))
      return
    }

    if (password.length > 255) {
      this.value = Either.left(Error("Password too long"))
      return
    }

    this.value = Either.right(password)
  }

  hashWith(hash: (pass: string) => string) {
    this.value = this.value.map(hash)
  }
}
