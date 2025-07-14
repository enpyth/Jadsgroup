import { ContactEnquiryEmail } from 'template/contact-enquiry';
import { EmailTemplate } from 'template/email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log('[API] /api/send POST called');
    if (!process.env.RESEND_API_KEY) {
      console.error('[API] RESEND_API_KEY is not configured');
      return Response.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }
    const body = await request.json();
    console.log('[API] Request body:', body);

    let reactTemplate;
    let subject = '';
    switch (body.template) {
      case 'contact-enquiry':
        reactTemplate = ContactEnquiryEmail(body);
        subject = `New Contact Enquiry from ${body.name || 'Unknown'}`;
        break;
      case 'welcome':
        reactTemplate = EmailTemplate({ firstName: body.name || 'User' });
        subject = `Welcome, ${body.name || 'User'}!`;
        break;
      default:
        return Response.json({ error: 'Unknown template' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'su <support@notifications.sparklerunner.com.au>',
      to: ['zhangsu1305@gmail.com'],
      subject,
      react: reactTemplate,
    });
    console.log('[API] Resend response:', { data, error });
    if (error) {
      console.error('[API] Resend error:', error);
      return Response.json({ error }, { status: 500 });
    }
    return Response.json({ success: true, data });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return Response.json({ error: 'Failed to send email', details: String(error) }, { status: 500 });
  }
}

// Add GET method for testing
export async function GET() {
  return Response.json({ message: 'Email API is working' });
}