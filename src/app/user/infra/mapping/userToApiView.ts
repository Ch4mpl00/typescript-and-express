import { User } from "~/app/user/domain/entity/User"

export const userToView = (user: User, token?: string) => {
  return {
    user: {
      id: user.id.unsafeGetValue(),
      email: user.email.unsafeGetValue(),
      username: user.username.unsafeGetValue(),
      bio: user.bio.unsafeGetValue(),
      image: user.image.unsafeGetValue(),
      token: token
    }
  }
}
