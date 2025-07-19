"use client";

import { Grid, Alert } from "@mui/material";
import { searchCompanyDataByABN } from "@/lib/abn";
import { useEffect, useState } from "react";

interface ABNValidationSectionProps {
  abnNumber: string;
  companyName: string;
}

interface ABNValidation {
  isValid: boolean;
  registeredName: string;
  error?: string;
}

export function ABNValidationSection({ abnNumber, companyName }: ABNValidationSectionProps) {
  const [abnValidation, setAbnValidation] = useState<ABNValidation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validateABN = async () => {
      if (!abnNumber) return;

      // Check if ABR auth GUID is configured
      const authGuid = process.env.NEXT_PUBLIC_ABR_AUTH_GUID;
      if (!authGuid) {
        setAbnValidation({
          isValid: false,
          registeredName: '',
          error: 'ABR authentication not configured. Please set NEXT_PUBLIC_ABR_AUTH_GUID environment variable.'
        });
        return;
      }

      setIsLoading(true);
      try {
        const result = await searchCompanyDataByABN(
          abnNumber,
          'N',
          authGuid
        );
        
        const registeredName = result.ABRPayloadSearchResults.response.businessEntity?.mainName.organisationName;
        if (registeredName) {
          setAbnValidation({
            isValid: registeredName.toLowerCase() === companyName.toLowerCase(),
            registeredName
          });
        } else {
          setAbnValidation({
            isValid: false,
            registeredName: '',
            error: 'No business found with this ABN'
          });
        }
      } catch (error) {
        console.error('ABN validation error:', error);
        setAbnValidation({
          isValid: false,
          registeredName: '',
          error: 'Error validating ABN. Please check your internet connection and try again.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    validateABN();
  }, [abnNumber, companyName]);

  if (isLoading) {
    return (
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mt: 1 }}>
          Validating ABN...
        </Alert>
      </Grid>
    );
  }

  if (!abnValidation) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Alert 
        severity={abnValidation.isValid ? "success" : "warning"}
        sx={{ mt: 1 }}
      >
        {abnValidation.error ? (
          abnValidation.error
        ) : abnValidation.isValid ? (
          "ABN matches registered company name"
        ) : (
          <>
            ABN registered name: {abnValidation.registeredName}
            <br />
            This name does not match the provided company name
          </>
        )}
      </Alert>
    </Grid>
  );
} 