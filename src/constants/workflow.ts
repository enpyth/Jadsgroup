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

export type WorkflowState = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9" | "finished"
export type ProcessState = WorkflowState | "approved" | "refused"

// Add a mapping for stage names
export const STAGE_NAMES: Record<WorkflowState, string> = {
    s1: "Jadsgroup Initial Review",
    s2: "Lease Schedule Finalization",
    s3: "Applicant Review",
    s4: "Property Owner Review",
    s5: "Generate Agreement to Lease",
    s6: "Legal Review",
    s7: "E-sign & Payment",
    s8: "Lease Contract Drafting",
    s9: "Final Documentation Review",
    finished: "Workflow Complete",
};


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

export interface StageConfig {
    id: WorkflowState
    name: string
    processes: ProcessConfig[]
}

export interface ProcessConfig {
    id: string
    name: string
    description: string
    assignedTo: string
}
export const WORKFLOW_CONFIG: StageConfig[] = [
    // Step 1: JADS 审核申请并生成 Lease Schedule
    {
        id: "s1",
        name: STAGE_NAMES.s1,
        processes: [
            {
                id: "p1",
                name: "Init Lease Schedule",
                description: "Jadsgroup reviews the applicant and generates a Lease Schedule linked to the selected property.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },

    // Step 2: Lease Schedule Finalization（JADS 最终调整 Lease Schedule）
    {
        id: "s2",
        name: STAGE_NAMES.s2,
        processes: [
            {
                id: "p3",
                name: "Lease Schedule Finalization",
                description: "JADS amends Lease Schedule if necessary before applicant review.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },

    // Step 3: 申请人审核 Lease Schedule
    {
        id: "s3",
        name: STAGE_NAMES.s3,
        processes: [
            {
                id: "p2",
                name: "Applicant Review",
                description: "Applicant reviews the Lease Schedule and accepts via a challenge-response test.",
                assignedTo: "Applicant",
            },
        ],
    },

    // Step 4: 物业所有者审核 Lease Schedule
    {
        id: "s4",
        name: STAGE_NAMES.s4,
        processes: [
            {
                id: "p4",
                name: "Property Owner Review",
                description: "Property owner accepts or rejects the Lease Schedule. If rejected, JADS can create a new Lease Schedule.",
                assignedTo: "Property Owner",
            },
        ],
    },

    // Step 5: 生成 "Agreement to Lease"
    {
        id: "s5",
        name: STAGE_NAMES.s5,
        processes: [
            {
                id: "p5",
                name: "Generate Agreement to Lease",
                description: "System auto-generates the Agreement to Lease based on the Lease Schedule details.",
                assignedTo: "System",
            },
        ],
    },

    // Step 6: Agreement to Lease 法律审核
    {
        id: "s6",
        name: STAGE_NAMES.s6,
        processes: [
            {
                id: "p6",
                name: "Legal Review",
                description: "JADS Lawyer reviews the Agreement to Lease and provides feedback.",
                assignedTo: "JADS Lawyer",
            },
            {
                id: "p7",
                name: "Final Legal Amendments",
                description: "JADS makes necessary amendments based on legal review.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },

    // Step 7: 各方电子签名 & 付款
    {
        id: "s7",
        name: STAGE_NAMES.s7,
        processes: [
            {
                id: "p8",
                name: "E-signature by Applicant",
                description: "Applicant e-signs the Agreement to Lease and submits security deposit payment.",
                assignedTo: "Applicant",
            },
            {
                id: "p9",
                name: "E-signature by Property Owner",
                description: "Property owner e-signs the Agreement to Lease and submits the first month's rent payment.",
                assignedTo: "Property Owner",
            },
            {
                id: "p10",
                name: "E-signature by JADS",
                description: "JADS verifies all payments and finalizes the contract.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },

    // Step 8: 生成 Lease Contract
    {
        id: "s8",
        name: STAGE_NAMES.s8,
        processes: [
            {
                id: "p12",
                name: "Upload Lease Contract",
                description: "System emails the final Agreement to Lease to JADS Lawyer, who drafts the Lease Contract and uploads the Lease Contract & Invoice to the shared portal.",
                assignedTo: "JADS Lawyer",
            },
        ],
    },

    // Step 9: Lease Contract 最终审核
    {
        id: "s9",
        name: STAGE_NAMES.s9,
        processes: [
            {
                id: "p13",
                name: "Final Documentation Review",
                description: "Final review of all documentation before lease activation and system updates the applicant’s role to Tenant.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },
];
