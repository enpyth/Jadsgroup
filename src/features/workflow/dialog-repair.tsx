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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material"
import { PenToolIcon as Tool } from "lucide-react"

interface RepairRequestDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (description: string, priority: string) => void
  propertyId: number
}

export function RepairRequestDialog({ open, onClose, onSubmit, propertyId }: RepairRequestDialogProps) {
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (!description.trim()) {
      setError(true)
      return
    }

    onSubmit(description, priority)
    resetForm()
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setDescription("")
    setPriority("medium")
    setError(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tool size={20} />
          <Typography>Submit Repair Request</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide details about the repair needed for Property ID: {propertyId}
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Repair Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            if (e.target.value.trim()) setError(false)
          }}
          error={error}
          helperText={error ? "Please provide a description of the repair needed" : ""}
          variant="outlined"
          sx={{ mt: 2, mb: 2 }}
        />

        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="low">Low - Not urgent, can be scheduled</MenuItem>
            <MenuItem value="medium">Medium - Needs attention within a week</MenuItem>
            <MenuItem value="high">High - Requires prompt attention</MenuItem>
            <MenuItem value="emergency">Emergency - Immediate attention required</MenuItem>
          </Select>
          <FormHelperText>Select the urgency of this repair request</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  )
}

