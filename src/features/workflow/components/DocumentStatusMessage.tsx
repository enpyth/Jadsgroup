import React from "react";
import { Typography } from "@mui/material";

export interface DocumentStatusMessageProps {
  isAvailable: boolean;
  requiredStep: string;
}

const DocumentStatusMessage: React.FC<DocumentStatusMessageProps> = ({
  isAvailable,
  requiredStep,
}) => {
  if (isAvailable) return null;

  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", mt: 1, textAlign: "center" }}
    >
      Available after '{requiredStep}'
    </Typography>
  );
};

export default DocumentStatusMessage; 