import { Resend } from 'resend';
import { ContactEnquiryEmail } from '@/template/contact-enquiry';
import { EmailTemplate } from '@/template/email';
import { LeaseNotificationEmail } from '@/template/lease-notification';
import { LeaseRefusalEmail } from '@/template/lease-refusal';
import { emailConfig } from './email-config';

// Types for email data
export interface ContactEnquiryData {
  tab: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  microGrid: boolean;
  powerPurchase: boolean;
  freshGrowers: boolean;
  properties: boolean;
  message: string;
  verification: string;
  // Optional recipient customization
  recipients?: string[];
  fromEmail?: string;
}

export interface WelcomeEmailData {
  name: string;
  firstName?: string;
  // Optional recipient customization
  recipients?: string[];
  fromEmail?: string;
}

export interface LeaseNotificationData {
  leaseId: string;
  applicantName: string;
  propertyAddress: string;
  message: string;
  // Optional recipient customization
  recipients?: string[];
  fromEmail?: string;
}

export interface LeaseRefusalData {
  leaseId: string;
  applicantName: string;
  propertyAddress: string;
  refusalReason?: string;
  message: string;
  // Optional recipient customization
  recipients?: string[];
  fromEmail?: string;
}

export type EmailData = ContactEnquiryData | WelcomeEmailData | LeaseNotificationData | LeaseRefusalData;

export interface EmailTemplateConfig {
  template: string;
  subject: string;
  to: string[];
  from: string;
}

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Email service class - Server-side only
export class EmailService {
  private resend: Resend | null = null;

  constructor() {
    // Only initialize Resend on the server side
    if (typeof window === 'undefined' && process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }
  }

  private validateApiKey(): boolean {
    if (typeof window !== 'undefined') {
      console.error('[EmailService] Cannot send emails from client side');
      return false;
    }
    
    if (!process.env.RESEND_API_KEY) {
      console.error('[EmailService] RESEND_API_KEY is not configured');
      return false;
    }
    
    if (!this.resend) {
      console.error('[EmailService] Resend client not initialized');
      return false;
    }
    
    return true;
  }

  private getTemplateConfig(data: EmailData, template: string): EmailTemplateConfig {
    // Use custom recipients if provided, otherwise use configuration-based recipients
    const recipients = (data as any).recipients || emailConfig.defaultTo;
    const fromEmail = (data as any).fromEmail || emailConfig.defaultFrom;

    switch (template) {
      case 'contact-enquiry':
        const contactData = data as ContactEnquiryData;
        return {
          template: 'contact-enquiry',
          subject: `New Contact Enquiry from ${contactData.name || 'Unknown'}`,
          to: recipients,
          from: fromEmail,
        };
      case 'welcome':
        const welcomeData = data as WelcomeEmailData;
        return {
          template: 'welcome',
          subject: `Welcome, ${welcomeData.name || 'User'}!`,
          to: recipients,
          from: fromEmail,
        };
      case 'lease-notification':
        const leaseData = data as LeaseNotificationData;
        return {
          template: 'lease-notification',
          subject: 'New Lease Request Received',
          to: recipients,
          from: fromEmail,
        };
      case 'lease-refusal':
        const refusalData = data as LeaseRefusalData;
        return {
          template: 'lease-refusal',
          subject: 'Lease Application Update - Not Approved',
          to: recipients,
          from: fromEmail,
        };
      default:
        throw new Error(`Unknown template: ${template}`);
    }
  }

  private renderTemplate(data: EmailData, template: string) {
    switch (template) {
      case 'contact-enquiry':
        return ContactEnquiryEmail(data as ContactEnquiryData);
      case 'welcome':
        return EmailTemplate({ firstName: (data as WelcomeEmailData).name || 'User' });
      case 'lease-notification':
        return LeaseNotificationEmail(data as LeaseNotificationData);
      case 'lease-refusal':
        return LeaseRefusalEmail(data as LeaseRefusalData);
      default:
        throw new Error(`Unknown template: ${template}`);
    }
  }

  async sendEmail(data: EmailData, template: string): Promise<EmailResponse> {
    try {
      console.log('[EmailService] Sending email with template:', template);
      
      if (!this.validateApiKey()) {
        return {
          success: false,
          error: 'Email service not available on client side',
        };
      }

      const config = this.getTemplateConfig(data, template);
      const reactTemplate = this.renderTemplate(data, template);

      console.log('[EmailService] Sending to recipients:', config.to);

      const { data: resendData, error } = await this.resend!.emails.send({
        from: config.from,
        to: config.to,
        subject: config.subject,
        react: reactTemplate,
      });

      console.log('[EmailService] Resend response:', { data: resendData, error });

      if (error) {
        console.error('[EmailService] Resend error:', error);
        return {
          success: false,
          error: String(error),
        };
      }

      return {
        success: true,
        data: resendData,
      };
    } catch (error) {
      console.error('[EmailService] Unexpected error:', error);
      return {
        success: false,
        error: `Failed to send email: ${String(error)}`,
      };
    }
  }

  // Convenience method for contact enquiries
  async sendContactEnquiry(data: ContactEnquiryData): Promise<EmailResponse> {
    return this.sendEmail(data, 'contact-enquiry');
  }

  // Convenience method for welcome emails
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResponse> {
    return this.sendEmail(data, 'welcome');
  }
}

// Singleton instance
export const emailService = new EmailService();

// Utility function for backward compatibility
export async function sendEmail(data: EmailData, template: string): Promise<EmailResponse> {
  return emailService.sendEmail(data, template);
} 