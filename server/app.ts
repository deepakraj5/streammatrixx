import { Application } from "./deps.ts";
import { config } from './deps.ts'
import './src/db/index.ts'
import userController from './src/api/user/controller/index.ts'

// inint deno app
const app = new Application()

// env
const env = config()

// port
const PORT = parseInt(env.PORT) || 5000

// body parser
// app.use()


app.use(userController.routes())
    .use(userController.allowedMethods())



// start server
await app.listen({ port: PORT })