export type UserMongoDbPersistenceDto = {
  _id?: number | string
  email: string
  password: null | string
  username: string
  bio: string
  image: string | null
}
