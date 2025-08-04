import { useState } from 'react';
import type { ContactEnquiryData, WelcomeEmailData, EmailResponse } from '@/lib';

interface UseEmailReturn {
  sendContactEnquiry: (data: ContactEnquiryData) => Promise<EmailResponse>;
  sendWelcomeEmail: (data: WelcomeEmailData) => Promise<EmailResponse>;
  sendEmail: (data: ContactEnquiryData | WelcomeEmailData, template: string) => Promise<EmailResponse>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export function useEmail(): UseEmailReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  const sendContactEnquiry = async (data: ContactEnquiryData): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          template: 'contact-enquiry',
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSuccess(true);
        return { success: true, data: result.data };
      } else {
        const errorMessage = result.error || 'Failed to send contact enquiry';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send contact enquiry';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const sendWelcomeEmail = async (data: WelcomeEmailData): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          template: 'welcome',
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSuccess(true);
        return { success: true, data: result.data };
      } else {
        const errorMessage = result.error || 'Failed to send welcome email';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send welcome email';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (
    data: ContactEnquiryData | WelcomeEmailData, 
    template: string
  ): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          template,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSuccess(true);
        return { success: true, data: result.data };
      } else {
        const errorMessage = result.error || 'Failed to send email';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendContactEnquiry,
    sendWelcomeEmail,
    sendEmail,
    loading,
    error,
    success,
    reset,
  };
} 