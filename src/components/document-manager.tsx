'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Eye, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentManagerProps {
  documentKey?: string;
  documentName?: string;
  onDocumentGenerated?: (key: string, name: string) => void;
}

export function DocumentManager({ 
  documentKey, 
  documentName = 'Document', 
  onDocumentGenerated 
}: DocumentManagerProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generate a new document and upload to R2
  const handleGenerateDocument = async () => {
    try {
      setIsGenerating(true);
      
      // Sample data for the document
      const documentData = {
        title: 'Sample Document',
        content: 'This is a sample document generated from a template.',
        date: new Date().toISOString(),
      };
      
      // Call the API to generate and upload the document
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Document generated successfully');
        if (onDocumentGenerated) {
          onDocumentGenerated(result.key, result.fileName);
        }
      } else {
        toast.error('Failed to generate document');
      }
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('An error occurred while generating the document');
    } finally {
      setIsGenerating(false);
    }
  };

  // Get a presigned URL for preview
  const handlePreview = async () => {
    if (!documentKey) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/documents?key=${documentKey}`);
      const result = await response.json();
      
      if (result.success) {
        setPreviewUrl(result.url);
        // Open the document in a new tab
        window.open(result.url, '_blank');
      } else {
        toast.error('Failed to get document URL');
      }
    } catch (error) {
      console.error('Error getting document URL:', error);
      toast.error('An error occurred while getting the document URL');
    } finally {
      setIsLoading(false);
    }
  };

  // Download the document
  const handleDownload = async () => {
    if (!documentKey) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/documents?key=${documentKey}`);
      const result = await response.json();
      
      if (result.success) {
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = result.url;
        link.download = documentName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error('Failed to get document URL');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('An error occurred while downloading the document');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Manager
        </CardTitle>
        <CardDescription>
          Generate, preview, and download documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Document Status:</p>
            <p className="text-sm text-muted-foreground">
              {documentKey ? 'Document is available' : 'No document generated yet'}
            </p>
          </div>
          
          {documentKey && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Document Key:</p>
              <p className="text-sm text-muted-foreground break-all">{documentKey}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={handleGenerateDocument} 
          disabled={isGenerating}
          variant="outline"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Document'}
        </Button>
        
        <div className="flex gap-2">
          <Button 
            onClick={handlePreview} 
            disabled={!documentKey || isLoading}
            variant="outline"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          
          <Button 
            onClick={handleDownload} 
            disabled={!documentKey || isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 