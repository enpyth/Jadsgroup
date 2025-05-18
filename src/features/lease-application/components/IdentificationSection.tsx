"use client";

import { Grid, Typography } from "@mui/material";
import { ApplicationData } from "../types";
import { IDDocumentDisplay } from "./IDDocumentDisplay";

interface IdentificationSectionProps {
  data: ApplicationData["identification"];
}

export const IdentificationSection = ({ data }: IdentificationSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Identification
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">ID Type</Typography>
          <Typography variant="body1">{data.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">ID Number</Typography>
          <Typography variant="body1">{data.number}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" gutterBottom>ID Document</Typography>
          <IDDocumentDisplay documentUrl={data.id_document} />
        </Grid>
      </Grid>
    </Grid>
  );
}; 