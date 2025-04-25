import { Typography, Box } from "@mui/material"
import type { ReactNode } from "react"

interface SubsectionTitleProps {
  children: ReactNode
}

export function SubsectionTitle({ children }: SubsectionTitleProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" fontWeight="medium">
        {children}
      </Typography>
    </Box>
  )
}
