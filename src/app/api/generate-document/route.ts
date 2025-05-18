import { NextResponse } from 'next/server';
import { generateDocument } from '@/lib/documentGenerator';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    // Get the data from the request
    const data = await request.json();
    // TODO: use the correct template
    const template_path = 'template/input.docx';
    const buffer = await generateDocument(template_path, data.buffer);
    const fileName = data.fileName
    const email = data.email
    const type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

    // Create a FormData object to send the file
    const formData = new FormData();
    const blob = new Blob([buffer], { 
      type: type
    });
    formData.append('file', blob, fileName);
    formData.append('fileName', fileName);
    formData.append('email', email);

    // Upload the document to Cloudflare R2
    const key = `${email}/${fileName}`
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: type,
      })
    )

    const fileUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`

    return NextResponse.json({ 
      success: true,
      url: fileUrl 
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
} 