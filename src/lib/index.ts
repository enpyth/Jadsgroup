// Email service exports
export {
  emailService,
  sendEmail,
  EmailService,
} from './email';

export type {
  ContactEnquiryData,
  WelcomeEmailData,
  LeaseNotificationData,
  LeaseRefusalData,
  EmailData,
  EmailTemplateConfig,
  EmailResponse,
} from './email';

// Server-side email utilities
export {
  sendContactEnquiryServer,
  sendWelcomeEmailServer,
  sendLeaseNotificationServer,
  sendLeaseRefusalServer,
  sendEmailServer,
} from './email-server';

// Email configuration
export { emailConfig } from './email-config';

export type { EmailConfig } from './email-config';

// Other lib exports can be added here as needed
export * from './utils';
export * from './documentUtils';
export * from './documentConfig';
export * from './abn';
export * from './auth.config';
export * from './auth';
export * from './searchparams'; 