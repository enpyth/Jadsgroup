import { Home } from "lucide-react";
import { Typography } from "@mui/material";
import React from "react";

interface LeaseDetailsProps {
  leaseData: any;
}

const LeaseDetails: React.FC<LeaseDetailsProps> = ({ leaseData }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <Home size={16} color="#666" />
        <Typography variant="subtitle2">Lease Details</Typography>
      </div>
      <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
          <Typography variant="caption" color="text.secondary">Start Date:</Typography>
          <Typography variant="caption" fontWeight="medium">{formatDate(new Date(leaseData.start_date))}</Typography>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
          <Typography variant="caption" color="text.secondary">End Date:</Typography>
          <Typography variant="caption" fontWeight="medium">{formatDate(new Date(leaseData.end_date))}</Typography>
        </div>
      </div>
    </>
  );
};

export default LeaseDetails; 