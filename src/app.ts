import bodyParser from "body-parser"
import express from "express"
import "module-alias/register"
import { Either } from "monet"
import { MongoClient, MongoError } from "mongodb"
import { userModule } from "~/app/user/module"
import handleEventsMiddleware from "~/core/http/middleware/handleEventsMiddleware"
import logErrorsMiddleware from "~/core/http/middleware/logErrorsMiddleware"
import sendResponseMiddleware from "~/core/http/middleware/sendResponseMiddleware"
import logToConsole from "~/core/infra/logging/logToConsole"
import { IEvent } from "~/core/infra/types"

// TODO: use .env for env variables

const app = express()
app.set("port", process.env.PORT || 8080)
app.use(bodyParser.json())

// Use connect method to connect to the server
MongoClient.connect("mongodb://root:example@127.0.0.1:27017", {
  reconnectTries: 60,
  reconnectInterval: 1000
}, function (err: MongoError, client: MongoClient) {
  console.log("Connected successfully to server")
  if (err) {
    throw err
  }

  const db = client.db("fpddd")

  const proceedWithResult = (next: Function) =>
    (result: Either<Error | Error[], any>, event: IEvent) => next({ result, event })

  const configuredUserModule = userModule(db)

  app.post("/api/auth", (req, res, next) =>
    configuredUserModule.useCases.authUser(req.body)(proceedWithResult(next))
  )

  app.post("/api/users", (req, res, next) =>
    configuredUserModule.useCases.createUser(req.body)(proceedWithResult(next))
  )

  app.get("/api/users/:id", (req, res, next) =>
    configuredUserModule.useCases.getUser(req.params.id)(proceedWithResult(next))
  )

  app.use(logErrorsMiddleware(logToConsole))
  app.use(handleEventsMiddleware(configuredUserModule.listeners))
  app.use(sendResponseMiddleware)
})

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  )
  console.log("  Press CTRL-C to stop\n")
})
