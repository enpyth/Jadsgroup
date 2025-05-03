"use client"

import { leases } from "@/db/schema"
import { type InferSelectModel } from "drizzle-orm"
import { STATES, WorkflowState, getCurrentStage, getProcessPercentage, isWorkflowComplete, updateProcessesRecords } from "@/constants/workflow"
import { Alert, Box, Container, Snackbar } from "@mui/material"
import Grid from "@mui/material/Grid2"
import CustomerInfoPanel from "./info-panel"
import ProcessList from "./process-card-list"
import WorkflowHeader from "./workflow-header"
import { useState, useCallback } from "react"

type LeaseData = InferSelectModel<typeof leases>

interface WorkflowPageProps {
  leaseData: LeaseData
  userEmail: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'
interface Notification {
  message: string
  type: NotificationType
}

// Custom hook for workflow state management
function useWorkflowState(initialState: WorkflowState[], leaseId: number) {
  const [workflowStates, setWorkflowStates] = useState<WorkflowState[]>(initialState)
  const [notification, setNotification] = useState<Notification | null>(null)

  const currentStage = getCurrentStage(workflowStates)
  const processPercentage = getProcessPercentage(workflowStates)
  const isCompleted = isWorkflowComplete(workflowStates)

  const updateProcessState = useCallback(async (
    processId: string,
    newState: typeof STATES[keyof typeof STATES],
    actionName: string
  ) => {
    try {
      const updatedWorkflowState = workflowStates.map(stage => ({
        ...stage,
        processes: stage.processes.map(process =>
          process.id === processId
            ? { ...process, state: newState }
            : process
        )
      }))

      await updateProcessesRecords(leaseId, updatedWorkflowState)
      setWorkflowStates(updatedWorkflowState)
      setNotification({
        message: `'${processId}' has been ${actionName}.`,
        type: 'success'
      })
    } catch (err) {
      console.error(`Error ${actionName} process:`, err)
      setNotification({ 
        message: `Failed to ${actionName} process. Please try again.`, 
        type: 'error' 
      })
    }
  }, [workflowStates, leaseId])

  const handleApprove = useCallback((processId: string) => {
    updateProcessState(processId, STATES.APPROVED, 'approved')
  }, [updateProcessState])

  const handleRefuse = useCallback((processId: string) => {
    updateProcessState(processId, STATES.REFUSED, 'refused')
  }, [updateProcessState])

  const handleRollback = useCallback((processId: string) => {
    updateProcessState(processId, STATES.PENDING, 'rolled back')
  }, [updateProcessState])

  return {
    workflowStates,
    currentStage,
    processPercentage,
    isCompleted,
    notification,
    setNotification,
    handleApprove,
    handleRefuse,
    handleRollback
  }
}

export default function WorkflowPage({ leaseData, userEmail }: WorkflowPageProps) {
  const {
    workflowStates,
    currentStage,
    processPercentage,
    isCompleted,
    notification,
    setNotification,
    handleApprove,
    handleRefuse,
    handleRollback
  } = useWorkflowState(leaseData.state as WorkflowState[], leaseData.lease_id)

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <WorkflowHeader 
        currentStage={currentStage} 
        processPercentage={processPercentage} 
        isCompleted={isCompleted} 
      />

      <Grid container spacing={3}>
        <Grid size={3}>
          <CustomerInfoPanel
            leaseData={leaseData}
            userEmail={userEmail}
            processes={workflowStates.flatMap(s => s.processes)}
            currentStage={currentStage}
            isCompleted={isCompleted}
          />
        </Grid>
        <Grid size={9}>
          <ProcessList
            workflowStates={workflowStates}
            onApprove={handleApprove}
            onRefuse={handleRefuse}
            onRollback={handleRollback}
            currentStage={currentStage}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.type || 'info'}
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}