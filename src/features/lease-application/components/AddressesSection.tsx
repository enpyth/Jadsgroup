import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";

interface AddressesSectionProps {
  data: ApplicationData["addresses"];
}

export const AddressesSection = ({ data }: AddressesSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Addresses
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>Residential Address</Typography>
          <Typography variant="body1">{data.residential.address}</Typography>
          <Typography variant="body1">
            {data.residential.suburb}, {data.residential.state} {data.residential.postcode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>Postal Address</Typography>
          <Typography variant="body1">{data.postal.address}</Typography>
          <Typography variant="body1">
            {data.postal.suburb}, {data.postal.state} {data.postal.postcode}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}; 