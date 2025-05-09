import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";

interface PersonalInfoSectionProps {
  data: ApplicationData["personal_info"];
}

export const PersonalInfoSection = ({ data }: PersonalInfoSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">First Name</Typography>
          <Typography variant="body1">{data.first_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Surname</Typography>
          <Typography variant="body1">{data.surname}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Mobile</Typography>
          <Typography variant="body1">{data.mobile}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Business Phone</Typography>
          <Typography variant="body1">{data.business_phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
          <Typography variant="body1">{data.date_of_birth}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Country</Typography>
          <Typography variant="body1">{data.country}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Occupation</Typography>
          <Typography variant="body1">{data.occupation}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}; 