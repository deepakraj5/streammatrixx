import client from "../../../db/index.ts";
import { NewUser } from "../dto/index.ts";


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



// create new user
const newUser = async (payload: NewUser) => {
    try {

        console.log(`INSERT INTO user VALUES (${payload.id}, '${payload.name}', '${payload.email}', '${payload.password}', ${payload.isActive})`)
        
        const response = await client.queryObject(
            `INSERT INTO user VALUES (${payload.id}, '${payload.name}', '${payload.email}', '${payload.password}', ${payload.isActive})`
        )

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}

export { newUser, newDatabase }