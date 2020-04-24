import Email from "~/app/user/domain/values/Email"
import { UserCreated } from "~/app/user/events/userCreated"

const sendFakeEmail = (email: Email): Promise<string> => {
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`sent to ${email.unsafeRawValue}`)
      }, 1000)
    }
  )
}

export const sendNewUserEmail = (userCreated: UserCreated) => {
  sendFakeEmail(userCreated.user.email).then(res => console.log(res))
}
