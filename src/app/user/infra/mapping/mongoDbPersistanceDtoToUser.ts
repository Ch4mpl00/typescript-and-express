import { User } from "~/app/user/domain/entity/User"
import Email from "~/app/user/domain/values/Email"
import ImageLink from "~/app/user/domain/values/ImageLink"
import UserBio from "~/app/user/domain/values/UserBio"
import UserID from "~/app/user/domain/values/UserID"
import Username from "~/app/user/domain/values/Username"
import UserPassword from "~/app/user/domain/values/UserPassword"
import { UserMongoDbPersistenceDto } from "~/app/user/infra/repository/dto/UserMongoDbPersistenceDto"

export const persistenceDtoToUser = (userPersistenceDto: UserMongoDbPersistenceDto): User => {
  return {
    // @ts-ignore
    id: new UserID(userPersistenceDto._id),
    email: new Email(userPersistenceDto.email),
    username: new Username(userPersistenceDto.username),
    password: new UserPassword(userPersistenceDto.password ?? ""),
    bio: new UserBio(userPersistenceDto.bio),
    image: new ImageLink()
  } as unknown as User
}
