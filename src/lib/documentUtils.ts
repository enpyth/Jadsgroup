/**
 * Utility functions for document operations
 */

import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

interface DocumentData {
  [key: string]: any;
}

export async function generateDocument(templatePath: string, data: DocumentData): Promise<Buffer> {
  try {
    // 从 R2 获取模板文件
    const templateUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/template/${templatePath}`;
    const response = await fetch(templateUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch template from ${templateUrl}: ${response.status} ${response.statusText}`);
    }
    
    // 获取模板内容
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 生成文档
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.render(data);
    return doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
}

/**
 * Downloads a document from the server using the provided file key
 * @param fileKey - The file key to download
 * @returns Promise<void>
 */
export const downloadDocument = async (fileKey: string): Promise<void> => {
    try {
      const downloadUrl = `/api/download?key=${encodeURIComponent(fileKey)}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading document:", error);
      throw error;
    }
  }; 

// Convert word in R2 to pdf, Server-side only conversion from R2 to R2
export async function generatePdf(fileKey: string, outputKey: string): Promise<void> {
  try {
    console.log(`Starting PDF generation for file: ${fileKey} -> ${outputKey}`);
    
    // Call server-side API that handles R2 to R2 conversion directly
    const convertResponse = await fetch('/api/convert-r2-to-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputKey: fileKey,
        outputKey: outputKey
      }),
    });

    if (!convertResponse.ok) {
      const errorText = await convertResponse.text();
      throw new Error(`Failed to convert document to PDF: ${convertResponse.status} ${convertResponse.statusText} - ${errorText}`);
    }

    const result = await convertResponse.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to convert document to PDF');
    }

    console.log(`PDF generated successfully: ${outputKey}`);
    console.log(`Conversion result:`, result);
    
  } catch (error) {
    console.error("Error converting word to pdf:", error);
    throw error;
  }
}
