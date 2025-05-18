import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

interface DocumentData {
  [key: string]: any;
}

export async function generateDocument(templatePath: string, data: DocumentData): Promise<Buffer> {
  try {
    // Get the absolute path to the template file
    const absolutePath = path.join(process.cwd(), templatePath);
    
    // Read the template file
    const content = fs.readFileSync(absolutePath, 'binary');
    
    // Create a new instance of PizZip
    const zip = new PizZip(content);

    // Create a new instance of Docxtemplater with image module
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    
    // Render the document
    doc.render(data);
    
    // Get the generated document as a buffer
    const buffer = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
    
    return buffer;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
}

// Example usage:
// const data = {
//   name: 'John Doe',
//   date: '2024-03-20',
//   // ... other template variables
// };
// const buffer = await generateDocument('template/input.doc', data); 