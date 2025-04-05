'use client';

import { useState } from 'react';
import { DocumentManager } from '@/components/document-manager';
import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';

export default function DocumentsPage() {
  const [documentKey, setDocumentKey] = useState<string | undefined>();
  const [documentName, setDocumentName] = useState<string>('Generated Document');

  const handleDocumentGenerated = (key: string, name: string) => {
    setDocumentKey(key);
    setDocumentName(name);
  };

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <Heading
          title="Document Management"
          description="Generate, preview, and download Word documents"
        />
        
        <div className="grid gap-4 md:grid-cols-2">
          <DocumentManager 
            documentKey={documentKey}
            documentName={documentName}
            onDocumentGenerated={handleDocumentGenerated}
          />
          
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-medium">Document Preview</h3>
            <p className="text-sm text-muted-foreground">
              {documentKey 
                ? 'Click the Preview button to view the document in a new tab.' 
                : 'Generate a document to preview it here.'}
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 