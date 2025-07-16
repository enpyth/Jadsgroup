import { User, Mail } from "lucide-react";
import { Typography } from "@mui/material";
import React from "react";

interface TenantInfoProps {
  leaseData: any;
}

const TenantInfo: React.FC<TenantInfoProps> = ({ leaseData }) => (
  <>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
      <User size={16} color="#666" />
      <Typography variant="subtitle2">Tenant</Typography>
    </div>
    <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Mail size={16} color="#666" />
        <Typography variant="body2">{leaseData.tenant_email}</Typography>
      </div>
    </div>
  </>
);

export default TenantInfo; 