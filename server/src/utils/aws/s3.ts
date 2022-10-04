import { ApiFactory, S3, config } from '../../../deps.ts'

const env = config()

// s3 bucket config
const s3Bucket = new ApiFactory({
    region: env.AWS_REGION,
    credentials: {
        awsAccessKeyId: env.AWS_ACCESS_KEY,
        awsSecretKey: env.AWS_SECRET_KEY
    }
}).makeNew(S3);

// s3 bucket config
// const s3Bucket = new S3Bucket({
//     accessKeyID: env.AWS_ACCESS_KEY,
//     secretKey: env.AWS_SECRET_KEY,
//     region: env.AWS_REGION,
//     bucket: env.AWS_S3_BUCKET
// })

export { s3Bucket }