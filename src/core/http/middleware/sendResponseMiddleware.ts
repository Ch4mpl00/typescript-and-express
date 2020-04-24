import { Request, Response } from "express"
import { NotFoundError } from "~/core/domain/errors/NotFoundError"
import { ValidationError } from "~/core/domain/errors/ValidationError"
import { ResultPayload } from "~/core/http/middleware"

export default (
  payload: ResultPayload,
  req: Request,
  res: Response,
  next: Function
) => {
  if (payload.result.isLeft()) {
    const err = payload.result.left()
    let errors = Array.isArray(err) ? err : [err]

    if (errors[0] instanceof ValidationError) {
      res.statusCode = 422
    } else if (errors[0] instanceof NotFoundError) {
      res.statusCode = 404
    } else {
      res.statusCode = 500
    }

    res.json({
      "Error": errors.map((e: Error) => e.message),
      err: err
    })

    next(payload)

    return
  }

  res.statusCode = payload.status ?? 200
  res.json(payload.result.right())

  next(payload)
}
