"use client"

import { Box, Step, StepLabel, Stepper, Typography, useMediaQuery, useTheme, Paper } from "@mui/material"

interface FormProgressProps {
  currentStep: number
  totalSteps: number
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const steps = [
    { number: 1, title: "Lease Information" },
    { number: 2, title: "Application Details" },
    { number: 3, title: "Entity Details" },
    { number: 4, title: "Assets & Liabilities" },
    { number: 5, title: "Rental History" },
    { number: 6, title: "Trading Experience" },
    { number: 7, title: "Privacy Acknowledgment" },
  ]

  if (isMobile) {
    return (
      <Paper elevation={0} sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
          <Typography variant="body1" fontWeight="medium">
            Step {currentStep} of {totalSteps}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="medium">
            {steps[currentStep - 1].title}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", bgcolor: "rgba(0,0,0,0.06)", borderRadius: 1, height: 8, position: "relative" }}>
          <Box
            sx={{
              bgcolor: "primary.main",
              height: "100%",
              borderRadius: 1,
              width: `${(currentStep / totalSteps) * 100}%`,
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>
      </Paper>
    )
  }

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.number}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  )
}
