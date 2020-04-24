import { Either, Maybe } from "monet"
import { Collection, ObjectID } from "mongodb"
import ID from "~/core/domain/values/ID"
import { DatabaseOperationFailedError } from "~/core/infra/types"

const getObjectID = (id: string): null | ObjectID => {
  try {
    return new ObjectID(id)
  } catch (e) {
    return null
  }
}

export const Crud = (collection: Collection) => ({
  findOneById: (id: ID) => {
    return collection.findOne({ "_id": getObjectID(id.unsafeRawValue.toString()) })
      .then(result => Maybe.fromFalsy(result))
  },

  findOneBy: (findBy: { [key: string]: string | number | null }) => {
    return collection.findOne(findBy)
      .then(result => Maybe.fromFalsy(result))
  },

  persist: async <T>(document: T) => {
    try {
      const insertRes = await collection.insertOne(document)
      const res = await collection.findOne(insertRes.insertedId)

      return Either.right<DatabaseOperationFailedError, T>(res)
    } catch (e) {
      return Either.left<DatabaseOperationFailedError, T>(e as DatabaseOperationFailedError)
    }
  }
})
