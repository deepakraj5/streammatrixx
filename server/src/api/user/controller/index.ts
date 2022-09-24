import { Router } from '../../../../deps.ts'
import { newUser, newDatabase, login } from '../service/index.ts'
import { NewUser } from '../dto/index.ts'
import { Login } from '../dto/index.ts'
import auth from '../../../middleware/auth.ts'

// init router
const router = new Router()


// signup
router.post('/signup', async ctx => {
    try {
        
        const payload = ctx.request.body({ type: "json" })
        const body: NewUser = await payload.value

        const response = await newUser(body)

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
        
        const payload = ctx.request.body({ type: "json" })
        const body: Login = await payload.value

        const response = await login(body)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})


// export router
export default router