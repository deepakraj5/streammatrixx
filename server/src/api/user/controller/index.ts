import { Router } from '../../../../deps.ts'
import { newUser, newDatabase } from '../service/index.ts'
import { NewUser } from '../dto/index.ts'
import { Login } from '../dto/index.ts'

// init router
const router = new Router()


// signup
router.post('/signup', async ctx => {
    try {
        
        const payload = ctx.request.body as unknown as NewUser
        
        const response = await newUser(payload)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})


// login
router.post('/login', async ctx => {
    try {
        
        const payload = ctx.request.body as unknown as Login
        

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})



// export router
export default router