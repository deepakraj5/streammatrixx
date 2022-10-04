import client from "../../../db/index.ts";
import { Login, NewUser, User } from "../dto/index.ts";
import { hashSync, compareSync, Jose, config } from '../../../../deps.ts'
import { stringToUint8Array } from "../../../utils/core.ts";

// env
const env = config()

// create new database
const newDatabase = async () => {
    try {
        
        const response = await client.queryObject(
            `CREATE TABLE users (
                id int primary key,
                name varchar(24),
                email varchar(24),
                password varchar(24),
                isActive bool
            )`
        )

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}



/**
 * Signup new user
 * @params {NewUser} payload
 * @returns response
 */
const newUser = async (payload: NewUser) => {
    try {

        payload.password = hashSync(payload.password)
        payload.isActive = false

        const response = await client.queryObject(
            `INSERT INTO users (name, email, password, isActive) VALUES ('${payload.name}', '${payload.email}', '${payload.password}', ${payload.isActive})`
        )

        if(response?.rowCount === 1) return { message: "user created" }
        else return { message: "not able to create user" }

    } catch (error) {
        console.log(error)
        return error
    }
}



/**
 * User login
 * @param {Login} payload 
 * @returns user
 */
const login = async (payload: Login) => {
    try {

        const { rows } = await client.queryObject(
            `SELECT * FROM users WHERE email = '${payload.email}'`
        )

        if(rows.length === 0) return ("Wrong email or password")

        // validate password
        const user: User = rows[0] as unknown as User
        const checkPassword = compareSync(payload.password, user.password)

        if(!checkPassword) return new Error("Wrong email or password")

        // create jwt token
        const key: Uint8Array = stringToUint8Array(env.JWT_SECRET)

        const token = await new Jose.SignJWT({ id: user.id, email: user.email })
                                    .setExpirationTime('2h')
                                    .setIssuedAt()
                                    .setProtectedHeader({ alg: "HS256" })
                                    .sign(key)

        // deno-lint-ignore no-unused-vars
        const { password, ...restParams } = user

        return {
            user: restParams,
            token
        }

    } catch (error) {
        console.log(error)
        return error
    }
}

export { newUser, newDatabase, login }