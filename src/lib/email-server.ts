import { emailService } from './email';
import type { ContactEnquiryData, WelcomeEmailData, LeaseNotificationData, LeaseRefusalData, EmailResponse } from './email';

/**
 * Server-side email utilities
 * Use these functions in API routes, server actions, and other server-side contexts
 */

export async function sendContactEnquiryServer(data: ContactEnquiryData): Promise<EmailResponse> {
  return emailService.sendContactEnquiry(data);
}

export async function sendWelcomeEmailServer(data: WelcomeEmailData): Promise<EmailResponse> {
  return emailService.sendWelcomeEmail(data);
}

export async function sendLeaseNotificationServer(data: LeaseNotificationData): Promise<EmailResponse> {
  return emailService.sendEmail(data, 'lease-notification');
}

export async function sendLeaseRefusalServer(data: LeaseRefusalData): Promise<EmailResponse> {
  return emailService.sendEmail(data, 'lease-refusal');
}

export async function sendEmailServer(
  data: ContactEnquiryData | WelcomeEmailData | LeaseNotificationData | LeaseRefusalData, 
  template: string
): Promise<EmailResponse> {
  return emailService.sendEmail(data, template);
}

// Re-export the email service for direct use in server contexts
export { emailService } from './email';
export type { ContactEnquiryData, WelcomeEmailData, LeaseNotificationData, LeaseRefusalData, EmailResponse } from './email'; 