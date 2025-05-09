import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";

interface TradeReferenceSectionProps {
  data: ApplicationData["trade_reference"];
}

export const TradeReferenceSection = ({ data }: TradeReferenceSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Trade Reference
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Company Name</Typography>
          <Typography variant="body1">{data.company_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">Address</Typography>
          <Typography variant="body1">{data.address}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>Contact Person</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Name</Typography>
              <Typography variant="body1">
                {data.contact.first_name} {data.contact.surname}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Position</Typography>
              <Typography variant="body1">{data.contact.position}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Phone</Typography>
              <Typography variant="body1">{data.contact.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1">{data.contact.email}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}; 