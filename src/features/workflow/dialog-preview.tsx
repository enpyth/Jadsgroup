"use client"

import { useState } from "react"
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
} from "@mui/material"
import { FileText, Download, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

interface LeasePreviewDialogProps {
  open: boolean
  onClose: () => void
  propertyId: number
  tenantEmail: string
}

export function LeasePreviewDialog({ open, onClose, propertyId, tenantEmail }: LeasePreviewDialogProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(5) // In a real app, this would be determined from the PDF
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState(true)

  // Simulate loading the document
  useState(() => {
    if (open) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  })

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    console.log("Downloading lease agreement for property:", propertyId)
    // Typically you would use something like:
    // window.open('/api/documents/lease-agreement?propertyId=' + propertyId, '_blank');
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
          <Button variant="outlined" size="small" startIcon={<Download size={16} />} onClick={handleDownload}>
            Download
          </Button>
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
        <Button onClick={handlePrevPage} disabled={currentPage === 1 || loading} startIcon={<ChevronLeft size={16} />}>
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading}
          endIcon={<ChevronRight size={16} />}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  )
}

