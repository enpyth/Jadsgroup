import { tmpList } from "@/constants/config";

// Email configuration
export interface EmailConfig {
  defaultFrom: string;
  defaultTo: string[];
  leaseSubmitNotificationRecipients: string[];
  // Environment-specific settings
  isDevelopment: boolean;
  isProduction: boolean;
}

// Default configuration
export const emailConfig: EmailConfig = {
  defaultFrom: 'Andy <support@jadsgroup.com>',
  defaultTo: ['zhangsu1305@gmail.com'],
  // TODO: leaseSubmitNotificationRecipients: AdminList,
  leaseSubmitNotificationRecipients: tmpList,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
