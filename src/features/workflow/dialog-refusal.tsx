"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material"

interface RefusalDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
}

export function RefusalDialog({ open, onClose, onSubmit }: RefusalDialogProps) {
  const [reason, setReason] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError(true)
      return
    }

    onSubmit(reason)
    setReason("")
    setError(false)
  }

  const handleClose = () => {
    onClose()
    setReason("")
    setError(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Refuse Process</DialogTitle>
      <DialogContent>
        <DialogContentText>Please provide a reason for refusing this process.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="reason"
          label="Reason"
          fullWidth
          multiline
          rows={3}
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
            if (e.target.value.trim()) setError(false)
          }}
          error={error}
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
        />
        {error && <FormHelperText error>Please provide a reason for refusal</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" size="small">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

