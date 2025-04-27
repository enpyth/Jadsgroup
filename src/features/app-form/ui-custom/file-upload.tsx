"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Box, Button, Typography } from "@mui/material"
import { UploadIcon, Cross1Icon } from "@radix-ui/react-icons"

interface FileUploadProps {
  accept?: string
  onFileSelect?: (file: File) => void
  id: string
  maxSizeMB?: number
}

export function FileUpload({ accept, onFileSelect, id, maxSizeMB }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      
      // Check file size if maxSizeMB is provided
      if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
        setError(`File size must be less than ${maxSizeMB}MB`)
        return
      }

      setFile(selectedFile)
      if (onFileSelect) {
        onFileSelect(selectedFile)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    if (onFileSelect) {
      onFileSelect(null as any)
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
        id={id}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          component="label"
          htmlFor={id}
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
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}
