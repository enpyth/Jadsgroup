import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const CLOUDCONVERT_API_KEY = process.env.CLOUDCONVERT_API_KEY;
    
    if (!CLOUDCONVERT_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'CLOUDCONVERT_API_KEY not set'
      });
    }

    console.log('Testing CloudConvert job creation...');
    console.log('API Key (first 10 chars):', CLOUDCONVERT_API_KEY.substring(0, 10) + '...');

    // Try to create a simple job
    const jobPayload = {
      tasks: {
        'import-file': {
          operation: 'import/upload'
        },
        'convert-file': {
          operation: 'convert',
          input: ['import-file'],
          output_format: 'pdf',
          engine: 'office'
        },
        'export-file': {
          operation: 'export/url',
          input: ['convert-file'],
          inline: false,
          archive_multiple_files: false
        }
      },
      tag: 'test-job'
    };

    console.log('Job payload:', JSON.stringify(jobPayload, null, 2));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`,
    };

    console.log('Using headers:', headers);

    const jobResponse = await fetch('https://api.cloudconvert.com/v2/jobs', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(jobPayload)
    });

    console.log('Job creation response status:', jobResponse.status);
    console.log('Job creation response headers:', Object.fromEntries(jobResponse.headers.entries()));

    if (!jobResponse.ok) {
      const errorText = await jobResponse.text();
      console.error('Job creation error response:', errorText);
      return NextResponse.json({
        success: false,
        error: `Job creation failed: ${jobResponse.status} ${jobResponse.statusText}`,
        details: errorText
      });
    }

    const job = await jobResponse.json();
    console.log('Job created successfully:', job);

    return NextResponse.json({
      success: true,
      message: 'CloudConvert job created successfully',
      job: job
    });

  } catch (error) {
    console.error('Job creation test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create CloudConvert job',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 