"use client"

import { formatDistance } from "date-fns"
import { Card, CardContent, CardHeader, Typography, Chip, Button, Divider, Box } from "@mui/material"
import type { Customer, Process } from "@/constants/workflow"
import { FileText, Home, Calendar, CreditCard, User, Mail, PenToolIcon, Wrench, Eye } from "lucide-react"
import { LeasePreviewDialog } from "./dialog-preview"
import { RepairRequestDialog } from "./dialog-repair"
import { useState } from "react"

interface CustomerInfoPanelProps {
  user_email: string
  customer: Customer
  currentStage: string
  processes: Process[]
}

export function CustomerInfoPanel({ user_email, customer, currentStage, processes }: CustomerInfoPanelProps) {
  const [repairDialogOpen, setRepairDialogOpen] = useState(false)
  const [leasePreviewOpen, setLeasePreviewOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const leaseLength = formatDistance(customer.end_date, customer.start_date, { addSuffix: false })
  const isWorkflowComplete = currentStage === "finished"

  // Check if Document Verification process is approved
  const isS1Approved = processes.some((p) => p.stageId === "Review Application" && p.state === "approved")
  const isS5Approved = processes.some((p) => p.stageId === "Land Lord Review" && p.state === "approved")
  const isS8Approved = processes.some((p) => p.stageId === "Legal Review" && p.state === "approved")

  const handleRepairRequest = () => {
    setRepairDialogOpen(true)
  }

  const handleRepairDialogClose = () => {
    setRepairDialogOpen(false)
  }

  const handleRepairSubmit = (description: string, priority: string) => {
    // In a real app, this would send the repair request to the server
    console.log("Repair request submitted:", { description, priority, propertyId: customer.property_id })
    setRepairDialogOpen(false)
  }

  const handleLeasePreview = () => {
    setLeasePreviewOpen(true)
  }

  const handleLeasePreviewClose = () => {
    setLeasePreviewOpen(false)
  }

  return (
    <>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardHeader
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Tenant Information</Typography>
              <Chip
                label={`Property ID: ${customer.property_id}`}
                color={currentStage === "finished" ? "success" : "default"}
                size="small"
              />
            </div>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <User size={16} color="#666" />
            <Typography variant="subtitle2">Tenant</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={16} color="#666" />
              <Typography variant="body2">{user_email}</Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Home size={16} color="#666" />
            <Typography variant="subtitle2">Lease Details</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
              <Typography variant="caption" color="text.secondary">
                Start Date:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatDate(customer.start_date)}
              </Typography>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
              <Typography variant="caption" color="text.secondary">
                End Date:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatDate(customer.end_date)}
              </Typography>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
              <Typography variant="caption" color="text.secondary">
                Lease Length:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {leaseLength}
              </Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <CreditCard size={16} color="#666" />
            <Typography variant="subtitle2">Financial Information</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
              <Typography variant="caption" color="text.secondary">
                Monthly Rent:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatCurrency(customer.rent_amount)}
              </Typography>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
              <Typography variant="caption" color="text.secondary">
                Security Deposit:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatCurrency(customer.deposit_amount)}
              </Typography>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
              <Typography variant="caption" color="text.secondary">
                Total Due at Signing:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatCurrency(customer.rent_amount + customer.deposit_amount)}
              </Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <FileText size={16} color="#666" />
            <Typography variant="subtitle2">Documents</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                disabled={!isS1Approved}
                onClick={handleLeasePreview}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  height: "32px",
                  flexGrow: 1,
                }}
              >
                Lease Schedule
              </Button>
            </Box>
            {!isS1Approved && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after 'Review Application'
              </Typography>
            )}
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                disabled={!isS5Approved}
                onClick={handleLeasePreview}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  height: "32px",
                  flexGrow: 1,
                }}
              >
                Disclosure Statement
              </Button>
            </Box>
            {!isS5Approved && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after 'Land Lord Review'
              </Typography>
            )}
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                disabled={!isS8Approved}
                onClick={handleLeasePreview}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  height: "32px",
                  flexGrow: 1,
                }}
              >
                Aggrement to Lease
              </Button>
            </Box>
            {!isS8Approved && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after 'Legal Review'
              </Typography>
            )}
          </div>

          {/* Repair Request Button - Only enabled when workflow is complete */}
          <Divider sx={{ my: 2 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <PenToolIcon size={16} color="#666" />
            <Typography variant="subtitle2">Maintenance</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Wrench size={14} />}
              fullWidth
              disabled={!isWorkflowComplete}
              onClick={handleRepairRequest}
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                height: "32px",
                bgcolor: isWorkflowComplete ? "primary.main" : "grey.300",
              }}
            >
              Repair Request
            </Button>
            {!isWorkflowComplete && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after application approval
              </Typography>
            )}
          </div>

          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #eee" }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
              <Calendar size={12} style={{ marginRight: "4px" }} />
              Last Updated: {new Date().toLocaleDateString()}
            </Typography>
          </div>
        </CardContent>
      </Card>

      <RepairRequestDialog
        open={repairDialogOpen}
        onClose={handleRepairDialogClose}
        onSubmit={handleRepairSubmit}
        propertyId={customer.property_id}
      />

      <LeasePreviewDialog
        open={leasePreviewOpen}
        onClose={handleLeasePreviewClose}
        propertyId={customer.property_id}
        tenantEmail={customer.tenant_email}
      />
    </>
  )
}

