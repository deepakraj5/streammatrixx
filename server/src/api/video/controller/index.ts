import { Router } from '../../../../deps.ts'
import auth from '../../../middleware/auth.ts'
import { UploadVideoToS3DTO } from '../dto/index.ts'
import { uploadVideoToS3 } from '../service/index.ts'

// router
const router = new Router({
    prefix: '/api/videos'
})


// upload video to s3 bucket
router.post('/', async ctx => {
    try {
        
        const payload = ctx.request.body({ type: "form-data" })
        const body = (await payload.value.read())
        const fields = body.fields;
        const file = body.files ? body.files[0].content : ''

        // user state
        const user = ctx.state.user

        fields.userId = user?.id

        // // response from server
        const response = await uploadVideoToS3(fields, file)

        ctx.response.body = response

    } catch (error) {
        console.log(error)
        ctx.response.status = 500
        ctx.response.body = error
    }
})


// export router
export default router