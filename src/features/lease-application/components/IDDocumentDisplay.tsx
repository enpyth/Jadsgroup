import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface IDDocumentDisplayProps {
  documentUrl: string;
}

export const IDDocumentDisplay = ({ documentUrl }: IDDocumentDisplayProps) => {
  if (!documentUrl) {
    return (
      <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">No document uploaded</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
      <Image
        src={documentUrl}
        alt="ID Document"
        fill
        style={{ objectFit: 'contain' }}
      />
    </Box>
  );
}; 