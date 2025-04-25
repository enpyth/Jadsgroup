"use client"

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import { FileUpload } from "../ui-custom/file-upload"
import { SectionTitle } from "../ui-custom/section-title"
import { SubsectionTitle } from "../ui-custom/subsection-title"
import { useForm } from "../form-context"

export default function EntityDetails() {
  const { formData, updateFormData } = useForm()

  return (
    <Box>
      <SectionTitle>Entity Details</SectionTitle>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Business Information</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Describe your business"
              multiline
              rows={4}
              placeholder="Enter a description of your business"
              fullWidth
              variant="outlined"
              value={formData.businessDescription}
              onChange={(e) => updateFormData({ businessDescription: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="ABN Number" 
              fullWidth 
              variant="outlined"
              value={formData.abnNumber}
              onChange={(e) => updateFormData({ abnNumber: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Company Name" 
              fullWidth 
              variant="outlined"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Director Information</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              label="First Name" 
              fullWidth 
              variant="outlined"
              value={formData.directorFirstName}
              onChange={(e) => updateFormData({ directorFirstName: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Surname" 
              fullWidth 
              variant="outlined"
              value={formData.directorSurname}
              onChange={(e) => updateFormData({ directorSurname: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              label="Address" 
              fullWidth 
              variant="outlined"
              value={formData.directorAddress}
              onChange={(e) => updateFormData({ directorAddress: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="Suburb" 
              fullWidth 
              variant="outlined"
              value={formData.directorSuburb}
              onChange={(e) => updateFormData({ directorSuburb: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="State" 
              fullWidth 
              variant="outlined"
              value={formData.directorState}
              onChange={(e) => updateFormData({ directorState: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="Postcode" 
              fullWidth 
              variant="outlined"
              value={formData.directorPostcode}
              onChange={(e) => updateFormData({ directorPostcode: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <SubsectionTitle>Bankrupt Detail</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Are you or your business partners undischarged bankrupt or have any of you assigned your estate for the
                benefit of creditors or had judgement recorded against you?
              </FormLabel>
              <RadioGroup 
                row 
                name="bankrupt" 
                value={formData.isBankrupt} 
                onChange={(e) => updateFormData({ isBankrupt: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.isBankrupt === "yes" && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Provide details"
                  multiline
                  rows={4}
                  placeholder="Enter details if applicable"
                  fullWidth
                  variant="outlined"
                  value={formData.bankruptDetails}
                  onChange={(e) => updateFormData({ bankruptDetails: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle1">Bankrupt Document</Typography>
                </Box>
                <FileUpload 
                  accept=".pdf,.doc,.docx"
                  onFileSelect={(file) => updateFormData({ bankruptDocument: file })}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sx={{ mt: formData.isBankrupt === "yes" ? 2 : 0 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Has your lease ever been terminated by any landlord in the past 10 years?
              </FormLabel>
              <RadioGroup 
                row 
                name="terminated" 
                value={formData.isTerminated} 
                onChange={(e) => updateFormData({ isTerminated: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.isTerminated === "yes" && (
            <Grid item xs={12}>
              <TextField
                label="Reason for the breach"
                multiline
                rows={4}
                placeholder="Enter reason if applicable"
                fullWidth
                variant="outlined"
                value={formData.terminationReason}
                onChange={(e) => updateFormData({ terminationReason: e.target.value })}
              />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  )
}
