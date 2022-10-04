import { s3Bucket } from '../../../utils/aws/s3.ts'
import { UploadVideoToS3DTO } from '../dto/index.ts'
import { generateUUID, config } from '../../../../deps.ts'
import { stringToUint8Array } from '../../../utils/core.ts'

const env = config()

/**
 * Upload video to s3 bucket
 * @params {InsertVideoURLDTO}
 * @returns response
 */
const uploadVideoToS3 = async (payload: any, file: any) => {
    try {
        
        // generate random uuid
        const key = generateUUID.generate() as string

        console.log(file)

        // console.log(payload.data)

        // const body: Uint8Array = stringToUint8Array(payload.data)
        // console.log(body)

        // // upload to s3 bucket
        const s3Response = await s3Bucket.putObject({
            Bucket: env.AWS_S3_BUCKET,
            Key: `${key}.png`,
            Body: file,
            ContentType: payload.format
        })

        // const s3Response = await s3Bucket.getObject({
        //     Bucket: env.AWS_S3_BUCKET,
        //     Key: "43fa4e20-43c1-11ed-afb7-e9bd39f7f2d2.png",
        // })

        console.log(s3Response)

        return s3Response

    } catch (error) {
        console.log(error)
        return error
    }
}

export { uploadVideoToS3 }