import { searchData } from '@/lib/api';

export default async function TmpPage() {
  const result = await searchData(
    '73684785984',
    'N',
    '61453b22-676c-48e3-94b8-3a5c44bd2d28'
  );
  
  console.log('Search result:', JSON.stringify(result, null, 2));
  console.log('organisationName: ', result.ABRPayloadSearchResults.response.businessEntity?.mainName.organisationName);
  return null;
} 