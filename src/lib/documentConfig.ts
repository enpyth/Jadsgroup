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
      office_id: leaseData.property.detail?.office_id || '',
      unit: leaseData.property.unit,
      size: leaseData.property.size,
      terms: leaseData.terms,
      terms_text: numberToWords(leaseData.terms),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
      tenant_company_name: (leaseData.application_data as ApplicationData)?.business_info?.company_name || '',
      tenant_company_acn: (leaseData.application_data as ApplicationData)?.business_info?.acn_number || '',
      tenant_name: (leaseData.application_data as ApplicationData)?.personal_info?.first_name + ' ' + (leaseData.application_data as ApplicationData)?.personal_info?.surname || '',
      tenant_director_address: (leaseData.application_data as ApplicationData)?.business_info?.director?.address || '',
      initial_rent: leaseData.property.detail?.initial_rent || '0',
      initial_rent_text: numberToWords(leaseData.property.detail?.initial_rent || '0'),
      initial_rent_gst: calculateGST(leaseData.property.detail?.initial_rent || '0'),
      instalment_amount: calculateInstalmentAmount(leaseData),
      instalment_amount_text: numberToWords(calculateInstalmentAmount(leaseData).replace(/,/g, '')),
      instalment_amount_gst: calculateGST(calculateInstalmentAmount(leaseData)),
      rent_review_percentage: leaseData.property.detail?.rent_review_percentage || '0',
      base_change_date: calculateBaseChangeDates(leaseData),
      agent_name: leaseData.agent.name,
      agent_phone: leaseData.agent.phone,
      agent_email: leaseData.agent.email,
    }),
  },
  [PROCESS_IDS.DRAFT_CONTRACT]: {
    templatePath: 'template/agreement-to-lease.docx',
    fileName: (leaseData: LeasePropertyData) => `AgreementToLease_${leaseData.lease_id}.docx`,
    dataMapping: (leaseData: LeasePropertyData) => ({
      title: 'Agreement to Lease',
      owner_company_name: leaseData.owner.company.name,
      owner_company_acn: leaseData.owner.company.acn,
      owner_name: leaseData.owner.name,
      owner_address: leaseData.owner.address,
      tenant_company_name: (leaseData.application_data as ApplicationData)?.business_info?.company_name || '',
      tenant_company_acn: (leaseData.application_data as ApplicationData)?.business_info?.acn_number || '',
      tenant_name: (leaseData.application_data as ApplicationData).personal_info.surname,
      tenant_director_address: (leaseData.application_data as ApplicationData)?.business_info?.director?.address || '',
      terms: leaseData.terms,
      terms_text: numberToWords(leaseData.terms),
      lease_start_date: formatDate(leaseData.start_date),
      lease_end_date: formatDate(leaseData.end_date),
      initial_rent: leaseData.property.detail?.initial_rent || '0',
      initial_rent_text: numberToWords(leaseData.property.detail?.initial_rent || '0'),
      initial_rent_gst: calculateGST(leaseData.property.detail?.initial_rent || '0'),
      rent_review_percentage: leaseData.property.detail?.rent_review_percentage || '0',
      base_change_date: calculateBaseChangeDates(leaseData),
      agent_name: leaseData.agent.name,
      agent_phone: leaseData.agent.phone,
    }),
  },
};

// Helper function to calculate base change dates
function calculateBaseChangeDates(leaseData: LeasePropertyData): string {
  const startDate = new Date(leaseData.start_date);
  const terms = parseInt(leaseData.terms) || 1;
  
  if (terms <= 1) return '';
  
  const changeDates = [];
  
  // Generate anniversary dates for each year after the first year
  for (let year = 1; year < terms; year++) {
    const changeDate = new Date(startDate);
    changeDate.setFullYear(startDate.getFullYear() + year);
    
    const formattedDate = changeDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    changeDates.push(formattedDate);
  }
  
  return changeDates.join(', ');
}

// Helper function to safely calculate GST
function calculateGST(amount: string | number): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  if (isNaN(numAmount) || numAmount <= 0) return '0.00';
  const gstAmount = numAmount * 0.1;
  
  // Format with commas if the amount is 1000 or greater
  if (gstAmount >= 1000) {
    return gstAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  return gstAmount.toFixed(2);
}

// Helper function to calculate instalment amount
function calculateInstalmentAmount(leaseData: LeasePropertyData): string {
  const initialRent = parseFloat((leaseData.property.detail?.initial_rent || '0').replace(/,/g, ''));
  const rentReviewPercentage = parseFloat((leaseData.property.detail?.rent_review_percentage || '0').replace(/,/g, ''));
  const leaseTerms = parseInt(leaseData.terms) || 1; // Default to 1 year if not specified
  
  if (initialRent <= 0) return '0.00';
  
  let totalRent = 0;
  let currentRent = initialRent; // This is monthly rent
  
  // Calculate rent for each year of the lease
  for (let year = 1; year <= leaseTerms; year++) {
    if (year === 1) {
      // First year: use initial monthly rent
      totalRent += currentRent * 12; // 12 months
    } else {
      // Subsequent years: apply rent review percentage increase
      const increaseMultiplier = 1 + (rentReviewPercentage / 100);
      currentRent = currentRent * increaseMultiplier;
      totalRent += currentRent * 12; // 12 months
    }
  }
  
  // Calculate monthly instalment amount
  const totalMonths = leaseTerms * 12;
  const instalmentAmount = totalRent / totalMonths;
  const roundedAmount = Math.round(instalmentAmount * 100) / 100; // Round to 2 decimal places
  
  // Format with commas if the amount is 1000 or greater
  if (roundedAmount >= 1000) {
    return roundedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  return roundedAmount.toFixed(2);
}

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