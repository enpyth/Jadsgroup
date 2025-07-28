import React from "react";
import { FileText, Eye } from "lucide-react";
import { Box, Typography, Button } from "@mui/material";
import DocumentViewButton from "./DocumentViewButton";
import DocumentUploadButton from "./DocumentUploadButton";
import DocumentStatusMessage from "./DocumentStatusMessage";
import { userRoles } from "@/constants/config";

interface DocumentsSectionProps {
  leaseData: any;
  processes: any;
  isCompleted: boolean;
  downloadDocument: (fileKey: string) => Promise<void>;
  fileKeys: any;
  isStartApproved: boolean;
  isAdminPublishApproved: boolean;
  isLandlordReviewApproved: boolean;
  isLegalReviewApproved: boolean;
  isFinalReviewApproved: boolean;
  role: string;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  leaseData,
  processes,
  isCompleted,
  downloadDocument,
  fileKeys,
  isStartApproved,
  isAdminPublishApproved,
  isLandlordReviewApproved,
  isLegalReviewApproved,
  isFinalReviewApproved,
  role,
}) => (
  <>
    {/* application form */}
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

    {/* Documents */}
    {/* Lease Schedule Draft - Only visible to admin */}
    {role === userRoles.ADMIN && (
      <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <DocumentViewButton
            label={`LeaseSchedule_${leaseData.lease_id}.docx`}
            fileKey={fileKeys.leaseSchedule}
            disabled={!isStartApproved}
            onDownload={downloadDocument}
          />
          <DocumentUploadButton
            disabled={!isStartApproved}
            email={leaseData.tenant_email}
          />
        </Box>
        <DocumentStatusMessage
          isAvailable={isStartApproved}
          requiredStep="START"
        />
      </div>
    )}
    {/* Lease Schedule */}
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <DocumentViewButton
          label={`LeaseSchedule_${leaseData.lease_id}.pdf`}
          fileKey={fileKeys.leaseSchedulePdf}
          disabled={!isAdminPublishApproved}
          onDownload={downloadDocument}
        />
        {role === userRoles.ADMIN && (
        <DocumentUploadButton
            disabled={!isAdminPublishApproved}
            email={leaseData.tenant_email}
          />
        )}
      </Box>
      <DocumentStatusMessage
        isAvailable={isAdminPublishApproved}
        requiredStep="ADMIN_PUBLISH"
      />
    </div>
    {/* Disclosure Statement */}
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <DocumentViewButton
          label={`DisclosureStatement_${leaseData.lease_id}.docx`}
          fileKey={fileKeys.disclosure}
          disabled={!isLandlordReviewApproved}
          onDownload={downloadDocument}
        />
        {role === userRoles.ADMIN && (
          <DocumentUploadButton
            disabled={!isLandlordReviewApproved}
            email={leaseData.tenant_email}
          />
        )}
      </Box>
      <DocumentStatusMessage
        isAvailable={isLandlordReviewApproved}
        requiredStep="LANDLORD_REVIEW"
      />
    </div>
    {/* Agreement to Lease */}
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <DocumentViewButton
          label={`AgreementToLease_${leaseData.lease_id}.docx`}
          fileKey={fileKeys.agreement}
          disabled={!isLegalReviewApproved}
          onDownload={downloadDocument}
        />
        {role === userRoles.ADMIN && (
          <DocumentUploadButton
            disabled={!isLegalReviewApproved}
            email={leaseData.tenant_email}
          />
        )}
      </Box>
      <DocumentStatusMessage
        isAvailable={isLegalReviewApproved}
        requiredStep="LEGAL_REVIEW"
      />
    </div>
    {/* Legal Lease */}
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <DocumentViewButton
          label={`LegalLease_${leaseData.lease_id}.pdf`}
          fileKey={fileKeys.legalLease}
          disabled={!isLegalReviewApproved}
          onDownload={downloadDocument}
        />
        {(role === userRoles.ADMIN || role === userRoles.LAWYER) && (
          <DocumentUploadButton
            disabled={!isLegalReviewApproved}
            email={leaseData.tenant_email}
          />
        )}
      </Box>
      <DocumentStatusMessage
        isAvailable={isLegalReviewApproved}
        requiredStep="LEGAL_REVIEW"
      />
    </div>
    {/* Signed Contract */}
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <DocumentViewButton
          label={`SignedContract_${leaseData.lease_id}.pdf`}
          fileKey={fileKeys.signedContract}
          disabled={!isFinalReviewApproved}
          onDownload={downloadDocument}
        />
        {role === userRoles.ADMIN && (
          <DocumentUploadButton
            disabled={!isFinalReviewApproved}
            email={leaseData.tenant_email}
          />
        )}
      </Box>
        <DocumentStatusMessage
          isAvailable={isFinalReviewApproved}
          requiredStep="FINAL_REVIEW"
        />
    </div>
  </>
);

export default DocumentsSection;
