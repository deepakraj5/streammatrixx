import client from "../db/index.ts"
import { Context, Jose, config } from '../../deps.ts'
import { stringToUnit8Array } from "../utils/jwt.ts"
import { User } from "../api/user/dto/index.ts"

// env
const env = config()

const auth = async (ctx: Context, next: () => any) => {
    try {
        
        // jwt from header
        const token = ctx.request.headers.get("Authorization")?.split("Bearer ")[1]

        const key: Uint8Array = stringToUnit8Array(env.JWT_SECRET)

        // verify token
        const verifiedToken = await Jose.jwtVerify(token as string, key)

        if(!verifiedToken) throw new Error()

        const { rows } = await client.queryObject(
            `SELECT * FROM users WHERE id = ${verifiedToken.payload?.id}`
        )

        if(rows.length === 0) throw new Error()

        const user: User = rows[0] as unknown as User

        // save current user to state
        ctx.state.user = user

        await next()

    } catch (error) {
        console.log(error)
        ctx.response.status = 401
        return ctx.response.body = {
            message: "Unauthorized"
        }
    }
}

export default auth