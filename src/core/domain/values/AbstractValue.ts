import { Either } from "monet"

export default abstract class Value<T> {
  protected value!: Either<Error, T>
  protected unsafeRawValue!: T

  map<Y>(fn: (val: T) => Y) {
    return this.value.map(fn)
  }

  isCorrect() {
    return this.value.isRight()
  }

  isWrong() {
    return this.value.isLeft()
  }

  unsafeGetValue() {
    return this.value.right()
  }

  unsafeGetError() {
    return this.value.left()
  }
}
