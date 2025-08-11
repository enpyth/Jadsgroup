import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface InvoiceUploadProps {
  invoiceId: string;
  invoiceImg: string;
  onInvoiceIdChange: (value: string) => void;
  onInvoiceImgChange: (value: string) => void;
  leaseId: number;
  tenantEmail: string;
}

export const InvoiceUpload: React.FC<InvoiceUploadProps> = ({
  invoiceId,
  invoiceImg,
  onInvoiceIdChange,
  onInvoiceImgChange,
  leaseId,
  tenantEmail,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const key = `tenants/${tenantEmail}/invoice_${leaseId}_${Date.now()}_${file.name}`
      formData.append('key', key);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const { url } = await response.json();
      onInvoiceImgChange(url);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Invoice Information
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Invoice ID"
          value={invoiceId}
          onChange={(e) => onInvoiceIdChange(e.target.value)}
          placeholder="Enter invoice ID"
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Invoice Image
        </Typography>
        
        {invoiceImg && invoiceImg !== 'placeholder.jpg' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fafafa',
              minHeight: '300px'
            }}>
              <img 
                src={invoiceImg} 
                alt="Invoice" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '400px', 
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onInvoiceImgChange('placeholder.jpg')}
                color="error"
              >
                Remove Image
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ 
            border: '2px dashed #ccc', 
            borderRadius: 1, 
            p: 4, 
            textAlign: 'center',
            backgroundColor: '#fafafa',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ImageIcon size={64} color="#999" style={{ marginBottom: '16px' }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              No invoice image uploaded
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Upload an image to display it here
            </Typography>
          </Box>
        )}

        <Button
          variant="outlined"
          component="label"
          startIcon={<Upload size={16} />}
          disabled={isUploading}
          sx={{ mt: 1 }}
        >
          {isUploading ? 'Uploading...' : 'Upload Invoice Image'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>

      {uploadError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {uploadError}
        </Alert>
      )}
    </Box>
  );
}; 