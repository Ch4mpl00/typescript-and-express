import { Either, Left, Right } from "monet"
import Value from "~/core/domain/values/AbstractValue"

export default class String255 extends Value<string> {
  readonly value: Either<Error, string>
  readonly unsafeRawValue: string

  protected message(s: string) {
    return `'${s}' is not valid NotEmptyString255`
  }

  constructor(s: string) {
    super()
    this.unsafeRawValue = s
    this.value = s.length <= 255
      ? Right(s)
      : Left(Error(this.message(s)))
  }
}
