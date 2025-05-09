import { Grid, Typography, Alert } from "@mui/material";
import { ApplicationData } from "../types";
import { searchCompanyDataByABN } from "@/lib/abn";

interface BusinessInfoSectionProps {
  data: ApplicationData["business_info"];
}

export async function BusinessInfoSection({ data }: BusinessInfoSectionProps) {
  let abnValidation = null;

  if (data.abn_number) {
    try {
      const result = await searchCompanyDataByABN(
        data.abn_number,
        'N',
        process.env.ABR_AUTH_GUID!
      );
      
      const registeredName = result.ABRPayloadSearchResults.response.businessEntity?.mainName.organisationName;
      if (registeredName) {
        abnValidation = {
          isValid: registeredName.toLowerCase() === data.company_name.toLowerCase(),
          registeredName
        };
      } else {
        abnValidation = {
          isValid: false,
          registeredName: '',
          error: 'No business found with this ABN'
        };
      }
    } catch (error) {
      abnValidation = {
        isValid: false,
        registeredName: '',
        error: 'Error validating ABN'
      };
    }
  }

  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Business Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">Business Description</Typography>
          <Typography variant="body1">{data.description}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">ABN Number</Typography>
          <Typography variant="body1">{data.abn_number}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Company Name</Typography>
          <Typography variant="body1">{data.company_name}</Typography>
        </Grid>
        {abnValidation && (
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
        )}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>Director Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Name</Typography>
              <Typography variant="body1">
                {data.director.first_name} {data.director.surname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Address</Typography>
              <Typography variant="body1">
                {data.director.address}, {data.director.suburb}, {data.director.state} {data.director.postcode}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
} 