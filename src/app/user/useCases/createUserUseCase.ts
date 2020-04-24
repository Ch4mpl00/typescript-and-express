import { Left, Right } from "monet"
import { User } from "~/app/user/domain/entity/User"
import EmailAlreadyExistsError from "~/app/user/domain/errors/emailAlreadyExistsError"
import { UserCreated } from "~/app/user/events/userCreated"
import { userDataToUser } from "~/app/user/infra/mapping/userDataToUser"
import { userToView } from "~/app/user/infra/mapping/userToApiView"
import { IUserRepository } from "~/app/user/infra/storage/types"
import { ValidationError } from "~/core/domain/errors/ValidationError"
import { ProceedWithResult } from "~/core/infra/types"

export default (
  userRepository: IUserRepository,
  hashPassword: (pass: string) => string
) => (userData: object) => {
  return async (next: ProceedWithResult) => {
    const userFromData = userDataToUser(userData)

    const emailExists = userFromData.isRight()
      ? await userRepository.emailExists(userFromData.right().email)
      : false

    const failIfEmailAlreadyExists = (user: User) => emailExists
      ? Left<ValidationError[], User>([new EmailAlreadyExistsError(user.email)])
      : Right<ValidationError[], User>(user)

    const hashUserPassword = ((user: User) => {
      user.password.hashWith(hashPassword)
      return user
    })

    userFromData
      .bind(failIfEmailAlreadyExists)
      .map(hashUserPassword)
      .map(userRepository.persist)
      .cata(
        err => next(Left(err)),
        async u => (await u)
          .cata(
            err => next(Left(err)),
            user => next(Right(userToView(user)), new UserCreated(user))
          )
      )
  }
}
