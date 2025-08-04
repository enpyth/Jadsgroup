import { sendContactEnquiryServer, sendWelcomeEmailServer, sendLeaseNotificationServer, sendLeaseRefusalServer } from '@/lib/email-server';
import type { ContactEnquiryData, WelcomeEmailData, LeaseNotificationData, LeaseRefusalData } from '@/lib/email';

export async function POST(request: Request) {
  try {
    console.log('[API] /api/send POST called');
    const body = await request.json();
    console.log('[API] Request body:', body);

    let response;
    switch (body.template) {
      case 'contact-enquiry':
        response = await sendContactEnquiryServer(body as ContactEnquiryData);
        break;
      case 'welcome':
        response = await sendWelcomeEmailServer(body as WelcomeEmailData);
        break;
      case 'lease-notification':
        response = await sendLeaseNotificationServer(body as LeaseNotificationData);
        break;
      case 'lease-refusal':
        response = await sendLeaseRefusalServer(body as LeaseRefusalData);
        break;
      default:
        return Response.json({ error: 'Unknown template' }, { status: 400 });
    }

    if (response.success) {
      return Response.json({ success: true, data: response.data });
    } else {
      return Response.json({ error: response.error }, { status: 500 });
    }
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return Response.json({ error: 'Failed to send email', details: String(error) }, { status: 500 });
  }
}

// Add GET method for testing
export async function GET() {
  return Response.json({ message: 'Email API is working' });
}