import { userRoles } from "./config"

// Workflow state constants
export const WORKFLOW_IDS = {
    START: "Start",
    LEASE_SCHEDULE: "Lease Schedule",
    LANDLORD_REVIEW: "Landlord Review",
    LEGAL_REVIEW: "Legal Review",
    DRAFT_CONTRACT: "Draft Contract",
    FINAL_REVIEW: "Final Review",
    COMPLETED: "Completed",
} as const

// Process ID constants
export const PROCESS_IDS = {
    REVIEW_APPLICATION: "Review Application",
    LEASE_SCHEDULE: "Lease Schedule",
    LANDLORD_REVIEW: "Landlord Review",
    JADSGROUP_LEGAL_REVIEW: "Jadsgroup Legal Review",
    APPLICANT_LEGAL_REVIEW: "Applicant Legal Review",
    DRAFT_CONTRACT: "Draft Contract",
    FINAL_REVIEW: "Final Review",
} as const

export const STATES = {
    APPROVED: "approved",
    REFUSED: "refused",
    PENDING: "pending",
} as const

export type WorkflowId = typeof WORKFLOW_IDS[keyof typeof WORKFLOW_IDS]
export type ProcessId = typeof PROCESS_IDS[keyof typeof PROCESS_IDS]
export type State = typeof STATES[keyof typeof STATES]

// New interface for refusal records
export interface RefusalRecord {
    reason: string
    timestamp: string
}

export interface Process {
    id: ProcessId
    description: string
    state: State
    assignedTo: string
    refusalRecords?: RefusalRecord[]
    createdAt: string
}

export interface WorkflowState {
    stageId: WorkflowId
    processes: Process[]
}

export const DEFAULT_WORKFLOW_CONFIG: WorkflowState[] = [
    {
        stageId: WORKFLOW_IDS.START,
        processes: [
            {
                id: PROCESS_IDS.REVIEW_APPLICATION,
                description: "Jadsgroup reviews the applicant and generates a Lease Schedule linked to the selected property.",
                assignedTo: userRoles.ADMIN,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
            },
        ],
    },
    {
        stageId: WORKFLOW_IDS.LEASE_SCHEDULE,
        processes: [
            {
                id: PROCESS_IDS.LEASE_SCHEDULE,
                description: "Applicant reviews the Lease Schedule and accepts via a challenge-response test.",
                assignedTo: userRoles.TENANT,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
            },
        ],
    },
    {
        stageId: WORKFLOW_IDS.LANDLORD_REVIEW,
        processes: [
            {
                id: PROCESS_IDS.LANDLORD_REVIEW,
                description: "Property owner accepts or rejects the Lease Schedule. If rejected, JADS can create a new Lease Schedule.",
                assignedTo: userRoles.LANDLORD,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
                },
        ],
    },
    {
        stageId: WORKFLOW_IDS.DRAFT_CONTRACT,
        processes: [
            {
                id: PROCESS_IDS.DRAFT_CONTRACT,
                description: "System emails the files to JADS Lawyer, who drafts the Final Contract.",
                assignedTo: userRoles.ADMIN,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
            },
        ],
    },
    {
        stageId: WORKFLOW_IDS.LEGAL_REVIEW,
        processes: [
            {
                id: PROCESS_IDS.JADSGROUP_LEGAL_REVIEW,
                description: "JADS Lawyer e-signs the Disclosure Statement.",
                assignedTo: userRoles.LAWYER,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
            },
            {
                id: PROCESS_IDS.APPLICANT_LEGAL_REVIEW,
                description: "Applicant e-signs the Disclosure Statement.",
                assignedTo: userRoles.TENANT,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
            },
        ],
    },
    {
        stageId: WORKFLOW_IDS.FINAL_REVIEW,
        processes: [
            {
                id: PROCESS_IDS.FINAL_REVIEW,
                description: "Final review of all documentation before lease activation and system updates the applicant's role to Tenant.",
                assignedTo: userRoles.ADMIN,
                state: STATES.PENDING,
                createdAt: new Date().toISOString(),
            },
        ],
    },
];

// init workflow state when lease is created
export function getInitialState(): WorkflowState[] {
    return DEFAULT_WORKFLOW_CONFIG.map((config) => ({
        stageId: config.stageId,
        processes: config.processes.map((process) => ({
            id: process.id,
            state: process.state,
            description: process.description,
            assignedTo: process.assignedTo,
            createdAt: process.createdAt,
        })),
    }))
}

export function getCurrentStage(workflowState: WorkflowState[]): WorkflowId {
    if (workflowState.every(state => state.processes.every(process => process.state === STATES.APPROVED))) {
        return WORKFLOW_IDS.COMPLETED
    }
    return workflowState.find(state => state.processes.some(process => process.state === STATES.PENDING || process.state === STATES.REFUSED))?.stageId || WORKFLOW_IDS.START
}

export function getProcessPercentage(workflowState: WorkflowState[]): number {
    const totalProcesses = workflowState.flatMap(state => state.processes).length
    const completedProcesses = workflowState.flatMap(state => state.processes).filter(process => process.state === STATES.APPROVED).length
    return Math.round((completedProcesses / totalProcesses) * 100)
}

export function isWorkflowComplete(workflowState: WorkflowState[]): boolean {
    return workflowState.every(state => state.processes.every(process => process.state === STATES.APPROVED))
}

// Action types
export type ProcessAction = "approve" | "refuse" | "rollback"

export interface ProcessActionResponse {
    success: boolean
    timestamp: string
}

// Action functions
export async function updateProcessesRecords(
    leaseId: number,
    workflowState: WorkflowState[]
): Promise<ProcessActionResponse> {
    const response = await fetch("/api/processes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            leaseId,
            workflowState,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to approve process")
    }
    return response.json()
}
