import { Left, Right } from "monet"
import UserNotFoundError from "~/app/user/domain/errors/userNotFoundError"
import UserID from "~/app/user/domain/values/UserID"
import { userToView } from "~/app/user/infra/mapping/userToApiView"
import { IUserRepository } from "~/app/user/infra/storage/types"
import { ProceedWithResult } from "~/core/infra/types"

export default (
  userRepository: IUserRepository
) => (id: number | string) => async (next: ProceedWithResult) => {
  (await userRepository.findOneById(new UserID(id)))
    .map(userToView)
    .cata(
      () => next(Left(new UserNotFoundError())),
      result => next(Right(result))
    )
}
