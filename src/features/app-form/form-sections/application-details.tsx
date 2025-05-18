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
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { FileUpload } from "../ui-custom/file-upload"
import { SectionTitle } from "../ui-custom/section-title"
import { SubsectionTitle } from "../ui-custom/subsection-title"
import { useForm } from "../form-context"
import { User } from "next-auth"

export default function ApplicationDetails({user}: {user: User}) {
  const { formData, updateFormData } = useForm()

  return (
    <Box>
      <SectionTitle>Application Details</SectionTitle>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Personal Information</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              label="First Name" 
              fullWidth 
              variant="outlined"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Surname" 
              fullWidth 
              variant="outlined"
              value={formData.surname}
              onChange={(e) => updateFormData({ surname: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Email" 
              type="email" 
              fullWidth 
              variant="outlined"
              value={user.email}
              disabled
              helperText="Email cannot be changed"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Mobile" 
              fullWidth 
              variant="outlined"
              value={formData.mobile}
              onChange={(e) => updateFormData({ mobile: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Business Hour Phone" 
              fullWidth 
              variant="outlined"
              value={formData.businessPhone}
              onChange={(e) => updateFormData({ businessPhone: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(newDate) => updateFormData({ dateOfBirth: newDate })}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    helperText: "You must be at least 18 years old",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Country" 
              fullWidth 
              variant="outlined"
              value={formData.country}
              onChange={(e) => updateFormData({ country: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Occupation" 
              fullWidth 
              variant="outlined"
              value={formData.occupation}
              onChange={(e) => updateFormData({ occupation: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Upload a Photo</Typography>
            </Box>
            <FileUpload 
              accept="image/*"
              onFileSelect={(file) => updateFormData({ photoIdentification: file })}
              id="photo-upload"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Identification</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Identification Type</FormLabel>
              <RadioGroup 
                row 
                name="id-type" 
                value={formData.idType} 
                onChange={(e) => updateFormData({ idType: e.target.value })}
              >
                <FormControlLabel value="license" control={<Radio />} label="Driving License" />
                <FormControlLabel value="passport" control={<Radio />} label="Passport" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label={formData.idType === "license" ? "Driving License Number" : "Passport Number"}
              fullWidth
              variant="outlined"
              value={formData.idNumber}
              onChange={(e) => updateFormData({ idNumber: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">
                Upload {formData.idType === "license" ? "Driving License" : "Passport"}
              </Typography>
            </Box>
            <FileUpload 
              accept="image/*,.pdf"
              onFileSelect={(file) => updateFormData({ idDocument: file })}
              id="id-document-upload"
              maxSizeMB={1}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Residential Address</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              label="Address" 
              fullWidth 
              variant="outlined"
              value={formData.residentialAddress}
              onChange={(e) => updateFormData({ residentialAddress: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="Suburb" 
              fullWidth 
              variant="outlined"
              value={formData.residentialSuburb}
              onChange={(e) => updateFormData({ residentialSuburb: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="State" 
              fullWidth 
              variant="outlined"
              value={formData.residentialState}
              onChange={(e) => updateFormData({ residentialState: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="Postcode" 
              fullWidth 
              variant="outlined"
              value={formData.residentialPostcode}
              onChange={(e) => updateFormData({ residentialPostcode: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Postal Address</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              label="Address" 
              fullWidth 
              variant="outlined"
              value={formData.postalAddress}
              onChange={(e) => updateFormData({ postalAddress: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="Suburb" 
              fullWidth 
              variant="outlined"
              value={formData.postalSuburb}
              onChange={(e) => updateFormData({ postalSuburb: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="State" 
              fullWidth 
              variant="outlined"
              value={formData.postalState}
              onChange={(e) => updateFormData({ postalState: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              label="Postcode" 
              fullWidth 
              variant="outlined"
              value={formData.postalPostcode}
              onChange={(e) => updateFormData({ postalPostcode: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <SubsectionTitle>Solicitor or Conveyancer</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              label="Company Name" 
              fullWidth 
              variant="outlined"
              value={formData.solicitorCompany}
              onChange={(e) => updateFormData({ solicitorCompany: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Contact Name" 
              fullWidth 
              variant="outlined"
              value={formData.solicitorContact}
              onChange={(e) => updateFormData({ solicitorContact: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Business Hour Phone" 
              fullWidth 
              variant="outlined"
              value={formData.solicitorPhone}
              onChange={(e) => updateFormData({ solicitorPhone: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Mobile Phone" 
              fullWidth 
              variant="outlined"
              value={formData.solicitorMobile}
              onChange={(e) => updateFormData({ solicitorMobile: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Email" 
              type="email" 
              fullWidth 
              variant="outlined"
              value={formData.solicitorEmail}
              onChange={(e) => updateFormData({ solicitorEmail: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
