import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";

interface RentalHistorySectionProps {
  data: ApplicationData["rental_history"];
}

export const RentalHistorySection = ({ data }: RentalHistorySectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Rental History
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Has Rented Before</Typography>
          <Typography variant="body1">{data.has_rented ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Previous Rental Type</Typography>
          <Typography variant="body1">{data.type}</Typography>
        </Grid>
        {data.has_rented && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Previous Address</Typography>
            <Typography variant="body1">
              {data.previous_address.address}, {data.previous_address.suburb}, {data.previous_address.state} {data.previous_address.postcode}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}; 