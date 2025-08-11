import React from "react";
import { Button, Box } from "@mui/material";
import { Eye } from "lucide-react";

export interface DocumentActionProps {
  label: string;
  fileKey: string;
  disabled: boolean;
  onDownload: (fileKey: string) => Promise<void>;
  email: string;
}

const DocumentAction: React.FC<DocumentActionProps> = ({
  label,
  fileKey,
  disabled,
  onDownload,
  email,
}) => {
  // 上传处理
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const key = `tenants/${email}/${file.name}`
    formData.append("key", key);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      alert("Uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
      <Button
        variant="outlined"
        size="small"
        component="label"
        sx={{
          minWidth: 0,
          padding: "4px",
          fontSize: "0.75rem",
          height: "32px",
        }}
        disabled={disabled}
      >
        Upload
        <input
          type="file"
          hidden
          onChange={handleUpload}
          accept=".doc,.docx,.pdf"
        />
      </Button>
    </Box>
  );
};

export default DocumentAction;