import { Either } from "monet"
import { User } from "~/app/user/domain/entity/User"
import Email from "~/app/user/domain/values/Email"
import ImageLink from "~/app/user/domain/values/ImageLink"
import UserBio from "~/app/user/domain/values/UserBio"
import UserID from "~/app/user/domain/values/UserID"
import Username from "~/app/user/domain/values/Username"
import UserPassword from "~/app/user/domain/values/UserPassword"
import { ValidationError } from "~/core/domain/errors/ValidationError"

export const userDataToUser = (data: { [key: string]: any }): Either<ValidationError[], User> => {

  const user = {
    id: new UserID(data.id ?? null),
    email: new Email(data.email ?? ""),
    username: new Username(data.username ?? ""),
    password: new UserPassword(data.password ?? ""),
    bio: new UserBio(data.bio ?? ""),
    image: new ImageLink()
  }

  const errors = Object.values(user)
    .filter(prop => prop.isWrong())
    .map(prop => prop.unsafeGetError())

  return errors.length > 0
    ? Either.Left(errors)
    : Either.Right(user as User)
}
