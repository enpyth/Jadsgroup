import { NextResponse } from 'next/server';
import { generateDocument } from '@/lib/documentGenerator';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getDocumentConfig, generateDocumentData, getDocumentFileName } from '@/lib/documentConfig';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

// Generate a document and upload it to Cloudflare R2
// This is used to generate a document and upload it to the tenant's email folder
// The data.processId is the process ID to determine which template to use
// The data.leaseData contains the lease information
export async function POST(request: Request) {
  try {
    // Get the data from the request
    const data = await request.json();
    const { processId, leaseData } = data;

    if (!processId || !leaseData) {
      return NextResponse.json(
        { error: 'Missing required parameters: processId and leaseData' },
        { status: 400 }
      );
    }

    // Get document configuration for the process
    const documentConfig = getDocumentConfig(processId);
    if (!documentConfig) {
      return NextResponse.json(
        { error: `No document configuration found for process: ${processId}` },
        { status: 400 }
      );
    }

    // Generate document data
    const documentData = generateDocumentData(processId, leaseData);
    if (!documentData) {
      return NextResponse.json(
        { error: 'Failed to generate document data' },
        { status: 500 }
      );
    }

    // Get file name
    const fileName = getDocumentFileName(processId, leaseData);
    if (!fileName) {
      return NextResponse.json(
        { error: 'Failed to generate file name' },
        { status: 500 }
      );
    }

    // Generate document using the correct template
    const buffer = await generateDocument(documentConfig.templatePath, documentData);
    const email = leaseData.tenant_email;
    const type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    // Upload the document to Cloudflare R2
    const key = `${email}/${fileName}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: type,
      })
    );

    const fileUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({ 
      success: true,
      url: fileUrl,
      fileName: fileName,
      processId: processId
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
} 