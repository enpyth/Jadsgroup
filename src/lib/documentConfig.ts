import { PROCESS_IDS } from '@/constants/workflow';
import { ApplicationData, LeasePropertyData } from 'types';

export interface DocumentConfig {
  templatePath: string;
  fileName: string | ((leaseData: LeasePropertyData) => string);
  dataMapping: (leaseData: LeasePropertyData) => Record<string, any>;
}

export const DOCUMENT_CONFIGS: Record<string, DocumentConfig> = {
  [PROCESS_IDS.REVIEW_APPLICATION]: {
    templatePath: 'template/lease-schedule.docx',
    fileName: (leaseData: LeasePropertyData) => `LeaseSchedule_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: LeasePropertyData) => ({
      title: 'Lease Schedule',
      tenant_name: (leaseData.application_data as ApplicationData).personal_info.first_name + ' ' + (leaseData.application_data as ApplicationData).personal_info.surname,
      rent_amount: leaseData.rent_amount,
      deposit_amount: leaseData.deposit_amount,
      start_date: formatDate(leaseData.start_date),
      end_date: formatDate(leaseData.end_date),
      generated_date: new Date().toISOString(),
      lease_id: leaseData.lease_id,
      office_id: leaseData.property.detail?.office_id || '',
      unit: leaseData.property.unit,
      size: leaseData.property.size,
      terms: leaseData.terms,
      initial_rent: leaseData.property.detail?.initial_rent || '0',
      initial_rent_text: numberToWords(leaseData.property.detail?.initial_rent || '0'),
      rent_review_percentage: leaseData.property.detail?.rent_review_percentage || '0',
      owner_name: leaseData.owner.company.name,
      owner_acn: leaseData.owner.company.acn,
    }),
  },
  [PROCESS_IDS.LANDLORD_REVIEW]: {
    templatePath: 'template/disclosure-statement.docx',
    fileName: (leaseData: LeasePropertyData) => `DisclosureStatement_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: LeasePropertyData) => ({
      title: 'Disclosure Statement',
      tenant_name: (leaseData.application_data as ApplicationData)?.personal_info?.first_name + ' ' + (leaseData.application_data as ApplicationData)?.personal_info?.surname || '',
      tenant_email: leaseData.tenant_email,
      tenant_phone: (leaseData.application_data as ApplicationData)?.personal_info?.mobile || '',
      property_address: leaseData.property.detail?.address || '',
      rent_amount: leaseData.rent_amount,
      rent_amount_text: numberToWords(leaseData.rent_amount),
      deposit_amount: leaseData.deposit_amount,
      deposit_amount_text: numberToWords(leaseData.deposit_amount),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
      lease_terms: '1 year', // Default lease terms
      landlord_name: 'Property Owner', // Default landlord name
      landlord_email: '', // Default landlord email
      generated_date: new Date().toISOString(),
      lease_id: leaseData.lease_id,
      office_id: leaseData.property.detail?.office_id || '',
    }),
  },
  [PROCESS_IDS.DRAFT_CONTRACT]: {
    templatePath: 'template/agreement-to-lease.docx',
    fileName: (leaseData: LeasePropertyData) => `AgreementToLease_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: LeasePropertyData) => ({
      title: 'Agreement to Lease',
      tenant_name: (leaseData.application_data as ApplicationData)?.personal_info?.first_name + ' ' + (leaseData.application_data as ApplicationData)?.personal_info?.surname || '',
      tenant_email: leaseData.tenant_email,
      tenant_phone: (leaseData.application_data as ApplicationData)?.personal_info?.mobile || '',
      property_address: leaseData.property.detail?.address || '',
      rent_amount: leaseData.rent_amount,
      rent_amount_text: numberToWords(leaseData.rent_amount),
      deposit_amount: leaseData.deposit_amount,
      deposit_amount_text: numberToWords(leaseData.deposit_amount),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
      lease_terms: '1 year', // Default lease terms
      landlord_name: 'Property Owner', // Default landlord name
      landlord_email: '', // Default landlord email
      generated_date: new Date().toISOString(),
      lease_id: leaseData.lease_id,
      office_id: leaseData.property.detail?.office_id || '',
    }),
  },
};

// Helper function to convert numbers to words
function numberToWords(num: string): string {
  // Remove commas and convert to number
  const numValue = parseFloat(num.replace(/,/g, '')) || 0;
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (numValue === 0) return 'Zero';
  if (numValue < 10) return ones[numValue];
  if (numValue < 20) return teens[numValue - 10];
  if (numValue < 100) {
    const ten = Math.floor(numValue / 10);
    const one = numValue % 10;
    return tens[ten] + (one > 0 ? ' ' + ones[one] : '');
  }
  if (numValue < 1000) {
    const hundred = Math.floor(numValue / 100);
    const remainder = numValue % 100;
    return ones[hundred] + ' Hundred' + (remainder > 0 ? ' and ' + numberToWords(remainder.toString()) : '');
  }
  if (numValue < 1000000) {
    const thousand = Math.floor(numValue / 1000);
    const remainder = numValue % 1000;
    return numberToWords(thousand.toString()) + ' Thousand' + (remainder > 0 ? ' ' + numberToWords(remainder.toString()) : '');
  }
  return numValue.toString(); // Fallback for very large numbers
}

// Helper function to format dates
function formatDate(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Function to get document configuration for a process
export function getDocumentConfig(processId: string): DocumentConfig | null {
  return DOCUMENT_CONFIGS[processId] || null;
}

// Function to generate document data for a process
export function generateDocumentData(processId: string, leaseData: LeasePropertyData): Record<string, any> | null {
  const config = getDocumentConfig(processId);
  if (!config) return null;
  return config.dataMapping(leaseData);
}

// Function to get document file name for a process
export function getDocumentFileName(processId: string, leaseData: LeasePropertyData): string | null {
  const config = getDocumentConfig(processId);
  if (!config) return null;
  return typeof config.fileName === 'function' ? config.fileName(leaseData) : config.fileName;
} 