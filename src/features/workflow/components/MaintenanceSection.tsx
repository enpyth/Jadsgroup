import { PenToolIcon, Wrench } from "lucide-react";
import { Typography, Button } from "@mui/material";
import React from "react";

interface MaintenanceSectionProps {
  isCompleted: boolean;
  handleRepairRequest: () => void;
}

const MaintenanceSection: React.FC<MaintenanceSectionProps> = ({ isCompleted, handleRepairRequest }) => (
  <>
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
          Available after 'FINAL_REVIEW'
        </Typography>
      )}
    </div>
  </>
);

export default MaintenanceSection; 