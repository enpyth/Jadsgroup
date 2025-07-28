# CloudConvert Integration Setup

This guide explains how to set up CloudConvert for Word to PDF conversion in your application.

## Prerequisites

1. A CloudConvert account (sign up at https://cloudconvert.com)
2. API key from CloudConvert dashboard

## Setup Steps

### 1. Get Your CloudConvert API Key

1. Log in to your CloudConvert account
2. Go to Dashboard → API Keys
3. Create a new API key or use an existing one
4. Copy the API key

### 2. Add Environment Variable

Add the following environment variable to your `.env.local` file:

```bash
CLOUDCONVERT_API_KEY=your_cloudconvert_api_key_here
```

### 3. Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `CLOUDCONVERT_API_KEY` | Your CloudConvert API key | Yes (for CloudConvert conversion) |
| `CLOUDFLARE_R2_ENDPOINT` | Cloudflare R2 endpoint | Yes |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | R2 access key ID | Yes |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | R2 secret access key | Yes |
| `CLOUDFLARE_R2_BUCKET_NAME` | R2 bucket name | Yes |

### 4. How It Works

The implementation follows this **server-side only** workflow:

1. **Client Request**: Client calls `generatePdf(inputKey, outputKey)` with R2 file keys
2. **Server Download**: Server downloads the Word document directly from R2
3. **Convert**: Server sends file to CloudConvert API for conversion
4. **Wait**: Server polls CloudConvert for job completion
5. **Download**: Server downloads the converted PDF from CloudConvert
6. **Upload**: Server uploads the PDF back to R2 storage
7. **Response**: Server returns success/error to client

**Key Benefits:**
- ✅ **No client-side downloads**: Files never leave the server
- ✅ **Efficient**: Direct R2 to R2 conversion
- ✅ **Secure**: All file operations happen server-side
- ✅ **Scalable**: Can handle large files without browser limitations

### 5. Fallback Mechanism

If CloudConvert is not configured or fails:
- The system will use a fallback PDF generation method
- This creates a simple PDF structure for testing purposes
- In production, you should implement a proper fallback solution

### 6. Testing

To test the integration:

1. Ensure all environment variables are set
2. Trigger the `ADMIN_PUBLISH` workflow process
3. Check the console logs for conversion status
4. Verify the PDF is uploaded to R2 storage

### 7. Troubleshooting

**Common Issues:**

1. **API Key Not Set**: 
   - Error: "CLOUDCONVERT_API_KEY environment variable is not set"
   - Solution: Add the API key to your environment variables

2. **R2 File Not Found**:
   - Error: "No file body received from R2"
   - Solution: Check if the input file exists in R2 storage

3. **Conversion Timeout**:
   - Error: "Conversion timeout - job did not complete within expected time"
   - Solution: Check CloudConvert service status or increase timeout

4. **Upload Failed**:
   - Error: "Failed to upload file to CloudConvert"
   - Solution: Check file size limits and network connectivity

### 8. CloudConvert Pricing

- Free tier: 25 conversions per day
- Paid plans: Starting from $9/month
- Check https://cloudconvert.com/pricing for current rates

### 9. Alternative Services

If CloudConvert doesn't meet your needs, consider:

- **AWS Textract**: For AWS users
- **Google Docs API**: For Google Workspace users
- **Microsoft Graph API**: For Microsoft 365 users
- **PDFShift**: Simple PDF conversion API
- **LibreOffice**: Self-hosted solution

### 10. Production Considerations

For production use:

1. **Error Handling**: Implement proper retry logic
2. **Rate Limiting**: Respect CloudConvert API limits
3. **Monitoring**: Add logging and monitoring
4. **Security**: Secure your API keys
5. **Backup**: Implement fallback conversion methods
6. **File Size Limits**: Consider R2 and CloudConvert file size limits 