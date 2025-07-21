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

// Example usage:
// const data = {
//   name: 'John Doe',
//   date: '2024-03-20',
//   // ... other template variables
// };
// const buffer = await generateDocument('template/input.doc', data); 