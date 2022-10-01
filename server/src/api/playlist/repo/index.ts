import client from '../../../db/index.ts'
import { DeletePlayListById, PlayListByIdDTO, PlayListDTO } from '../dto/index.ts'


// create playlist
const rCreatePlayList = async (payload: PlayListDTO) => {
    try {
        
        const response = await client.queryObject(`
            INSERT INTO playlists (name, user_id) VALUES ('${payload.name}', ${payload.userId})
        `)

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


// list playlist
const rListPlayList = async (userId: number) => {
    try {
        
        const response = await client.queryObject(`
            SELECT * FROM playlists
                WHERE user_id = ${userId}
        `)

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


// list playlist by id
const rListPlayListById = async (payload: PlayListByIdDTO) => {
    try {
        
        const response = await client.queryObject(`
            SELECT * FROM playlists
                WHERE user_id = ${payload.userId}
                AND id = ${payload.id}
        `)

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


// delete playlist by id
const rDeletePlayListById = async (payload: DeletePlayListById) => {
    try {
        
        const response = await client.queryObject(`
            DELETE FROM playlists
                WHERE user_id = ${payload.userId}
                AND id = ${payload.id}
        `)

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


export { rCreatePlayList, rListPlayList, rListPlayListById, rDeletePlayListById }