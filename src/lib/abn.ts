interface BusinessEntity {
  recordLastUpdatedDate: string;
  ABN: {
    identifierValue: string;
    isCurrentIndicator: string;
    replacedFrom: string;
  };
  entityStatus: {
    entityStatusCode: string;
    effectiveFrom: string;
    effectiveTo: string;
  };
  ASICNumber: string;
  entityType: {
    entityTypeCode: string;
    entityDescription: string;
  };
  goodsAndServicesTax: {
    effectiveFrom: string;
    effectiveTo: string;
  };
  mainName: {
    organisationName: string;
    effectiveFrom: string;
  };
  mainBusinessPhysicalAddress: {
    stateCode: string;
    postcode: string;
    effectiveFrom: string;
    effectiveTo: string;
  };
}

interface ABRResponse {
  ABRPayloadSearchResults: {
    request: any;
    response: {
      usageStatement: string;
      dateRegisterLastUpdated: string;
      dateTimeRetrieved: string;
      businessEntity?: BusinessEntity;
    };
  };
}

export async function searchCompanyDataByABN(
  searchString: string,
  includeHistoricalDetails: string,
  authenticationGuid: string
): Promise<ABRResponse> {
  try {
    // Call our server-side API route instead of making direct SOAP request
    const response = await fetch('/api/abr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchString,
        includeHistoricalDetails,
        authenticationGuid
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error making ABN request:', error);
    throw error;
  }
}
