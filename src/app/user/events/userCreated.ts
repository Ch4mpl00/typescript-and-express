import { User } from "~/app/user/domain/entity/User"
import { IEvent } from "~/core/infra/types"

export class UserCreated implements IEvent {
  constructor(readonly user: User) {
  }

  getName = () => "UserCreated"
}
