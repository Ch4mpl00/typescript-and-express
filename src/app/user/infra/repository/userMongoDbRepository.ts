import { Collection } from "mongodb"
import { User } from "~/app/user/domain/entity/User"
import Email from "~/app/user/domain/values/Email"
import UserID from "~/app/user/domain/values/UserID"
import { persistenceDtoToUser } from "~/app/user/infra/mapping/mongoDbPersistanceDtoToUser"
import { userToPersistenceDto } from "~/app/user/infra/mapping/userToMongoDbPersistenceDto"
import { IUserRepository } from "~/app/user/infra/storage/types"
import { Crud } from "~/core/infra/storage/mongoCrud"

export const userMongoDbRepository = (collection: Collection): IUserRepository => ({
  persist: (user: User) => Crud(collection)
    .persist(userToPersistenceDto(user))
    .then(user => user.map(persistenceDtoToUser)),

  findOneById: (id: UserID) => Crud(collection)
    .findOneById(id)
    .then(user => user.map(persistenceDtoToUser)),

  findOne: (findBy) => Crud(collection)
    .findOneBy(findBy)
    .then(user => user.map(persistenceDtoToUser)),

  emailExists: async (email: Email) => email.value.isRight()
    ? (await Crud(collection).findOneBy({ email: email.value.right() })).isSome()
    : Promise.resolve(false)
})
