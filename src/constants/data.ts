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

export type Lease = {
  lease_id: number;
  // property_name: string;
  property_id: number;
  tenant_email: string;
  start_date: string;
  end_date: string;
  rent_amount: string;
  deposit_amount: string;
  stage: string;
  agreement_to_lease: string;
};

const JadsEmailList = ["zhangsu1305@gmail.com", "s1@gmail.com"];

export function isCustomer(email: string): boolean {
  return !JadsEmailList.includes(email);
}

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
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
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

export const navItems_customer: NavItem[] = [
  {
    title: 'Lease',
    url: '/dashboard/lease',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

export type WorkflowState = "s1" | "s2" | "s3" | "s4" | "s5" | "finished"
export type ProcessState = WorkflowState | "approved" | "refused"

// Add a mapping for stage names
export const STAGE_NAMES: Record<WorkflowState, string> = {
  s1: "Document Verification",
  s2: "Background Check",
  s3: "Contract Review",
  s4: "Payment Processing",
  s5: "Final Approval",
  finished: "Workflow Complete",
}

// New interface for refusal records
export interface RefusalRecord {
  reason: string
  timestamp: string
}

export interface Process {
  id: string
  name: string
  description: string
  state: ProcessState
  createdAt: string
  assignedTo: string
  refusalRecords?: RefusalRecord[] // Changed from refusalReason to refusalRecords
  originalStage?: WorkflowState
  stageId: WorkflowState
}

export interface Customer {
  property_id: number
  tenant_email: string
  start_date: Date
  end_date: Date
  rent_amount: number
  deposit_amount: number
  stage: string
  agreement_to_lease: string
}

export interface StageConfig {
  id: WorkflowState
  name: string
  processes: ProcessConfig[]
  color: string
}

export interface ProcessConfig {
  id: string
  name: string
  description: string
  assignedTo: string
}

// Configuration for stages and processes
export const WORKFLOW_CONFIG: StageConfig[] = [
  {
    id: "s1",
    name: STAGE_NAMES.s1,
    color: "primary",
    processes: [
      {
        id: "p1",
        name: "Document Verification",
        description: "Verify tenant identification and supporting documents",
        assignedTo: "John Doe",
      },
    ],
  },
  {
    id: "s2",
    name: STAGE_NAMES.s2,
    color: "secondary",
    processes: [
      {
        id: "p2",
        name: "Credit Check",
        description: "Perform credit check and verify financial history",
        assignedTo: "Jane Smith",
      },
    ],
  },
  {
    id: "s3",
    name: STAGE_NAMES.s3,
    color: "info",
    processes: [
      {
        id: "p3",
        name: "Lease Agreement Review",
        description: "Review lease terms and conditions",
        assignedTo: "Robert Johnson",
      },
    ],
  },
  {
    id: "s4",
    name: STAGE_NAMES.s4,
    color: "warning",
    processes: [
      {
        id: "p4",
        name: "Deposit Payment",
        description: "Process security deposit payment",
        assignedTo: "Emily Chen",
      },
      {
        id: "p5",
        name: "First Month Rent",
        description: "Process first month's rent payment",
        assignedTo: "David Wilson",
      },
      {
        id: "p6",
        name: "Payment Verification",
        description: "Verify all payments have been received and processed",
        assignedTo: "Lisa Rodriguez",
      },
    ],
  },
  {
    id: "s5",
    name: STAGE_NAMES.s5,
    color: "success",
    processes: [
      {
        id: "p7",
        name: "Final Document Review",
        description: "Final review of all documentation",
        assignedTo: "Sarah Williams",
      },
      {
        id: "p8",
        name: "Key Handover Scheduling",
        description: "Schedule key handover and move-in date",
        assignedTo: "Michael Brown",
      },
    ],
  },
]

