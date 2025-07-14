import { Icons } from '@/components/icons';
import { leases, properties, owners } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

// Base types from database schema
type LeaseData = InferSelectModel<typeof leases>;
type BasePropertyData = InferSelectModel<typeof properties>;
type BaseOwnerData = InferSelectModel<typeof owners>;

// Common address structure
interface Address {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
}

// JSONB field structures
interface CompanyData {
  name: string;
  acn: string;
  [key: string]: any;
}

interface PropertyDetail {
  volumn?: string;
  folio?: string;
  address?: string;
  office_id?: string;
  initial_rent?: string;
  rent_review_percentage?: string;
}

// Enhanced types with properly typed JSONB fields
type PropertyData = BasePropertyData & {
  detail: PropertyDetail;
};

type OwnerData = BaseOwnerData & {
  company: CompanyData;
};

interface AgentData {
  agent_id: string;
  name: string;
  phone: string;
  email: string;
  agency_name: string;
}

// Combined lease and property data with owner
export interface LeasePropertyData extends LeaseData {
  property: PropertyData;
  owner: OwnerData;
  agent: AgentData;
}

// Navigation types
export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;
export type SidebarNavItem = NavItemWithChildren;

// Application data structure
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
    residential: Address;
    postal: Address;
  };
  business_info: {
    description: string;
    abn_number: string;
    acn_number: string;
    company_name: string;
    director: Address & {
      first_name: string;
      surname: string;
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
    previous_address: Address;
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