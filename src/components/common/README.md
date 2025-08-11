# Common Components

This directory contains reusable components that can be used across the application.

## ImageUpload

A component for uploading and managing a single image.

### Props

- `label`: Display label for the upload area
- `value`: Current image URL
- `onChange`: Callback function when image changes
- `onRemove`: Optional callback when image is removed
- `required`: Whether the image is required
- `maxWidth`: Maximum width of the image preview card
- `height`: Height of the upload button and image preview
- `showRemoveButton`: Whether to show the remove button

### Usage

```tsx
import { ImageUpload } from '@/components/common';

<ImageUpload
  label="Profile Picture"
  value={profileImage}
  onChange={setProfileImage}
  required
  height={200}
/>
```

## CarouselImageUpload

A component for uploading and managing multiple images with a maximum limit.

### Props

- `label`: Display label for the upload area
- `value`: Array of current image URLs
- `onChange`: Callback function when images change
- `maxImages`: Maximum number of images allowed (default: 5)
- `maxWidth`: Maximum width of each image preview card
- `height`: Height of the upload button and image previews

### Usage

```tsx
import { CarouselImageUpload } from '@/components/common';

<CarouselImageUpload
  label="Gallery Images"
  value={galleryImages}
  onChange={setGalleryImages}
  maxImages={10}
  height={150}
/>
```

## Features

- **File Validation**: Only accepts image files
- **Size Limit**: Maximum 5MB per file
- **Drag & Drop**: Visual feedback for upload areas
- **Preview**: Shows uploaded images with options to change or remove
- **Error Handling**: Displays validation errors
- **Loading States**: Shows upload progress
- **Responsive**: Works on all screen sizes

## Upload API

Both components use the `/api/upload` endpoint which:

- Accepts files via FormData
- Requires a `key` parameter for R2 storage
- Returns the public URL of the uploaded file
- Uses Cloudflare R2 for storage

### Key Format

Images are stored with keys like: `properties/temp/{timestamp}_{filename}`

This allows for easy organization and cleanup of temporary uploads.
