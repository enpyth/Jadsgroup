import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    // https://9ed1c5db5edcaa0dc5f9352af8d92ffd.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    // 325bb2c09e484d48abaff72156fbfaeb
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
    // 54bc30728e1cf131977d6421c1df49b2293ba7296863043481c257c17087ce42
  },
});

// Generate a Word document from a template
async function generateWordDocument(data: any) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'Document Title',
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Generated on: ${new Date().toLocaleDateString()}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Content goes here...',
                size: 24,
              }),
            ],
          }),
          // Add more content based on the data
        ],
      },
    ],
  });

  // Generate the document as a buffer
  const buffer = await Packer.toBuffer(doc);
  return buffer;
}

// Upload a file to Cloudflare R2
async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string) {
  const key = `documents/${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
  return key;
}

// Generate a presigned URL for downloading or previewing
async function generatePresignedUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}

// Generate a document and upload it to R2
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate the Word document
    const docBuffer = await generateWordDocument(data);
    
    // Generate a unique filename
    const fileName = `${uuidv4()}.docx`;
    
    // Upload to R2
    const key = await uploadToR2(docBuffer, fileName, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    
    // Generate a presigned URL for immediate access
    const url = await generatePresignedUrl(key);
    
    return NextResponse.json({ 
      success: true, 
      key,
      url,
      fileName
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to generate document' 
    }, { status: 500 });
  }
}

// Get a presigned URL for an existing document
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (!key) {
      return NextResponse.json({ 
        success: false, 
        error: 'Document key is required' 
      }, { status: 400 });
    }
    
    const url = await generatePresignedUrl(key);
    
    return NextResponse.json({ 
      success: true, 
      url 
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to generate URL' 
    }, { status: 500 });
  }
} 