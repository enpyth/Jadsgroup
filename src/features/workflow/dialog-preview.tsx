"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
  Skeleton,
  Divider,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material"
import { FileText, Download, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Edit2, Save } from "lucide-react"

interface LeasePreviewDialogProps {
  open: boolean
  onClose: () => void
  propertyId: number
  tenantEmail: string
  previewUrl: string | null
}

export function LeasePreviewDialog({ open, onClose, propertyId, tenantEmail, previewUrl }: LeasePreviewDialogProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(5) // In a real app, this would be determined from the PDF
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Simulate loading the document
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleDownload = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
    // In a real app, you would fetch the document content here
    setEditedContent("This is the editable content of the document...");
  }

  const handleSave = async () => {
    try {
      // In a real app, you would send the edited content to the server
      const response = await fetch('/api/documents/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
          documentKey: 'documents/c5908eea-0b56-481b-924d-f9d3f7bdc3bb.docx',
        }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Document saved successfully' });
        setIsEditing(false);
      } else {
        throw new Error('Failed to save document');
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to save document' });
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent("");
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(zoom + 0.1)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.1)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FileText size={20} />
            <Typography>Lease Agreement</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 1,
        }}
      >
        <Box>
          <Typography variant="body2">
            Property ID: {propertyId} | Tenant: {tenantEmail}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isEditing ? (
            <>
              <Button variant="outlined" size="small" startIcon={<Download size={16} />} onClick={handleDownload}>
                Download
              </Button>
              <Button variant="outlined" size="small" startIcon={<Edit2 size={16} />} onClick={handleEdit}>
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" size="small" startIcon={<Save size={16} />} onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" size="small" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
          <IconButton onClick={handleZoomOut} size="small">
            <ZoomOut size={16} />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {Math.round(zoom * 100)}%
          </Typography>
          <IconButton onClick={handleZoomIn} size="small">
            <ZoomIn size={16} />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          p: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton variant="rectangular" width="80%" height={80} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="80%" height={40} />
          </Box>
        ) : isEditing ? (
          <TextField
            multiline
            fullWidth
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{
              width: `${80 * zoom}%`,
              height: `${100 * zoom}%`,
              maxHeight: "100%",
              bgcolor: "white",
              '& .MuiInputBase-root': {
                height: '100%',
              },
              '& .MuiInputBase-input': {
                height: '100% !important',
              },
            }}
          />
        ) : previewUrl ? (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewUrl)}&embedded=true`}
            style={{
              width: `${80 * zoom}%`,
              height: `${100 * zoom}%`,
              maxHeight: "100%",
              border: "none",
              transition: "all 0.3s ease",
            }}
            allowFullScreen
          />
        ) : (
          <Paper
            elevation={2}
            sx={{
              width: `${80 * zoom}%`,
              height: `${100 * zoom}%`,
              maxHeight: "100%",
              overflow: "auto",
              transition: "all 0.3s ease",
              p: 3,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              RESIDENTIAL LEASE AGREEMENT
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Page {currentPage} of {totalPages}
            </Typography>

            <Typography variant="body1" paragraph>
              THIS LEASE AGREEMENT (hereinafter referred to as the "Agreement") made and entered into this{" "}
              {new Date().toLocaleDateString()}, by and between Property Management LLC (hereinafter referred to as
              "Landlord") and {tenantEmail} (hereinafter referred to as "Tenant").
            </Typography>

            <Typography variant="body1" paragraph>
              WITNESSETH: That for and in consideration of the covenants and obligations contained herein and other good
              and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the parties
              hereto agree as follows:
            </Typography>

            <Typography variant="h6" gutterBottom>
              PROPERTY:
            </Typography>
            <Typography variant="body1" paragraph>
              Landlord hereby leases to Tenant and Tenant hereby leases from Landlord for residential purposes only, the
              premises located at Property #{propertyId} (hereinafter referred to as the "Premises").
            </Typography>

            <Typography variant="h6" gutterBottom>
              TERM:
            </Typography>
            <Typography variant="body1" paragraph>
              The term of this Agreement shall commence on {new Date().toLocaleDateString()} and shall continue as a
              lease for term. The termination date shall be on{" "}
              {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()} at 11:59 PM. Upon
              termination date, Tenant shall be required to vacate the Premises unless one of the following
              circumstances occur:
            </Typography>

            <Typography variant="body1" paragraph>
              (i) Landlord and Tenant formally extend this Agreement in writing or create and execute a new, written,
              and signed Agreement; or
            </Typography>
            <Typography variant="body1" paragraph>
              (ii) Landlord willingly accepts new Rent from Tenant, which does not constitute past due Rent.
            </Typography>

            {/* More lease content would go here */}
          </Paper>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1 || loading || isEditing} startIcon={<ChevronLeft size={16} />}>
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading || isEditing}
          endIcon={<ChevronRight size={16} />}
        >
          Next
        </Button>
      </DialogActions>

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.type || "info"}
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Dialog>
  )
}

