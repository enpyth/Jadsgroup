"use client"

import { Box, Button } from "@mui/material"
import { useForm } from "../form-context"

interface FormNavigationProps {
  onSubmit: () => void
  isAgreed: boolean
}

export default function FormNavigation({ onSubmit, isAgreed }: FormNavigationProps) {
  const { currentStep, totalSteps, goToNextStep, goToPreviousStep } = useForm()

  const buttonStyle = {
    minWidth: "120px",
    textTransform: "none",
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
      <Button
        variant="outlined"
        onClick={goToPreviousStep}
        disabled={currentStep === 0}
        sx={buttonStyle}
      >
        Previous
      </Button>
      {currentStep === totalSteps - 1 ? (
        <Button 
          variant="contained" 
          type="submit" 
          size="large" 
          color="primary"
          onClick={onSubmit}
          disabled={!isAgreed}
          sx={buttonStyle}
        >
          Submit Application
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={goToNextStep}
          sx={buttonStyle}
        >
          Next
        </Button>
      )}
    </Box>
  )
} 