import { NavItem } from 'types';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  size: string;
  image: string;
  release_time: string;
  category: string;
  state: string;
  owner: string;
  agent: string;
};

export type Property = {
  property_id: number;
  name: string;
  describe: string;
  price: string;
  size: string;
  image: string;
  state: string;
  detail: {
    volumn: string;
    folio: string;
    address: string;
    office_id: string;
    initial_rent: string;
    rent_review_percentage: string;
  }
}

export type Lease = {
  lease_id: number;
  property_id: number;
  tenant_email: string;
  start_date: string;
  end_date: string;
  rent_amount: string;
  deposit_amount: string;
  stage: string;
  agreement_to_lease: string;
  created_at: string;
};

export type Agent = {
  agent_id: number;
  id: number; // For compatibility with CellAction component
  name: string;
  phone: string;
  email: string;
  agency_name: string;
  created_at: string;
};

export type Landowner = {
  owner_id: number;
  id: number; // for compatibility with CellAction
  name: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  created_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItemsAdmin: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Property',
    url: '/dashboard/property',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Lease',
    url: '/dashboard/lease',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Outgoings',
    url: '/dashboard/outgoings',
    icon: 'billing',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Agent',
    url: '/dashboard/agent',
    icon: 'user',
    shortcut: ['a', 'a'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Landowner',
    url: '/dashboard/landowner',
    icon: 'user',
    shortcut: ['l', 'l'],
    isActive: false,
    items: [] // No child items
  },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'userPen',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
  // {
  //   title: 'Kanban',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // }
];

export const navItemsTenant: NavItem[] = [
  {
    title: 'Lease',
    url: '/dashboard/lease',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'userPen',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
];
