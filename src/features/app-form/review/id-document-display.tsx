"use client"

import { Box, Paper, Typography } from "@mui/material"
import Image from "next/image"

interface IDDocumentDisplayProps {
  documentUrl: string
}

export function IDDocumentDisplay({ documentUrl }: IDDocumentDisplayProps) {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        ID Document
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
          <Image
            src={documentUrl}
            alt="ID Document"
            fill
            style={{
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
        </Box>
      </Paper>
    </>
  )
} 