import Email from "~/app/user/domain/values/Email"
import ImageLink from "~/app/user/domain/values/ImageLink"
import UserBio from "~/app/user/domain/values/UserBio"
import UserID from "~/app/user/domain/values/UserID"
import Username from "~/app/user/domain/values/Username"
import UserPassword from "~/app/user/domain/values/UserPassword"

export type User = {
  id: UserID,
  email: Email,
  password: UserPassword,
  username: Username,
  bio: UserBio,
  image: ImageLink
}
