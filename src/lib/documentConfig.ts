import { PROCESS_IDS } from '@/constants/workflow';
import { leases } from "@/db/schema";
import { ApplicationData } from '@/features/lease-application/types';
import { InferSelectModel } from 'drizzle-orm';
type LeaseData = InferSelectModel<typeof leases>;

export interface DocumentConfig {
  templatePath: string;
  fileName: string | ((leaseData: LeaseData) => string);
  dataMapping: (leaseData: LeaseData) => Record<string, any>;
}

export const DOCUMENT_CONFIGS: Record<string, DocumentConfig> = {
  [PROCESS_IDS.REVIEW_APPLICATION]: {
    templatePath: 'template/lease-schedule.docx',
    fileName: (leaseData: LeaseData) => `LeaseSchedule_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: LeaseData) => ({
      title: 'Lease Schedule',
      tenant_name: (leaseData.application_data as ApplicationData).personal_info.first_name,
    //   tenant_name: `${leaseData.tenant_first_name || ''} ${leaseData.tenant_last_name || ''}`.trim(),
    //   tenant_email: leaseData.tenant_email,
    //   tenant_phone: leaseData.tenant_phone,
    //   property_address: leaseData.property_address,
      rent_amount: leaseData.rent_amount,
    //   rent_amount_text: numberToWords(leaseData.rent_amount),
      deposit_amount: leaseData.deposit_amount,
    //   deposit_amount_text: numberToWords(leaseData.deposit_amount),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
    //   lease_terms: leaseData.lease_terms,
      generated_date: new Date().toISOString(),
      lease_id: leaseData.lease_id,
    }),
  },
  [PROCESS_IDS.LANDLORD_REVIEW]: {
    templatePath: 'template/disclosure-statement.docx',
    fileName: (leaseData: any) => `DisclosureStatement_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: any) => ({
      title: 'Disclosure Statement',
      tenant_name: `${leaseData.tenant_first_name || ''} ${leaseData.tenant_last_name || ''}`.trim(),
      tenant_email: leaseData.tenant_email,
      tenant_phone: leaseData.tenant_phone,
      property_address: leaseData.property_address,
      rent_amount: leaseData.rent_amount,
      rent_amount_text: numberToWords(leaseData.rent_amount),
      deposit_amount: leaseData.deposit_amount,
      deposit_amount_text: numberToWords(leaseData.deposit_amount),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
      lease_terms: leaseData.lease_terms,
      landlord_name: leaseData.landlord_name || 'Property Owner',
      landlord_email: leaseData.landlord_email,
      generated_date: new Date().toISOString(),
      lease_id: leaseData.lease_id,
    }),
  },
  [PROCESS_IDS.DRAFT_CONTRACT]: {
    templatePath: 'template/agreement-to-lease.docx',
    fileName: (leaseData: any) => `AgreementToLease_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: any) => ({
      title: 'Agreement to Lease',
      tenant_name: `${leaseData.tenant_first_name || ''} ${leaseData.tenant_last_name || ''}`.trim(),
      tenant_email: leaseData.tenant_email,
      tenant_phone: leaseData.tenant_phone,
      property_address: leaseData.property_address,
      rent_amount: leaseData.rent_amount,
      rent_amount_text: numberToWords(leaseData.rent_amount),
      deposit_amount: leaseData.deposit_amount,
      deposit_amount_text: numberToWords(leaseData.deposit_amount),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
      lease_terms: leaseData.lease_terms,
      landlord_name: leaseData.landlord_name || 'Property Owner',
      landlord_email: leaseData.landlord_email,
      generated_date: new Date().toISOString(),
      lease_id: leaseData.lease_id,
    }),
  },
};

// Helper function to convert numbers to words
function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return tens[ten] + (one > 0 ? ' ' + ones[one] : '');
  }
  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    return ones[hundred] + ' Hundred' + (remainder > 0 ? ' and ' + numberToWords(remainder) : '');
  }
  if (num < 1000000) {
    const thousand = Math.floor(num / 1000);
    const remainder = num % 1000;
    return numberToWords(thousand) + ' Thousand' + (remainder > 0 ? ' ' + numberToWords(remainder) : '');
  }
  return num.toString(); // Fallback for very large numbers
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
export function generateDocumentData(processId: string, leaseData: any): Record<string, any> | null {
  const config = getDocumentConfig(processId);
  if (!config) return null;
  return config.dataMapping(leaseData);
}

// Function to get document file name for a process
export function getDocumentFileName(processId: string, leaseData: any): string | null {
  const config = getDocumentConfig(processId);
  if (!config) return null;
  return typeof config.fileName === 'function' ? config.fileName(leaseData) : config.fileName;
} 