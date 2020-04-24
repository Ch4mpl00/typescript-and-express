import { Either, Left, Right } from "monet"
import Value from "~/core/domain/values/AbstractValue"

export default class NotEmptyString255 extends Value<string> {
  readonly value: Either<Error, string>
  readonly unsafeRawValue: string

  protected message(s: string) {
    return `'${s}' is not valid NotEmptyString255`
  }

  constructor(s: string) {
    super()
    this.unsafeRawValue = s
    this.value = s.length > 0 && s.length <= 255
      ? Right(s)
      : Left(Error(this.message(s)))
  }
}
