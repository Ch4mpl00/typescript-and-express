import { Either } from "monet"
export type ProceedWithResult = (res: Either<Error | Error[], any>, event?: IEvent) => void

export interface IEvent {
  getName: () => string
}

export class DatabaseOperationFailedError extends Error {
}
