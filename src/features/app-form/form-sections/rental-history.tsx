"use client"

import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { SectionTitle } from "../ui-custom/section-title"
import { SubsectionTitle } from "../ui-custom/subsection-title"
import { useForm } from "../form-context"

export default function RentalHistory() {
  const { formData, updateFormData } = useForm()

  return (
    <Box>
      <SectionTitle>Rental History</SectionTitle>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Have you rented before?</FormLabel>
              <RadioGroup 
                row 
                name="has-rented" 
                value={formData.hasRented} 
                onChange={(e) => updateFormData({ hasRented: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.hasRented === "yes" && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <SubsectionTitle>Property Details</SubsectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Rental Type</FormLabel>
                      <RadioGroup
                        row
                        name="rental-type"
                        value={formData.rentalType}
                        onChange={(e) => updateFormData({ rentalType: e.target.value })}
                      >
                        <FormControlLabel value="residential" control={<Radio />} label="Residential" />
                        <FormControlLabel value="commercial" control={<Radio />} label="Commercial" />
                        <FormControlLabel value="strata" control={<Radio />} label="Strata" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField 
                      label="Address" 
                      fullWidth 
                      variant="outlined"
                      value={formData.previousAddress}
                      onChange={(e) => updateFormData({ previousAddress: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField 
                      label="Suburb" 
                      fullWidth 
                      variant="outlined"
                      value={formData.previousSuburb}
                      onChange={(e) => updateFormData({ previousSuburb: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField 
                      label="State" 
                      fullWidth 
                      variant="outlined"
                      value={formData.previousState}
                      onChange={(e) => updateFormData({ previousState: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField 
                      label="Postcode" 
                      fullWidth 
                      variant="outlined"
                      value={formData.previousPostcode}
                      onChange={(e) => updateFormData({ previousPostcode: e.target.value })}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <SubsectionTitle>Agent/Landlord Information</SubsectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label="First Name" fullWidth variant="outlined" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField label="Surname" fullWidth variant="outlined" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField label="Business Hour Phone" fullWidth variant="outlined" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField label="Mobile Phone" fullWidth variant="outlined" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField label="Email" type="email" fullWidth variant="outlined" />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <SubsectionTitle>Time in Location</SubsectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="From"
                        value={formData.fromDate}
                        onChange={(newDate) => updateFormData({ fromDate: newDate })}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="To"
                        value={formData.toDate}
                        onChange={(newDate) => updateFormData({ toDate: newDate })}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  )
}
