import { Request, Response } from "express"
import { ResultPayload } from "~/core/http/middleware"

export default (listeners: { on: object, handler: Function }[]) => (
  payload: ResultPayload,
  req: Request,
  res: Response,
  next: Function
) => {

  if (payload.event === undefined) {
    next(payload)
    return
  }

  listeners
    // @ts-ignore
    .filter((listener: any) => listener.on.name === payload.event.constructor.name)
    .map((listener: any) => listener.handler(payload.event, payload))

  next(payload)
}
