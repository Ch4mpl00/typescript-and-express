import { Left, Right } from "monet"
import { User } from "~/app/user/domain/entity/User"
import { EmailAndPasswordDoNotMatch } from "~/app/user/domain/errors/emailAndPasswordDoNotMatch"
import UserNotFoundError from "~/app/user/domain/errors/userNotFoundError"
import Email from "~/app/user/domain/values/Email"
import { userToView } from "~/app/user/infra/mapping/userToApiView"
import { IUserRepository } from "~/app/user/infra/storage/types"
import { ProceedWithResult } from "~/core/infra/types"

export default (
  userRepository: IUserRepository,
  checkPassword: (password: string) => (hash: string) => boolean,
  makeToken: (data: object) => string
) => (data: { email?: string, password?: string }) => (next: ProceedWithResult) => {

  const email = new Email(data.email ?? "")

  const tryLogin = (user: User) => (password: string) => (hash: string) =>
    checkPassword(password)(hash)
      ? next(Right(userToView(user, makeToken(userToView(user)))))
      : next(Left(new EmailAndPasswordDoNotMatch()))

  email
    .map(email => userRepository.findOne({ email }))
    .map(async u => (await u)
      .map(user => {
        tryLogin(user)(data.password ?? "")(user.password.unsafeGetValue())
        return user
      })
      .orElseRun(() => next(Left(new UserNotFoundError())))
    )
    .leftMap(err => next(Left(err)))
}
