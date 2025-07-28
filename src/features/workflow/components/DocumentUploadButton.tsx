import React from "react";
import { Button } from "@mui/material";

export interface DocumentUploadButtonProps {
  disabled: boolean;
  email: string;
}

const DocumentUploadButton: React.FC<DocumentUploadButtonProps> = ({
  disabled,
  email,
}) => {
  // 上传处理
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("email", email);
    console.log("filename: ", file.name);
    console.log("email: ", email);
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
  );
};

export default DocumentUploadButton; 