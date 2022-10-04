import client from '../../../db/index.ts'
import { InsertVideoURLDTO } from '../dto/index.ts'


// insert video url
const rInsertVideoURL = async (payload: InsertVideoURLDTO) => {
    try {
        
        const response = await client.queryObject(
            `INSERT INTO videos (user_id, playlist_id, url, title, description) 
                VALUES (${payload.userId}, ${payload.playListId}, '${payload.url}', '${payload.title}', '${payload?.description}')`
        )

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


export { rInsertVideoURL }