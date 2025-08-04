import { emailService } from './email';
import type { ContactEnquiryData, WelcomeEmailData } from './email';
import { emailConfig } from './email-config';

// Example 1: Server-side - Sending a contact enquiry with default recipients
export async function sendContactEnquiryExample() {
  const contactData: ContactEnquiryData = {
    tab: 'sales',
    name: 'John Doe',
    mobile: '+1234567890',
    email: 'john@example.com',
    address: '123 Main St, City',
    microGrid: true,
    powerPurchase: false,
    freshGrowers: true,
    properties: false,
    message: 'I am interested in your services.',
    verification: '',
  };

  const response = await emailService.sendContactEnquiry(contactData);
  
  if (response.success) {
    console.log('Contact enquiry sent successfully');
  } else {
    console.error('Failed to send contact enquiry:', response.error);
  }
}

// Example 2: Server-side - Sending with custom recipients
export async function sendContactEnquiryWithCustomRecipients() {
  const contactData: ContactEnquiryData = {
    tab: 'sales',
    name: 'Jane Smith',
    mobile: '+1234567890',
    email: 'jane@example.com',
    address: '456 Oak St, City',
    microGrid: false,
    powerPurchase: true,
    freshGrowers: false,
    properties: true,
    message: 'I need urgent assistance.',
    verification: '',
    // Custom recipients for this specific enquiry
    recipients: ['urgent@jadsgroup.com', 'manager@jadsgroup.com'],
  };

  const response = await emailService.sendContactEnquiry(contactData);
  
  if (response.success) {
    console.log('Urgent enquiry sent to custom recipients');
  } else {
    console.error('Failed to send urgent enquiry:', response.error);
  }
}

// Example 3: Server-side - Sending to different departments based on tab
export async function sendEnquiryToDepartment() {
  const tabs = ['sales', 'leasing', 'general'] as const;
  
  for (const tab of tabs) {
    const contactData: ContactEnquiryData = {
      tab,
      name: `Test User - ${tab}`,
      mobile: '+1234567890',
      email: `test-${tab}@example.com`,
      address: 'Test Address',
      microGrid: tab === 'sales',
      powerPurchase: tab === 'leasing',
      freshGrowers: tab === 'general',
      properties: true,
      message: `Test message for ${tab} department`,
      verification: '',
    };

    const recipients = emailConfig.defaultTo;
    console.log(`Sending ${tab} enquiry to:`, recipients);

    const response = await emailService.sendContactEnquiry(contactData);
    
    if (response.success) {
      console.log(`${tab} enquiry sent successfully`);
    } else {
      console.error(`Failed to send ${tab} enquiry:`, response.error);
    }
  }
}

// Example 4: Client-side - Using custom recipients in React component
export function clientSideCustomRecipientsExample() {
  // This would be used in a React component
  // import { useEmail } from '@/hooks/useEmail';
  
  // const { sendContactEnquiry, loading, error, success } = useEmail();
  
  // const handleUrgentEnquiry = async (data: ContactEnquiryData) => {
  //   const urgentData = {
  //     ...data,
  //     recipients: ['urgent@jadsgroup.com', 'oncall@jadsgroup.com'],
  //   };
  //   
  //   const response = await sendContactEnquiry(urgentData);
  //   if (response.success) {
  //     console.log('Urgent enquiry sent to on-call team');
  //   }
  // };
}

// Example 5: Environment-based recipient configuration
export function environmentBasedRecipients() {
  console.log('Current email configuration:');
  console.log('Development mode:', emailConfig.isDevelopment);
  console.log('Production mode:', emailConfig.isProduction);
  console.log('Sales recipients:', emailConfig.leaseSubmitNotificationRecipients);
}

// Example 6: Dynamic recipient selection based on enquiry content
export async function sendEnquiryWithSmartRouting() {
  const contactData: ContactEnquiryData = {
    tab: 'general',
    name: 'Smart Routing Test',
    mobile: '+1234567890',
    email: 'smart@example.com',
    address: 'Smart Address',
    microGrid: true,
    powerPurchase: true,
    freshGrowers: false,
    properties: false,
    message: 'I need help with micro grid and power purchase options.',
    verification: '',
  };

  // Smart routing based on interests
  const interests = [];
  if (contactData.microGrid) interests.push('micro-grid');
  if (contactData.powerPurchase) interests.push('power-purchase');
  if (contactData.freshGrowers) interests.push('fresh-growers');
  if (contactData.properties) interests.push('properties');

  // Add specialized recipients based on interests
  const specializedRecipients = [];
  if (interests.includes('micro-grid')) {
    specializedRecipients.push('microgrid@jadsgroup.com');
  }
  if (interests.includes('power-purchase')) {
    specializedRecipients.push('power@jadsgroup.com');
  }

  // Combine with default recipients
  const allRecipients = [
    ...emailConfig.defaultTo,
    ...specializedRecipients,
  ];

  const smartData = {
    ...contactData,
    recipients: allRecipients,
  };

  const response = await emailService.sendContactEnquiry(smartData);
  
  if (response.success) {
    console.log('Smart-routed enquiry sent to:', allRecipients);
  } else {
    console.error('Failed to send smart-routed enquiry:', response.error);
  }
} 