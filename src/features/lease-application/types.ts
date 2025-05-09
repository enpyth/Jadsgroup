export interface ApplicationData {
  personal_info: {
    first_name: string;
    surname: string;
    mobile: string;
    business_phone: string;
    date_of_birth: string;
    country: string;
    occupation: string;
  };
  identification: {
    type: string;
    number: string;
    id_document: string;
  };
  addresses: {
    residential: {
      address: string;
      suburb: string;
      state: string;
      postcode: string;
    };
    postal: {
      address: string;
      suburb: string;
      state: string;
      postcode: string;
    };
  };
  business_info: {
    description: string;
    abn_number: string;
    company_name: string;
    director: {
      first_name: string;
      surname: string;
      address: string;
      suburb: string;
      state: string;
      postcode: string;
    };
  };
  financial_info: {
    assets: Array<{ description: string; amount: string }>;
    liabilities: Array<{ description: string; amount: string }>;
    operates_business: boolean;
    is_employed: boolean;
  };
  rental_history: {
    has_rented: boolean;
    type: string;
    previous_address: {
      address: string;
      suburb: string;
      state: string;
      postcode: string;
    };
  };
  trade_reference: {
    company_name: string;
    address: string;
    contact: {
      first_name: string;
      surname: string;
      position: string;
      phone: string;
      email: string;
    };
  };
  privacy_acknowledgment: {
    agreed: boolean;
    signature: string;
  };
} 