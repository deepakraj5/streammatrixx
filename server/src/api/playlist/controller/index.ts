import { Router } from '../../../../deps.ts'
import auth from '../../../middleware/auth.ts'
import { DeletePlayListById, PlayListByIdDTO, PlayListDTO } from '../dto/index.ts'
import { createPlayList, deletePlayList, listPlayList, listPlayListById } from '../service/index.ts'

// router
const router = new Router({
    prefix: '/api'
})


// create playlist
router.post('/playlists', auth, async ctx => {
    try {
        
        const payload = ctx.request.body({ type: "json" })
        const body: PlayListDTO = await payload.value

        // user state
        const user = ctx.state.user

        body.userId = user?.id

        // response from server
        const response = await createPlayList(body)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})


// list playlist
router.get('/playlists', auth, async ctx => {
    try {

        // user state
        const user = ctx.state.user

        // response from server
        const response = await listPlayList(user?.id)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})



// list playlist by id
router.get('/playlists/:playListId', auth, async ctx => {
    try {
        
        // user state
        const user = ctx.state.user

        const body: PlayListByIdDTO = {
            userId: user?.id,
            id: parseInt(ctx.params.playListId)
        }

        // response from server
        const response = await listPlayListById(body)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})



// delete playlist
router.delete('/playlists/:playListId', auth, async ctx => {
    try {
        
        // user state
        const user = ctx.state.user

        const body: DeletePlayListById = {
            userId: user?.id,
            id: parseInt(ctx.params.playListId)
        }

        body.userId = user?.id
        body.id = parseInt(ctx.params.playListId)

        // response from server
        const response = await deletePlayList(body)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})



//export router
export default router