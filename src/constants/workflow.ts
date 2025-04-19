// TODO remove
export interface Customer {
    property_id: number
    tenant_email: string
    start_date: Date
    end_date: Date
    rent_amount: number
    deposit_amount: number
    stage: WorkflowState
    agreement_to_lease: string
}

export type WorkflowState =
    | "Review Application"
    | "Confirm Lease Schedule"
    | "Land Lord Review"
    | "Legal Review"
    | "Draft Contract"
    | "Final Review"
    | "finished"

export type ProcessState = WorkflowState | "approved" | "refused"

export type ProcessId =
    | "Review Application"
    | "Confirm Lease Schedule"
    | "Land Lord Review"
    | "Jadsgroup Legal Review"
    | "Applicant Legal Review"
    | "Draft Contract"
    | "Final Review"

// New interface for refusal records
export interface RefusalRecord {
    reason: string
    timestamp: string
}

export interface Process {
    id: ProcessId
    name: string
    description: string
    state: ProcessState
    createdAt: string
    assignedTo: string
    refusalRecords?: RefusalRecord[]
    originalStage?: WorkflowState
    stageId: WorkflowState
}

export interface StageConfig {
    id: WorkflowState
    processes: ProcessConfig[]
}

export interface ProcessConfig {
    id: ProcessId
    description: string
    assignedTo: string
}

// Utility functions

export const getStageConfig = (stageId: WorkflowState): StageConfig | undefined => {
    return WORKFLOW_CONFIG.find(stage => stage.id === stageId)
}

export const getProcessConfig = (stageId: WorkflowState, processId: ProcessId): ProcessConfig | undefined => {
    const stage = getStageConfig(stageId)
    return stage?.processes.find(process => process.id === processId)
}

export const WORKFLOW_CONFIG: StageConfig[] = [
    {
        id: "Review Application",
        processes: [
            {
                id: "Review Application",
                description: "Jadsgroup reviews the applicant and generates a Lease Schedule linked to the selected property.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },
    {
        id: "Confirm Lease Schedule",
        processes: [
            {
                id: "Confirm Lease Schedule",
                description: "Applicant reviews the Lease Schedule and accepts via a challenge-response test.",
                assignedTo: "Applicant",
            },
        ],
    },
    {
        id: "Land Lord Review",
        processes: [
            {
                id: "Land Lord Review",
                description: "Property owner accepts or rejects the Lease Schedule. If rejected, JADS can create a new Lease Schedule.",
                assignedTo: "Property Owner",
            },
        ],
    },
    {
        id: "Legal Review",
        processes: [
            {
                id: "Jadsgroup Legal Review",
                description: "JADS Lawyer e-signs the Disclosure Statement.",
                assignedTo: "JADS Lawyer",
            },
            {
                id: "Applicant Legal Review",
                description: "Applicant e-signs the Disclosure Statement.",
                assignedTo: "Applicant",
            },
        ],
    },
    {
        id: "Draft Contract",
        processes: [
            {
                id: "Draft Contract",
                description: "System emails the files to JADS Lawyer, who drafts the Final Contract.",
                assignedTo: "JADS Lawyer",
            },
        ],
    },
    {
        id: "Final Review",
        processes: [
            {
                id: "Final Review",
                description: "Final review of all documentation before lease activation and system updates the applicant's role to Tenant.",
                assignedTo: "Jadsgroup Admin",
            },
        ],
    },
];
