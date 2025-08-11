import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { UploadIcon, TrashIcon, PlusIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  required?: boolean;
  maxWidth?: number;
  height?: number;
  showRemoveButton?: boolean;
  prefixKey?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onRemove,
  required = false,
  maxWidth = 300,
  height = 200,
  showRemoveButton = true,
  prefixKey = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Generate a unique key for the image
      const timestamp = Date.now();
      const key = `${prefixKey}/${timestamp}_${file.name}`;
      formData.append('key', key);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      onChange(result.url);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange('');
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" mb={2}>
        {label} {required && '*'}
      </Typography>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {!value ? (
        <Button
          variant="outlined"
          onClick={handleClick}
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
          sx={{
            width: '100%',
            height: height,
            border: '2px dashed',
            borderColor: 'grey.300',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
        >
          {uploading ? 'Uploading...' : 'Click to upload image'}
        </Button>
      ) : (
        <Card sx={{ maxWidth: maxWidth }}>
          <CardMedia
            component="img"
            height={height}
            image={value}
            alt={label}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ p: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" noWrap>
                {label}
              </Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={handleClick}
                  disabled={uploading}
                  title="Change image"
                >
                  <PlusIcon />
                </IconButton>
                {showRemoveButton && (
                  <IconButton
                    size="small"
                    onClick={handleRemove}
                    color="error"
                    title="Remove image"
                  >
                    <TrashIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
