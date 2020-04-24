import { Either, Maybe } from "monet"
import { User } from "~/app/user/domain/entity/User"
import Email from "~/app/user/domain/values/Email"
import UserID from "~/app/user/domain/values/UserID"
import { DatabaseOperationFailedError } from "~/core/infra/types"

export interface IUserRepository {
  persist: (user: User) => Promise<Either<DatabaseOperationFailedError, User>>
  findOneById: (id: UserID) => Promise<Maybe<User>>
  findOne: (by: { [key: string]: string | number }) => Promise<Maybe<User>>
  emailExists: (email: Email) => Promise<boolean>
}
