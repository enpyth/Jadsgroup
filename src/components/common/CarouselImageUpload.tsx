import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { UploadIcon, TrashIcon, PlusIcon } from 'lucide-react';

interface CarouselImageUploadProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  maxWidth?: number;
  height?: number;
  prefixKey?: string;
}

export default function CarouselImageUpload({
  label,
  value,
  onChange,
  maxImages = 5,
  maxWidth = 300,
  height = 150,
  prefixKey = '',
}: CarouselImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if we've reached the maximum number of images
    if (value.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

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
      onChange([...value, result.url]);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    if (value.length < maxImages) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  const canAddMore = value.length < maxImages;

  return (
    <Box>
      <Typography variant="subtitle1" mb={2}>
        {label} ({value.length}/{maxImages})
      </Typography>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Upload Button */}
      {canAddMore && (
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
            mb: 2,
          }}
        >
          {uploading ? 'Uploading...' : `Add Image (${value.length}/${maxImages})`}
        </Button>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <Grid container spacing={2}>
          {value.map((imageUrl, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height={height}
                  image={imageUrl}
                  alt={`${label} ${index + 1}`}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" noWrap>
                      {label} {index + 1}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemove(index)}
                      color="error"
                      title="Remove image"
                    >
                      <TrashIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
