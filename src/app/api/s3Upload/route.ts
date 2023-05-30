import type { NextApiRequest, NextApiResponse } from 'next'
import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.S3_UPLOAD_KEY2,
  secretAccessKey: process.env.S3_UPLOAD_SECRET2,
  region: process.env.S3_UPLOAD_REGION,
  signatureVersion: 'v4',
})

const allowedFormats = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export async function GET(req: NextRequest, res: NextApiResponse) {
  let filetype = req.nextUrl.searchParams?.get('fileType') as string
  try {
    if (!allowedFormats.includes(filetype)) {
      return NextResponse.json(
        { fileType: filetype, message: 'Invalid File Type' },
        { status: 400 }
      )
    }
    if (
      filetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      filetype = 'application/docx'
    }
    const type = filetype.split('/')[1]
    const Key = `${randomUUID()}.${type}`
    const s3Params = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key,
      Expires: 60,
      ContentType: filetype,
    }
    const uploadUrl = s3.getSignedUrl('putObject', s3Params)
    // return res.status(200).json({
    //   uploadUrl,
    //   key: Key,
    // })
    return NextResponse.json({ uploadUrl, key: Key }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 400 })
  }
  // console.log(type)
  // console.log(Key)
  // const s3Params = {
  //   Bucket: process.env.S3_UPLOAD_BUCKET,
  //   Key,
  //   Expires: 60,
  //   ContentType: req.query.fileType,
  // }

  // const uploadUrl = s3.getSignedUrl('putObject', s3Params)

  // console.log('Server', uploadUrl)

  // return res.status(200).json({
  //   uploadUrl,
  //   key: Key,
  // })
  // return res.status(200).json({
  //   type,
  //   key: Key,
  // })
}
