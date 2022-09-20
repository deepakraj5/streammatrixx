import client from "../../../db/index.ts";
import { Login, NewUser, User } from "../dto/index.ts";
import { hashSync, compareSync, create, config } from '../../../../deps.ts'

// env
const env = config()

// create new database
const newDatabase = async () => {
    try {
        
        const response = await client.queryObject(
            `CREATE TABLE user (
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

        payload.password = hashSync(payload.password, '12')

        const response = await client.queryObject(
            `INSERT INTO user VALUES (${payload.id}, '${payload.name}', '${payload.email}', '${payload.password}', ${payload.isActive})`
        )

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}



/**
 * User login
 * @param {Login} payload 
 * @returns {User} user
 */
const login = async (payload: Login) => {
    try {

        const { rows } = await client.queryObject(
            `SELECT * FROM users WHERE email = ${payload.email}`
        )

        if(rows.length === 0) throw new Error("Wrong email or password")

        // validate password
        const user: User = rows[0] as unknown as User
        const checkPassword = compareSync(payload.password, user.password)

        if(!checkPassword) throw new Error("Wrong email or password")

        // create wt token
        // const token = await create({ alg: "HS256" }, { id: user.id, email: user.email }, env.JWT_SECRET)

        return user

    } catch (error) {
        console.log(error)
        return error
    }
}

export { newUser, newDatabase, login }