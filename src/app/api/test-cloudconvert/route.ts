import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const CLOUDCONVERT_API_KEY = process.env.CLOUDCONVERT_API_KEY;
    
    if (!CLOUDCONVERT_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'CLOUDCONVERT_API_KEY not set'
      });
    }

    console.log('Testing CloudConvert API key...');
    console.log('API Key (first 10 chars):', CLOUDCONVERT_API_KEY.substring(0, 10) + '...');

    // Test the API key by making a simple request
    const testResponse = await fetch('https://api.cloudconvert.com/v2/jobs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Test response status:', testResponse.status);
    console.log('Test response headers:', Object.fromEntries(testResponse.headers.entries()));

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('Test error response:', errorText);
      return NextResponse.json({
        success: false,
        error: `API test failed: ${testResponse.status} ${testResponse.statusText}`,
        details: errorText
      });
    }

    const testResult = await testResponse.json();
    console.log('Test result:', testResult);

    return NextResponse.json({
      success: true,
      message: 'CloudConvert API key is working',
      testResult: testResult
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to test CloudConvert API',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 