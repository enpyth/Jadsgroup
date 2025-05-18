"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Button,
  Divider,
  Box,
} from "@mui/material";
import type { Process, ProcessId, WorkflowId } from "@/constants/workflow";
import { WORKFLOW_IDS, PROCESS_IDS, STATES } from "@/constants/workflow";
import {
  FileText,
  Home,
  Calendar,
  CreditCard,
  User,
  Mail,
  PenToolIcon,
  Wrench,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { type InferSelectModel } from "drizzle-orm";
import { leases } from "@/db/schema";
import { useRouter } from "next/navigation";

type LeaseData = InferSelectModel<typeof leases>;

interface CustomerInfoPanelProps {
  leaseData: LeaseData;
  processes: Process[];
  isCompleted: boolean;
}

// Check if all processes in the list are approved
function isProcessApproved(processes: Process[], processIds: ProcessId[]) {
  return processIds.every((id) =>
    processes.some((p) => p.id === id && p.state === STATES.APPROVED)
  );
}

export default function CustomerInfoPanel({
  leaseData,
  processes,
  isCompleted,
}: CustomerInfoPanelProps) {
  const router = useRouter();

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if processes are approved
  const isStartApproved = isProcessApproved(processes, [
    PROCESS_IDS.REVIEW_APPLICATION,
  ]);
  const isLandlordReviewApproved = isProcessApproved(processes, [
    PROCESS_IDS.LANDLORD_REVIEW,
    PROCESS_IDS.REVIEW_APPLICATION,
  ]);
  const isLegalReviewApproved = isProcessApproved(processes, [
    PROCESS_IDS.DRAFT_CONTRACT,
    PROCESS_IDS.LANDLORD_REVIEW,
    PROCESS_IDS.REVIEW_APPLICATION,
  ]);

  const handleRepairRequest = () => {
    router.push('/dashboard/maintenance');
  };

  const downloadDocument = async (fileKey: string) => {
    try {
      const downloadUrl = `/api/download?key=${encodeURIComponent(fileKey)}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleLeaseScheduleDownload = async () => {
    const fileKey = `${leaseData.tenant_email}/LeaseSchedule_${leaseData.lease_id}.docx`;
    await downloadDocument(fileKey);
  };

  const handleDisclosureStatementDownload = async () => {
    const fileKey = `${leaseData.tenant_email}/DisclosureStatement_${leaseData.lease_id}.docx`;
    await downloadDocument(fileKey);
  };

  const handleAgreementToLeaseDownload = async () => {
    const fileKey = `${leaseData.tenant_email}/AgreementToLease_${leaseData.lease_id}.docx`;
    await downloadDocument(fileKey);
  };

  return (
    <>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardHeader
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Tenant Information</Typography>
              <Chip
                label={`Property ID: ${leaseData.property_id}`}
                color={isCompleted ? "success" : "default"}
                size="small"
              />
            </div>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <User size={16} color="#666" />
            <Typography variant="subtitle2">Tenant</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={16} color="#666" />
              <Typography variant="body2">{leaseData.tenant_email}</Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Home size={16} color="#666" />
            <Typography variant="subtitle2">Lease Details</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Start Date:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatDate(new Date(leaseData.start_date))}
              </Typography>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                End Date:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatDate(new Date(leaseData.end_date))}
              </Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <CreditCard size={16} color="#666" />
            <Typography variant="subtitle2">Financial Information</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Monthly Rent:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatCurrency(leaseData.rent_amount)}
              </Typography>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Security Deposit:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatCurrency(leaseData.deposit_amount)}
              </Typography>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Total Due at Signing:
              </Typography>
              <Typography variant="caption" fontWeight="medium">
                {formatCurrency(leaseData.rent_amount) +
                  formatCurrency(leaseData.deposit_amount)}
              </Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <FileText size={16} color="#666" />
            <Typography variant="subtitle2">Documents</Typography>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                onClick={() =>
                  (window.location.href = `/dashboard/lease/application/${leaseData.lease_id}`)
                }
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  height: "32px",
                  flexGrow: 1,
                }}
              >
                Application Form
              </Button>
            </Box>
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                disabled={!isStartApproved}
                onClick={handleLeaseScheduleDownload}
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
            {!isStartApproved && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after '{WORKFLOW_IDS.START}'
              </Typography>
            )}
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                disabled={!isLandlordReviewApproved}
                onClick={handleDisclosureStatementDownload}
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
            {!isLandlordReviewApproved && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after '{WORKFLOW_IDS.LANDLORD_REVIEW}'
              </Typography>
            )}
          </div>
          <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Eye size={14} />}
                disabled={!isLegalReviewApproved}
                onClick={handleAgreementToLeaseDownload}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  height: "32px",
                  flexGrow: 1,
                }}
              >
                Agreement to Lease
              </Button>
            </Box>
            {!isLegalReviewApproved && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after '{WORKFLOW_IDS.LEGAL_REVIEW}'
              </Typography>
            )}
          </div>

          {/* Repair Request Button - Only enabled when workflow is complete */}
          <Divider sx={{ my: 2 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
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
              disabled={!isCompleted}
              onClick={handleRepairRequest}
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                height: "32px",
                bgcolor: isCompleted ? "primary.main" : "grey.300",
              }}
            >
              Repair Request
            </Button>
            {!isCompleted && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                Available after '{WORKFLOW_IDS.FINAL_REVIEW}'
              </Typography>
            )}
          </div>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #eee",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Calendar size={12} style={{ marginRight: "4px" }} />
              Last Updated: {new Date().toLocaleDateString()}
            </Typography>
          </div>
        </CardContent>
      </Card>

    </>
  );
}
