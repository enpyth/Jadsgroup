import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "types";
import { ABNValidationSection } from "@/features/lease-application/components/ABNValidationSection";

interface BusinessInfoSectionProps {
  data: ApplicationData["business_info"];
}

export function BusinessInfoSection({ data }: BusinessInfoSectionProps) {
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
        
        {/* ABN Validation - Client Component */}
        <ABNValidationSection 
          abnNumber={data.abn_number} 
          companyName={data.company_name} 
        />
        
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