import { IEvent } from "~/core/infra/types"

export class ResourceCreated implements IEvent {
  getName = () => "ResourceCreated"
}
