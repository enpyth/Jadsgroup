import { CreditCard } from "lucide-react";
import { Typography } from "@mui/material";
import React from "react";

interface FinancialInfoProps {
  leaseData: any;
}

const FinancialInfo: React.FC<FinancialInfoProps> = ({ leaseData }) => {
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <CreditCard size={16} color="#666" />
        <Typography variant="subtitle2">Financial Information</Typography>
      </div>
      <div style={{ paddingLeft: "24px", marginBottom: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
          <Typography variant="caption" color="text.secondary">Monthly Rent:</Typography>
          <Typography variant="caption" fontWeight="medium">{formatCurrency(leaseData.rent_amount)}</Typography>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
          <Typography variant="caption" color="text.secondary">Security Deposit:</Typography>
          <Typography variant="caption" fontWeight="medium">{formatCurrency(leaseData.deposit_amount)}</Typography>
        </div>
      </div>
    </>
  );
};

export default FinancialInfo; 