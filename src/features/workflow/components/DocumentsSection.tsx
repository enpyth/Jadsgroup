import React from "react";
import { FileText, Eye } from "lucide-react";
import { Box, Typography, Button } from "@mui/material";
import DocumentAction from "./DocumentAction";

interface DocumentsSectionProps {
  leaseData: any;
  processes: any;
  isCompleted: boolean;
  downloadDocument: (fileKey: string) => Promise<void>;
  fileKeys: any;
  isStartApproved: boolean;
  isLandlordReviewApproved: boolean;
  isLegalReviewApproved: boolean;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  leaseData,
  processes,
  isCompleted,
  downloadDocument,
  fileKeys,
  isStartApproved,
  isLandlordReviewApproved,
  isLegalReviewApproved,
}) => (
  <>
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
      <DocumentAction
        label="Lease Schedule"
        fileKey={fileKeys.leaseSchedule}
        disabled={!isStartApproved}
        onDownload={downloadDocument}
        email={leaseData.tenant_email}
      />
      {!isStartApproved && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1, textAlign: "center" }}
        >
          Available after 'START'
        </Typography>
      )}
    </div>
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <DocumentAction
        label="Disclosure Statement"
        fileKey={fileKeys.disclosure}
        disabled={!isLandlordReviewApproved}
        onDownload={downloadDocument}
        email={leaseData.tenant_email}
      />
      {!isLandlordReviewApproved && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1, textAlign: "center" }}
        >
          Available after 'LANDLORD_REVIEW'
        </Typography>
      )}
    </div>
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <DocumentAction
        label="Agreement to Lease"
        fileKey={fileKeys.agreement}
        disabled={!isLegalReviewApproved}
        onDownload={downloadDocument}
        email={leaseData.tenant_email}
      />
      {!isLegalReviewApproved && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1, textAlign: "center" }}
        >
          Available after 'LEGAL_REVIEW'
        </Typography>
      )}
    </div>
  </>
);

export default DocumentsSection; 