"use client"

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { FileUpload } from "../ui-custom/file-upload"
import { SectionTitle } from "../ui-custom/section-title"
import { SubsectionTitle } from "../ui-custom/subsection-title"
import { useForm } from "../form-context"

export default function AssetsLiabilities() {
  const { formData, updateFormData } = useForm()

  const addAsset = () => {
    updateFormData({
      assets: [...formData.assets, { description: "", amount: "" }]
    })
  }

  const removeAsset = (index: number) => {
    if (formData.assets.length > 1) {
      updateFormData({
        assets: formData.assets.filter((_, i) => i !== index)
      })
    }
  }

  const updateAsset = (index: number, field: string, value: string) => {
    const updatedAssets = [...formData.assets]
    updatedAssets[index] = { ...updatedAssets[index], [field]: value }
    updateFormData({ assets: updatedAssets })
  }

  const addLiability = () => {
    updateFormData({
      liabilities: [...formData.liabilities, { description: "", amount: "" }]
    })
  }

  const removeLiability = (index: number) => {
    if (formData.liabilities.length > 1) {
      updateFormData({
        liabilities: formData.liabilities.filter((_, i) => i !== index)
      })
    }
  }

  const updateLiability = (index: number, field: string, value: string) => {
    const updatedLiabilities = [...formData.liabilities]
    updatedLiabilities[index] = { ...updatedLiabilities[index], [field]: value }
    updateFormData({ liabilities: updatedLiabilities })
  }

  return (
    <Box>
      <SectionTitle>Assets & Liabilities</SectionTitle>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Assets</SubsectionTitle>
        <Grid container spacing={3}>
          {formData.assets.map((asset, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <TextField
                  label="Description"
                  fullWidth
                  variant="outlined"
                  value={asset.description}
                  onChange={(e) => updateAsset(index, "description", e.target.value)}
                />
                <TextField
                  label="Amount"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={asset.amount}
                  onChange={(e) => updateAsset(index, "amount", e.target.value)}
                />
                {formData.assets.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => removeAsset(index)}
                    sx={{ mt: 1 }}
                  >
                    <TrashIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<PlusIcon />}
              onClick={addAsset}
            >
              Add Asset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <SubsectionTitle>Liabilities</SubsectionTitle>
        <Grid container spacing={3}>
          {formData.liabilities.map((liability, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <TextField
                  label="Description"
                  fullWidth
                  variant="outlined"
                  value={liability.description}
                  onChange={(e) => updateLiability(index, "description", e.target.value)}
                />
                <TextField
                  label="Amount"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={liability.amount}
                  onChange={(e) => updateLiability(index, "amount", e.target.value)}
                />
                {formData.liabilities.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => removeLiability(index)}
                    sx={{ mt: 1 }}
                  >
                    <TrashIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<PlusIcon />}
              onClick={addLiability}
            >
              Add Liability
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <SubsectionTitle>Business Information</SubsectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you currently operate a business?</FormLabel>
              <RadioGroup
                row
                name="business-operation"
                value={formData.operatesBusiness}
                onChange={(e) => updateFormData({ operatesBusiness: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.operatesBusiness === "yes" && (
            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1">
                  Please attach to your application a Statement of Assets & Liabilities
                </Typography>
              </Box>
              <FileUpload 
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onFileSelect={(file) => updateFormData({ statementOfAssets: file })}
              />
            </Grid>
          )}

          {formData.operatesBusiness === "no" && (
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Are you currently employed?</FormLabel>
                <RadioGroup 
                  row 
                  name="employed" 
                  value={formData.isEmployed} 
                  onChange={(e) => updateFormData({ isEmployed: e.target.value })}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  )
}
