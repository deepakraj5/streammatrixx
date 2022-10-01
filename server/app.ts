import { Application } from "./deps.ts";
import { config } from './deps.ts'
import './src/db/index.ts'
import userController from './src/api/user/controller/index.ts'
import playListController from './src/api/playlist/controller/index.ts'

// inint deno app
const app = new Application()

// env
const env = config()

// port
const PORT = parseInt(env.PORT) || 5000


app.use(userController.routes())
    .use(userController.allowedMethods())

app.use(playListController.routes())
    .use(playListController.allowedMethods())


console.log(`server upon port ${PORT}`)

// start server
await app.listen({ port: PORT })