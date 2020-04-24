import { Either, Right } from "monet"
import Value from "~/core/domain/values/AbstractValue"

export default class Image extends Value<null> {
  readonly unsafeRawValue: null = null
  readonly value: Either<Error, null> = Right(null)
}
