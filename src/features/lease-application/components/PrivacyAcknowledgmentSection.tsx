import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";

interface PrivacyAcknowledgmentSectionProps {
  data: ApplicationData["privacy_acknowledgment"];
}

export const PrivacyAcknowledgmentSection = ({ data }: PrivacyAcknowledgmentSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Privacy Acknowledgment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Agreed</Typography>
          <Typography variant="body1">{data.agreed ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Signature</Typography>
          <Typography variant="body1">{data.signature}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}; 