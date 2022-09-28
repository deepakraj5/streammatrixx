import { Client } from "../../deps.ts";
import { config } from "../../deps.ts"

const env = config()

// config for db client
const client = new Client({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    host_type: "tcp",
    hostname: env.DB_HOSTNAME,
    database: env.DB_DATABASE,
    tls: {
        enabled: false
    }
})

// connect to db
// await client.connect()

export default client