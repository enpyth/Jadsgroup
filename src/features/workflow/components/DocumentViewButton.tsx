import React from "react";
import { Button } from "@mui/material";
import { Eye } from "lucide-react";

export interface DocumentViewButtonProps {
  label: string;
  fileKey: string;
  disabled: boolean;
  onDownload: (fileKey: string) => Promise<void>;
}

const DocumentViewButton: React.FC<DocumentViewButtonProps> = ({
  label,
  fileKey,
  disabled,
  onDownload,
}) => {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<Eye size={14} />}
      disabled={disabled}
      onClick={() => onDownload(fileKey)}
      sx={{
        textTransform: "none",
        fontSize: "0.75rem",
        height: "32px",
        flexGrow: 1,
      }}
    >
      {label}
    </Button>
  );
};

export default DocumentViewButton; 