import { Typography, Box } from "@mui/material"
import type { ReactNode } from "react"

interface SectionTitleProps {
  children: ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" fontWeight="bold" color="primary.main">
        {children}
      </Typography>
    </Box>
  )
}
