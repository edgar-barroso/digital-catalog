// lib/s3.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import env from '../_env/env'

export const s3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
})

export async function uploadFile({
  bucket,
  key,
  body,
  contentType,
}: {
  bucket: string
  key: string
  body: Buffer
  contentType: string
}) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  })

  return await s3.send(command)
}