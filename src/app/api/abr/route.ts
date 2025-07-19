import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { searchString, includeHistoricalDetails, authenticationGuid } = body;

    // Validate required parameters
    if (!searchString) {
      console.log('Missing searchString parameter');
      return NextResponse.json(
        { error: 'Missing required parameter: searchString' },
        { status: 400 }
      );
    }

    if (!authenticationGuid) {
      console.log('Missing authenticationGuid parameter');
      return NextResponse.json(
        { error: 'Missing required parameter: authenticationGuid. Please set NEXT_PUBLIC_ABR_AUTH_GUID environment variable.' },
        { status: 400 }
      );
    }

    // Construct SOAP envelope
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <SearchByABNv202001 xmlns="http://abr.business.gov.au/ABRXMLSearch/">
      <searchString>${searchString}</searchString>
      <includeHistoricalDetails>${includeHistoricalDetails || 'N'}</includeHistoricalDetails>
      <authenticationGuid>${authenticationGuid}</authenticationGuid>
    </SearchByABNv202001>
  </soap12:Body>
</soap12:Envelope>`;

    console.log('Making SOAP request to ABR API...');
    
    // Make the SOAP request server-side (no CORS issues)
    const response = await fetch('https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        'SOAPAction': 'http://abr.business.gov.au/ABRXMLSearch/SearchByABNv202001'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      console.error(`ABR API returned status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    console.log('Received XML response from ABR API');
    
    // Parse XML response using regex (server-side compatible)
    const usageStatement = xmlText.match(/<usageStatement>(.*?)<\/usageStatement>/)?.[1] || '';
    const dateRegisterLastUpdated = xmlText.match(/<dateRegisterLastUpdated>(.*?)<\/dateRegisterLastUpdated>/)?.[1] || '';
    const dateTimeRetrieved = xmlText.match(/<dateTimeRetrieved>(.*?)<\/dateTimeRetrieved>/)?.[1] || '';
    
    // Parse business entity information
    const businessEntityMatch = xmlText.match(/<businessEntity202001>(.*?)<\/businessEntity202001>/s);
    let businessEntity = null;
    
    if (businessEntityMatch) {
      const entityXml = businessEntityMatch[1];
      businessEntity = {
        recordLastUpdatedDate: entityXml.match(/<recordLastUpdatedDate>(.*?)<\/recordLastUpdatedDate>/)?.[1] || '',
        ABN: {
          identifierValue: entityXml.match(/<identifierValue>(.*?)<\/identifierValue>/)?.[1] || '',
          isCurrentIndicator: entityXml.match(/<isCurrentIndicator>(.*?)<\/isCurrentIndicator>/)?.[1] || '',
          replacedFrom: entityXml.match(/<replacedFrom>(.*?)<\/replacedFrom>/)?.[1] || '',
        },
        entityStatus: {
          entityStatusCode: entityXml.match(/<entityStatusCode>(.*?)<\/entityStatusCode>/)?.[1] || '',
          effectiveFrom: entityXml.match(/<effectiveFrom>(.*?)<\/effectiveFrom>/)?.[1] || '',
          effectiveTo: entityXml.match(/<effectiveTo>(.*?)<\/effectiveTo>/)?.[1] || '',
        },
        ASICNumber: entityXml.match(/<ASICNumber>(.*?)<\/ASICNumber>/)?.[1] || '',
        entityType: {
          entityTypeCode: entityXml.match(/<entityTypeCode>(.*?)<\/entityTypeCode>/)?.[1] || '',
          entityDescription: entityXml.match(/<entityDescription>(.*?)<\/entityDescription>/)?.[1] || '',
        },
        goodsAndServicesTax: {
          effectiveFrom: entityXml.match(/<goodsAndServicesTax>.*?<effectiveFrom>(.*?)<\/effectiveFrom>/s)?.[1] || '',
          effectiveTo: entityXml.match(/<goodsAndServicesTax>.*?<effectiveTo>(.*?)<\/effectiveTo>/s)?.[1] || '',
        },
        mainName: {
          organisationName: entityXml.match(/<organisationName>(.*?)<\/organisationName>/)?.[1] || '',
          effectiveFrom: entityXml.match(/<mainName>.*?<effectiveFrom>(.*?)<\/effectiveFrom>/s)?.[1] || '',
        },
        mainBusinessPhysicalAddress: {
          stateCode: entityXml.match(/<stateCode>(.*?)<\/stateCode>/)?.[1] || '',
          postcode: entityXml.match(/<postcode>(.*?)<\/postcode>/)?.[1] || '',
          effectiveFrom: entityXml.match(/<mainBusinessPhysicalAddress>.*?<effectiveFrom>(.*?)<\/effectiveFrom>/s)?.[1] || '',
          effectiveTo: entityXml.match(/<mainBusinessPhysicalAddress>.*?<effectiveTo>(.*?)<\/effectiveTo>/s)?.[1] || '',
        },
      };
    }
    
    const result = {
      ABRPayloadSearchResults: {
        request: {},
        response: {
          usageStatement,
          dateRegisterLastUpdated,
          dateTimeRetrieved,
          businessEntity: businessEntity
        }
      }
    };

    console.log('Successfully processed ABR response');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error making SOAP request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ABN data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 