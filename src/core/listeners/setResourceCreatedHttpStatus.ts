import { UserCreated } from "~/app/user/events/userCreated"
import { ResultPayload } from "../http/middleware"

export const setResourceCreatedHttpStatus = (userCreated: UserCreated, payload: ResultPayload) => {
  payload.status = 201
}
