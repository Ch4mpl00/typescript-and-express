import { Either } from "monet"
import { IEvent } from "~/core/infra/types"

export type ResultPayload = { result: Either<Error | Error[], any>, event?: IEvent, status?: number }
