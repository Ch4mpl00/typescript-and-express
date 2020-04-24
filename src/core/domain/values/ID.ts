import { Either, Right } from "monet"
import Value from "~/core/domain/values/AbstractValue"

export default class ID extends Value<number | string> {
  readonly unsafeRawValue: number | string
  readonly value: Either<Error, number | string>

  constructor(value: number | string) {
    super()
    this.value = Right(value)
    this.unsafeRawValue = value
  }
}
