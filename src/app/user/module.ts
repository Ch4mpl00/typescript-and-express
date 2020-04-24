import * as jwt from "jsonwebtoken"
import { Db } from "mongodb"
import { UserCreated } from "~/app/user/events/userCreated"
import { userMongoDbRepository } from "~/app/user/infra/repository/userMongoDbRepository"
import { sendNewUserEmail } from "~/app/user/listeners/sendNewUserEmail"
import authorizeUserByEmailAndPasswordUserCase from "~/app/user/useCases/authorizeUserByEmailAndPasswordUserCase"
import createUser from "~/app/user/useCases/createUserUseCase"
import getUser from "~/app/user/useCases/getUserUseCase"
import { comparePassword, hashUserPassword } from "~/core/infra/hashPassword"
import { setResourceCreatedHttpStatus } from "~/core/listeners/setResourceCreatedHttpStatus"

export const userModule = (
  mongo: Db
) => {

  const repository = userMongoDbRepository(mongo.collection("users"))

  return {
    useCases: {
      createUser: createUser(repository, hashUserPassword),
      getUser: getUser(repository),
      authUser: authorizeUserByEmailAndPasswordUserCase(
        repository,
        comparePassword,
        (user: object) => jwt.sign(user, "verylongsecretphrase!!!")
      )
    },
    listeners: [
      { on: UserCreated, handler: sendNewUserEmail },
      { on: UserCreated, handler: setResourceCreatedHttpStatus }
    ]
  }
}
