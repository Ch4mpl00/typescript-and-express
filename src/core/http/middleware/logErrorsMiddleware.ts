import { Request, Response } from "express"
import { ResultPayload } from "~/core/http/middleware"

export default (log: (message: string, level: string, context: object) => void) => (
  payload: ResultPayload,
  req: Request,
  res: Response,
  next: Function
) => {

  payload.result.leftMap(err => {
    const e = Array.isArray(err) ? err : [err]
    e.map(e => {
      log(e.message, "ERROR", e)
    })

    return err
  })

  next(payload)
}
