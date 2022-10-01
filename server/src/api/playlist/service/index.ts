import { DeletePlayListById, PlayListByIdDTO, PlayListDTO } from '../dto/index.ts'
import { rCreatePlayList, rDeletePlayListById, rListPlayList, rListPlayListById } from '../repo/index.ts'



/**
 * Create playlist
 * @params {PlayListDTO} playlist
 * @returns response
 */
const createPlayList = async (payload: PlayListDTO) => {
    try {
        
        const response = await rCreatePlayList(payload)

        if(response?.rowCount === 1) return { message: "playlist created" }
        else return { message: "not able to create playlist" }

    } catch (error) {
        console.log(error)
        return error
    }
}


/**
 * List playlist
 * @params userId number
 * @returns response
 */
 const listPlayList = async (userId: number) => {
    try {
        
        const { rows } = await rListPlayList(userId)

        return rows

    } catch (error) {
        console.log(error)
        return error
    }
}


/**
 * List playlist by id
 * @params userId number, playListId number
 * @returns response
 */
 const listPlayListById = async (payload: PlayListByIdDTO) => {
    try {
        
        const { rows } = await rListPlayListById(payload)

        return rows

    } catch (error) {
        console.log(error)
        return error
    }
}


/**
 * Delete playlist by id
 * @params userId number, playListid number
 * @returns response
 */
 const deletePlayList = async (payload: DeletePlayListById) => {
    try {
        
        const response = await rDeletePlayListById(payload)

        return response

    } catch (error) {
        console.log(error)
        return error
    }
}


export { createPlayList, listPlayList, listPlayListById, deletePlayList }