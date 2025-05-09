import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";

interface FinancialInfoSectionProps {
  data: ApplicationData["financial_info"];
}

export const FinancialInfoSection = ({ data }: FinancialInfoSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Financial Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Operates Business</Typography>
          <Typography variant="body1">{data.operates_business ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Is Employed</Typography>
          <Typography variant="body1">{data.is_employed ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>Assets</Typography>
          {data.assets.map((asset, index) => (
            <Typography key={index} variant="body1">
              {asset.description}: ${asset.amount}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>Liabilities</Typography>
          {data.liabilities.map((liability, index) => (
            <Typography key={index} variant="body1">
              {liability.description}: ${liability.amount}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}; 