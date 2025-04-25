import { Box, Button } from "@mui/material"

type FormNavigationProps = {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrevious: () => void
  onSubmit?: () => void
}

export function FormNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onSubmit 
}: FormNavigationProps) {
  const buttonStyle = {
    minWidth: '120px',
    borderRadius: 2,
    textTransform: 'none' as const,
    fontWeight: 'medium' as const
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
      {currentStep > 1 ? (
        <Button 
          variant="outlined" 
          onClick={onPrevious} 
          size="large"
          sx={buttonStyle}
        >
          Previous
        </Button>
      ) : (
        <Box /> // Empty box for spacing
      )}

      {currentStep < totalSteps ? (
        <Button 
          variant="contained" 
          onClick={onNext} 
          size="large"
          sx={buttonStyle}
        >
          Next
        </Button>
      ) : (
        <Button 
          variant="contained" 
          type="submit" 
          size="large" 
          color="primary"
          onClick={onSubmit}
          sx={buttonStyle}
        >
          Submit Application
        </Button>
      )}
    </Box>
  )
} 