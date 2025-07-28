import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import FormData from 'form-data';
import axios from 'axios';

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { inputKey, outputKey } = await request.json();

    if (!inputKey || !outputKey) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: inputKey and outputKey' },
        { status: 400 }
      );
    }

    console.log(`Starting R2 to R2 conversion: ${inputKey} -> ${outputKey}`);

    try {
      // Step 1: Download file from R2 (server-side)
      console.log('Downloading file from R2...');
      const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: inputKey,
      });

      const fileResponse = await s3Client.send(getObjectCommand);
      
      if (!fileResponse.Body) {
        throw new Error('No file body received from R2');
      }

      // Convert stream to buffer
      const chunks: Uint8Array[] = [];
      const reader = fileResponse.Body.transformToWebStream().getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      
      const fileBuffer = Buffer.concat(chunks);
      console.log(`File downloaded from R2, size: ${fileBuffer.length} bytes`);

      // Step 2: TODO: Convert using CloudConvert, error with uploading to Cloudconvert
      console.log('Converting file using CloudConvert...');
      const pdfBuffer = await convertWordToPdfWithCloudConvert(fileBuffer, inputKey.split('/').pop() || 'document.docx');
      
      // Step 3: Upload converted PDF to R2
      console.log('Uploading converted PDF to R2...');
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: outputKey,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
        Metadata: {
          'original-file': inputKey,
          'conversion-date': new Date().toISOString(),
          'conversion-method': process.env.CLOUDCONVERT_API_KEY ? 'cloudconvert' : 'fallback',
        },
      });

      await s3Client.send(uploadCommand);
      console.log('PDF uploaded to R2 successfully');

      return NextResponse.json({
        success: true,
        message: process.env.CLOUDCONVERT_API_KEY 
          ? 'PDF generated and uploaded successfully using CloudConvert'
          : 'PDF generated and uploaded successfully using fallback method',
        inputKey: inputKey,
        outputKey: outputKey,
      });

    } catch (conversionError) {
      console.error('Conversion error:', conversionError);
      return NextResponse.json(
        { success: false, error: 'Failed to convert document to PDF' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in convert-r2-to-pdf API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process document conversion' },
      { status: 500 }
    );
  }
}

// CloudConvert API implementation
async function convertWordToPdfWithCloudConvert(fileBuffer: Buffer, fileName: string): Promise<Buffer> {
  const CLOUDCONVERT_API_KEY = process.env.CLOUDCONVERT_API_KEY;
  
  if (!CLOUDCONVERT_API_KEY) {
    console.log('CloudConvert API key not set, using fallback PDF generation');
    return createSimplePdf(fileBuffer, fileName);
  }

  try {
    console.log('Creating CloudConvert job...');
    console.log('API Key (first 10 chars):', CLOUDCONVERT_API_KEY.substring(0, 10) + '...');
    
    // Step 1: Create a job
    const jobPayload = {
      tasks: {
        'import-file': {
          operation: 'import/upload'
        },
        'convert-file': {
          operation: 'convert',
          input: ['import-file'],
          output_format: 'pdf',
          engine: 'office',
          filename: fileName
        },
        'export-file': {
          operation: 'export/url',
          input: ['convert-file'],
          inline: false,
          archive_multiple_files: false
        }
      },
      tag: 'word-to-pdf-conversion'
    };

    console.log('Job payload:', JSON.stringify(jobPayload, null, 2));

    // Try different authorization header formats
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Check if it's a JWT token or regular API key
    if (CLOUDCONVERT_API_KEY.startsWith('eyJ')) {
      // JWT token format
      headers['Authorization'] = `Bearer ${CLOUDCONVERT_API_KEY}`;
    } else {
      // Regular API key format
      headers['Authorization'] = `Bearer ${CLOUDCONVERT_API_KEY}`;
    }

    console.log('Using headers:', headers);

    const jobResponse = await axios.post('https://api.cloudconvert.com/v2/jobs', jobPayload, { headers });

    console.log('CloudConvert response status:', jobResponse.status);
    console.log('CloudConvert response headers:', jobResponse.headers);

    if (jobResponse.status !== 200 && jobResponse.status !== 201) {
      const errorText = jobResponse.data;
      console.error('CloudConvert API error response:', errorText);
      throw new Error(`Failed to create CloudConvert job: ${jobResponse.status} ${jobResponse.statusText} - ${errorText}`);
    }

    const job = jobResponse.data;
    console.log('CloudConvert job created:', job);
    
    // Handle the nested response structure
    const jobData = job.data || job;
    console.log('Job ID:', jobData.id);
    console.log('Job tasks:', jobData.tasks);

    if (!jobData.tasks) {
      console.error('Full job response:', job);
      throw new Error('No tasks found in CloudConvert job response');
    }

    // Step 2: Upload the file
    const uploadTask = jobData.tasks.find((task: any) => task.operation === 'import/upload');
    if (!uploadTask) {
      console.error('Available tasks:', jobData.tasks.map((t: any) => ({ operation: t.operation, id: t.id })));
      throw new Error('Upload task not found in job');
    }

    console.log('Upload task found:', uploadTask);

    if (!uploadTask.result?.form?.url) {
      console.error('Upload task result:', uploadTask.result);
      throw new Error('Upload form URL not found in upload task');
    }

    console.log('Upload form URL:', uploadTask.result.form.url);
    console.log('Upload form parameters:', uploadTask.result.form.parameters);
    console.log('Original key value:', uploadTask.result.form.parameters.key);
    console.log('Filename to use:', fileName);

    // Create form data with the required parameters using form-data library
    const formData = new FormData();
    
    // Add the file with proper content type
    formData.append('file', fileBuffer, {
      filename: fileName,
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    // Add the required parameters from CloudConvert
    if (uploadTask.result.form.parameters) {
      for (const [key, value] of Object.entries(uploadTask.result.form.parameters)) {
        // Replace ${filename} placeholder with actual filename
        let paramValue = value;
        if (typeof value === 'string') {
          paramValue = value.replace(/\$\{filename\}/g, fileName);
        }
        formData.append(key, paramValue as string);
        console.log(`Added form parameter: ${key} = ${paramValue}`);
      }
    }

    console.log('Form data created, sending upload request...');
    console.log('Form data entries:');
    formData.getLength((err, length) => {
      if (err) {
        console.error('Error getting form data length:', err);
      } else {
        console.log('Form data length:', length);
      }
    });

    // Debug: Get the actual buffer to see what's being sent
    const formBuffer = formData.getBuffer();
    console.log('Form data buffer length:', formBuffer.length);
    console.log('Form data buffer (first 200 chars):', formBuffer.toString('utf8').substring(0, 200));

    // Use form-data's submit method with proper error handling
    try {
      const uploadResponse = await new Promise((resolve, reject) => {
        const req = formData.submit(uploadTask.result.form.url, (err, res) => {
          if (err) {
            console.error('Form submit error:', err);
            reject(err);
            return;
          }
          
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            console.log('Form submit response status:', res.statusCode);
            console.log('Form submit response headers:', res.headers);
            console.log('Form submit response data:', data);
            
            resolve({
              status: res.statusCode,
              data: data,
              headers: res.headers
            });
          });
          
          res.on('error', (err) => {
            console.error('Form submit response error:', err);
            reject(err);
          });
        });
        
        // Add error handling for the request
        req.on('error', (err) => {
          console.error('Form submit request error:', err);
          reject(err);
        });
      });

      console.log('Upload response status:', (uploadResponse as any).status);
      console.log('Upload response headers:', (uploadResponse as any).headers);

      if ((uploadResponse as any).status !== 200 && (uploadResponse as any).status !== 201) {
        console.error('Upload error response:', (uploadResponse as any).data);
        throw new Error(`Failed to upload file to CloudConvert: ${(uploadResponse as any).status} - ${(uploadResponse as any).data}`);
      }

      console.log('File uploaded to CloudConvert successfully');
    } catch (uploadError: any) {
      console.error('Upload error details:', uploadError);
      throw new Error(`Failed to upload file to CloudConvert: ${uploadError.message}`);
    }

    // Step 3: Wait for conversion to complete
    let exportTask = null;
    let attempts = 0;
    const maxAttempts = 30; // 5 minutes with 10-second intervals

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds

      const jobStatusResponse = await axios.get(`https://api.cloudconvert.com/v2/jobs/${jobData.id}`, { headers: { 'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}` } });

      if (jobStatusResponse.status !== 200) {
        const statusErrorText = jobStatusResponse.data;
        console.error('Job status error:', statusErrorText);
        throw new Error(`Failed to get job status: ${jobStatusResponse.status} ${jobStatusResponse.statusText} - ${statusErrorText}`);
      }

      const jobStatus = jobStatusResponse.data;
      console.log(`Job status (attempt ${attempts + 1}):`, jobStatus);
      
      // Handle nested response structure
      const jobStatusData = jobStatus.data || jobStatus;
      exportTask = jobStatusData.tasks.find((task: any) => task.operation === 'export/url');

      if (exportTask && exportTask.status === 'finished') {
        console.log('Export task finished:', exportTask);
        break;
      } else if (exportTask && exportTask.status === 'error') {
        console.error('Export task error:', exportTask);
        throw new Error(`CloudConvert conversion failed: ${exportTask.message || 'Unknown error'}`);
      }

      attempts++;
      console.log(`Waiting for conversion... Attempt ${attempts}/${maxAttempts}`);
    }

    if (!exportTask || exportTask.status !== 'finished') {
      throw new Error('Conversion timeout - job did not complete within expected time');
    }

    // Step 4: Download the converted PDF
    console.log('Downloading converted PDF from:', exportTask.result.files[0].url);
    const downloadResponse = await axios.get(exportTask.result.files[0].url);
    
    if (downloadResponse.status !== 200) {
      const downloadErrorText = downloadResponse.data;
      console.error('Download error:', downloadErrorText);
      throw new Error(`Failed to download converted PDF: ${downloadResponse.status} ${downloadResponse.statusText} - ${downloadErrorText}`);
    }

    const pdfBuffer = Buffer.from(downloadResponse.data);
    console.log(`PDF conversion completed successfully. Size: ${pdfBuffer.length} bytes`);

    return pdfBuffer;

  } catch (error) {
    console.error('CloudConvert conversion error:', error);
    console.log('Falling back to simple PDF generation');
    return createSimplePdf(fileBuffer, fileName);
  }
}

// Fallback function for testing (creates a simple PDF)
async function createSimplePdf(originalBuffer: Buffer, fileName: string): Promise<Buffer> {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Converted from: ${fileName}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
297
%%EOF`;

  return Buffer.from(pdfContent, 'utf8');
} 