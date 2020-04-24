import { User } from "~/app/user/domain/entity/User"
import { UserMongoDbPersistenceDto } from "~/app/user/infra/repository/dto/UserMongoDbPersistenceDto"

export const userToPersistenceDto = (user: User): UserMongoDbPersistenceDto => {
  return {
    _id: user.id.unsafeRawValue,
    email: user.email.unsafeRawValue,
    password: user.password.unsafeGetValue(),
    username: user.username.unsafeRawValue,
    bio: user.bio.unsafeRawValue,
    image: user.image.unsafeRawValue
  }
}
