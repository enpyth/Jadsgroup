"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import type { Process, ProcessId, WorkflowId } from "@/constants/workflow";
import { PROCESS_IDS, STATES } from "@/constants/workflow";
import {
  Calendar,
} from "lucide-react";
import React from "react";
import { type InferSelectModel } from "drizzle-orm";
import { leases } from "@/db/schema";
import { useRouter } from "next/navigation";
import { downloadDocument } from "@/lib/documentUtils";
import TenantInfo from "./components/TenantInfo";
import LeaseDetails from "./components/LeaseDetails";
import FinancialInfo from "./components/FinancialInfo";
import DocumentsSection from "./components/DocumentsSection";
import MaintenanceSection from "./components/MaintenanceSection";

type LeaseData = InferSelectModel<typeof leases>;

interface CustomerInfoPanelProps {
  leaseData: LeaseData;
  processes: Process[];
  isCompleted: boolean;
  role: string;
}

// Check if all processes in the list are approved
function isProcessApproved(processes: Process[], processIds: ProcessId[]) {
  return processIds.every((id) =>
    processes.some((p) => p.id === id && p.state === STATES.APPROVED)
  );
}

// 将CustomerInfoPanel重命名为InfoPanel
export default function InfoPanel({
  leaseData,
  processes,
  isCompleted,
  role,
}: CustomerInfoPanelProps) {
  const router = useRouter();

  // Check if processes are approved
  const isStartApproved = isProcessApproved(processes, [
    PROCESS_IDS.REVIEW_APPLICATION,
  ]);
  const isAdminPublishApproved = isProcessApproved(processes, [
    PROCESS_IDS.ADMIN_PUBLISH,
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
  const isFinalReviewApproved = isProcessApproved(processes, [
    PROCESS_IDS.FINAL_REVIEW,
  ]);

  const handleRepairRequest = () => {
    router.push('/dashboard/maintenance');
  };

  // 复用 fileKey 生成
  const fileKeys = {
    leaseSchedule: `tenants/${leaseData.tenant_email}/LeaseSchedule_${leaseData.lease_id}.docx`,
    leaseSchedulePdf: `tenants/${leaseData.tenant_email}/LeaseSchedule_${leaseData.lease_id}.pdf`,
    disclosure: `tenants/${leaseData.tenant_email}/DisclosureStatement_${leaseData.lease_id}.docx`,
    agreement: `tenants/${leaseData.tenant_email}/AgreementToLease_${leaseData.lease_id}.docx`,
    legalLease: `tenants/${leaseData.tenant_email}/LegalLease_${leaseData.lease_id}.pdf`,
    signedContract: `tenants/${leaseData.tenant_email}/SignedContract_${leaseData.lease_id}.pdf`,
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
          <TenantInfo leaseData={leaseData} />
          <Divider sx={{ my: 2 }} />
          <LeaseDetails leaseData={leaseData} />
          <Divider sx={{ my: 2 }} />
          <FinancialInfo leaseData={leaseData} />
          <Divider sx={{ my: 2 }} />
          <DocumentsSection
            leaseData={leaseData}
            processes={processes}
            isCompleted={isCompleted}
            downloadDocument={downloadDocument}
            fileKeys={fileKeys}
            isStartApproved={isStartApproved}
            isAdminPublishApproved={isAdminPublishApproved}
            isLandlordReviewApproved={isLandlordReviewApproved}
            isLegalReviewApproved={isLegalReviewApproved}
            isFinalReviewApproved={isFinalReviewApproved}
            role={role}
          />
          <Divider sx={{ my: 2 }} />
          <MaintenanceSection
            isCompleted={isCompleted}
            handleRepairRequest={handleRepairRequest}
          />
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
