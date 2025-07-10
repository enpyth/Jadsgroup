# Document Generation System

## Overview

The document generation system automatically creates legal documents when workflow processes are approved. Each process ID is mapped to a specific document template and data structure.

## Architecture

### 1. Document Configuration (`src/lib/documentConfig.ts`)

The system uses a configuration-based approach where each process ID is mapped to:
- **Template Path**: The .docx template file to use
- **File Name**: How the generated document should be named
- **Data Mapping**: Function to transform lease data into template variables

### 2. Supported Documents

Currently, the system supports three document types:

1. **Lease Schedule** (`PROCESS_IDS.REVIEW_APPLICATION`)
   - Template: `template/lease-schedule.docx`
   - Generated when: Application review is approved
   - Contains: Tenant info, property details, rent amounts

2. **Agreement to Lease** (`PROCESS_IDS.LANDLORD_REVIEW`)
   - Template: `template/agreement-to-lease.docx`
   - Generated when: Landlord review is approved
   - Contains: Full lease agreement terms

3. **Disclosure Statement** (`PROCESS_IDS.DRAFT_CONTRACT`)
   - Template: `template/disclosure-statement.docx`
   - Generated when: Draft contract process is approved
   - Contains: Legal disclosures and statements

### 3. Template Variables

Each document template can use the following variables:

#### Common Variables
- `title`: Document title
- `tenant_name`: Full tenant name
- `tenant_email`: Tenant email address
- `tenant_phone`: Tenant phone number
- `property_address`: Property address
- `rent_amount`: Monthly rent amount (numeric)
- `rent_amount_text`: Monthly rent amount in words
- `deposit_amount`: Security deposit amount (numeric)
- `deposit_amount_text`: Security deposit amount in words
- `lease_start_date`: Lease start date (formatted)
- `lease_end_date`: Lease end date (formatted)
- `lease_terms`: Lease duration in years
- `generated_date`: Document generation date
- `lease_id`: Unique lease identifier

#### Additional Variables (Agreement to Lease & Disclosure Statement)
- `landlord_name`: Property owner name
- `landlord_email`: Property owner email

### 4. How It Works

1. **Process Approval**: When a user approves a workflow process
2. **Document Check**: System checks if the process requires document generation
3. **Data Preparation**: Lease data is transformed into template variables
4. **Document Generation**: Template is filled with data using docxtemplater
5. **File Upload**: Generated document is uploaded to Cloudflare R2
6. **Process Update**: Workflow process is marked as approved

### 5. API Endpoint

**POST** `/api/document`

**Request Body:**
```json
{
  "processId": "Review Application",
  "leaseData": {
    "lease_id": 123,
    "tenant_email": "tenant@example.com",
    "tenant_first_name": "John",
    "tenant_last_name": "Doe",
    "rent_amount": 2000,
    "deposit_amount": 4000,
    "start_date": "2024-01-01",
    "end_date": "2025-01-01",
    "lease_terms": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://r2.example.com/tenant@example.com/LeaseSchedule_123.docx",
  "fileName": "LeaseSchedule_123.docx",
  "processId": "Review Application"
}
```

## Adding New Documents

To add a new document type:

1. **Create Template**: Add a new .docx file to the `template/` directory
2. **Update Configuration**: Add a new entry to `DOCUMENT_CONFIGS` in `src/lib/documentConfig.ts`
3. **Define Variables**: Specify the data mapping function for the new document
4. **Test**: Verify the document generates correctly

### Example: Adding a New Document

```typescript
// In src/lib/documentConfig.ts
[PROCESS_IDS.NEW_PROCESS]: {
  templatePath: 'template/new-document.docx',
  fileName: (leaseData: any) => `NewDocument_${leaseData.lease_id}.docx`,
  dataMapping: (leaseData: any) => ({
    title: 'New Document',
    tenant_name: `${leaseData.tenant_first_name} ${leaseData.tenant_last_name}`,
    // ... other variables
  }),
},
```

## Template Development

### Creating Templates

1. Use Microsoft Word or LibreOffice to create .docx files
2. Insert template variables using the format: `{variable_name}`
3. Save as .docx format
4. Place in the `template/` directory

### Template Variables Format

- Simple variables: `{tenant_name}`
- Nested objects: `{tenant.address}`
- Conditional text: `{#condition}text{/condition}`
- Loops: `{#items}item: {name}{/items}`

### Best Practices

1. **Use Descriptive Variable Names**: Make variables self-explanatory
2. **Include Text Versions**: Always provide both numeric and text versions of amounts
3. **Format Dates Consistently**: Use consistent date formatting across documents
4. **Handle Missing Data**: Provide fallbacks for optional fields
5. **Test Templates**: Verify all variables are properly replaced

## Error Handling

The system includes comprehensive error handling:

- **Missing Configuration**: Returns 400 error if process has no document config
- **Template Errors**: Logs and returns 500 error for template generation failures
- **Upload Errors**: Handles S3 upload failures gracefully
- **Data Validation**: Validates required fields before processing

## Security Considerations

- Templates are stored locally and not exposed via API
- Generated documents are stored in tenant-specific folders
- File access is controlled by Cloudflare R2 permissions
- No sensitive data is logged in error messages

## Performance Optimization

- Templates are read once and cached
- Document generation is asynchronous
- Large files are streamed efficiently
- Error states don't block workflow progression 