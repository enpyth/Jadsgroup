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
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { SectionTitle } from "../ui-custom/section-title"
import { useForm } from "../form-context"

export default function LeaseInformation() {
  const { formData, updateFormData } = useForm()

  return (
    <Box>
      <SectionTitle>Lease Information</SectionTitle>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Commencement Date"
                value={formData.commencementDate}
                onChange={(newDate) => updateFormData({ commencementDate: newDate })}
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
            <TextField
              label="Terms of Lease (Years)"
              type="number"
              value={formData.leaseTerms}
              onChange={(e) => updateFormData({ leaseTerms: e.target.value })}
              fullWidth
              variant="outlined"
              inputProps={{ 
                min: 1,
                max: 99,
                step: 1
              }}
              helperText="Enter the number of years for the lease term"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Does Your Proposed Use Supply Goods or Services to the Public?</FormLabel>
              <RadioGroup 
                row 
                name="public-goods" 
                value={formData.publicGoods} 
                onChange={(e) => updateFormData({ publicGoods: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="enquiries"
              label="Enquiries/Offers"
              multiline
              rows={4}
              placeholder="Enter any enquiries or offers"
              fullWidth
              variant="outlined"
              value={formData.enquiries}
              onChange={(e) => updateFormData({ enquiries: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
