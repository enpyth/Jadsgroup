"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Box, Button, Typography } from "@mui/material"
import { UploadIcon, Cross1Icon } from "@radix-ui/react-icons"

interface FileUploadProps {
  accept?: string
  onFileSelect?: (file: File) => void
}

export function FileUpload({ accept, onFileSelect }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      onFileSelect?.(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          component="label"
          htmlFor="file-upload"
          startIcon={<UploadIcon />}
          fullWidth
          sx={{ py: 1 }}
        >
          {file ? "Change file" : "Upload file"}
        </Button>
        {file && (
          <Button color="error" onClick={handleRemoveFile} size="small">
            <Cross1Icon />
          </Button>
        )}
      </Box>
      {file && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </Typography>
      )}
    </Box>
  )
}
