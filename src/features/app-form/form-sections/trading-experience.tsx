"use client"

import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { SectionTitle } from "../ui-custom/section-title"
import { SubsectionTitle } from "../ui-custom/subsection-title"
import { useForm } from "../form-context"

export default function TradingExperience() {
  const { formData, updateFormData } = useForm()

  return (
    <Box>
      <SectionTitle>Trading Experience</SectionTitle>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <TextField
          label="Detail of Relevant Experience"
          multiline
          rows={4}
          placeholder="Enter details of your relevant experience"
          fullWidth
          variant="outlined"
        />
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Creditors</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="Bank Name" fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Branch Name" fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Branch Manager Name" fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Mobile Phone" fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Email" type="email" fullWidth variant="outlined" />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <SubsectionTitle>Trade Reference Details</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              label="Company Name" 
              fullWidth 
              variant="outlined"
              value={formData.tradeCompanyName}
              onChange={(e) => updateFormData({ tradeCompanyName: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              label="Address" 
              fullWidth 
              variant="outlined"
              value={formData.tradeAddress}
              onChange={(e) => updateFormData({ tradeAddress: e.target.value })}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, mb: 4 }}>
          <SubsectionTitle>Trade Reference 1</SubsectionTitle>
          <Box sx={{ pl: 2, borderLeft: "2px solid #e0e0e0" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="First Name" 
                  fullWidth 
                  variant="outlined"
                  value={formData.tradeReference1FirstName}
                  onChange={(e) => updateFormData({ tradeReference1FirstName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  label="Surname" 
                  fullWidth 
                  variant="outlined"
                  value={formData.tradeReference1Surname}
                  onChange={(e) => updateFormData({ tradeReference1Surname: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  label="Position" 
                  fullWidth 
                  variant="outlined"
                  value={formData.tradeReference1Position}
                  onChange={(e) => updateFormData({ tradeReference1Position: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  label="Mobile Phone" 
                  fullWidth 
                  variant="outlined"
                  value={formData.tradeReference1Phone}
                  onChange={(e) => updateFormData({ tradeReference1Phone: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  label="Email" 
                  type="email" 
                  fullWidth 
                  variant="outlined"
                  value={formData.tradeReference1Email}
                  onChange={(e) => updateFormData({ tradeReference1Email: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Trade Reference 2
          </Typography>
          <Box sx={{ pl: 2, borderLeft: "2px solid #e0e0e0" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField label="First Name" fullWidth variant="outlined" />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Surname" fullWidth variant="outlined" />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Position" fullWidth variant="outlined" />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Mobile Phone" fullWidth variant="outlined" />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Email" type="email" fullWidth variant="outlined" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
