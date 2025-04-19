"use client"

import { useState, useEffect } from "react"
import { ProcessList } from "@/features/workflow/process-list"
import { WorkflowHeader } from "@/features/workflow/workflow-header"
import { CustomerInfoPanel } from "@/features/workflow/info-panel"
import { type Process, type WorkflowState, WORKFLOW_CONFIG, type RefusalRecord, type Customer } from "@/constants/workflow"
import { CheckCircle } from "lucide-react"
import { Box, Alert, Container, Grid, CircularProgress, Typography } from "@mui/material"
import { getCustomerInfo, getProcesses, approveProcess, refuseProcess, rollbackProcess } from "@/db/tmp_api"

export default function WorkflowPage() {
  // State for data
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [processes, setProcesses] = useState<Process[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Current workflow state
  // TODO get state from db
  const [workflowState, setWorkflowState] = useState<WorkflowState>("Review Application")

  // Force a re-render every minute to update countdown timers
  const [, setTime] = useState(Date.now())

  // Fetch data from server
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [customerData, processesData] = await Promise.all([getCustomerInfo(), getProcesses()])

        setCustomer(customerData)
        setProcesses(processesData)
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Check if all processes are done (approved or refused)
  useEffect(() => {
    if (processes.length === 0) return

    const allProcessesDone = processes.every((process) => process.state === "approved" || process.state === "refused")

    if (allProcessesDone && workflowState !== "finished") {
      setWorkflowState("finished")
    } else if (!allProcessesDone && workflowState === "finished") {
      // If a process is rolled back from finished state, determine the appropriate stage
      for (const stage of WORKFLOW_CONFIG) {
        const stagePending = processes.some((p) => p.state === stage.id)
        if (stagePending) {
          setWorkflowState(stage.id)
          break
        }
      }
    }
  }, [processes, workflowState])

  // Handle process approval
  const handleApprove = async (processId: string) => {
    try {
      await approveProcess(processId)

      // Update local state
      setProcesses((prevProcesses) =>
        prevProcesses.map((process) => (process.id === processId ? { ...process, state: "approved" } : process)),
      )

      // Check if all processes in current stage are approved
      const updatedProcesses = processes.map((process) =>
        process.id === processId ? { ...process, state: "approved" } : process,
      )

      // Get all processes for the current stage
      const currentStageProcesses = updatedProcesses.filter((p) => p.stageId === workflowState)

      // Check if all processes in the current stage are approved
      const allCurrentStageApproved = currentStageProcesses.every((p) => p.state === "approved")

      // If all processes in current stage are approved, move to next stage
      if (allCurrentStageApproved && workflowState !== "finished") {
        const currentStageIndex = WORKFLOW_CONFIG.findIndex((stage) => stage.id === workflowState)
        if (currentStageIndex < WORKFLOW_CONFIG.length - 1) {
          setWorkflowState(WORKFLOW_CONFIG[currentStageIndex + 1].id)
        }
      }
    } catch (err) {
      console.error("Error approving process:", err)
      setError("Failed to approve process. Please try again.")
    }
  }

  // Handle process refusal with timestamp
  const handleRefuse = async (processId: string, reason: string) => {
    try {
      const result = await refuseProcess(processId, reason)

      // Update local state
      setProcesses((prevProcesses) =>
        prevProcesses.map((process) => {
          if (process.id === processId) {
            // Create a new refusal record with timestamp from server
            const newRefusalRecord: RefusalRecord = {
              reason,
              timestamp: result.timestamp,
            }

            // Add to existing records or create new array
            const refusalRecords = process.refusalRecords
              ? [...process.refusalRecords, newRefusalRecord]
              : [newRefusalRecord]

            return {
              ...process,
              state: "refused",
              refusalRecords,
            }
          }
          return process
        }),
      )
    } catch (err) {
      console.error("Error refusing process:", err)
      setError("Failed to refuse process. Please try again.")
    }
  }

  // Handle process rollback
  const handleRollback = async (processId: string) => {
    try {
      await rollbackProcess(processId)

      // Update local state
      setProcesses((prevProcesses) =>
        prevProcesses.map((process) =>
          process.id === processId && process.originalStage ? { ...process, state: process.originalStage } : process,
        ),
      )

      // Check if we need to roll back the workflow state
      const processToRollback = processes.find((p) => p.id === processId)

      if (processToRollback && processToRollback.originalStage) {
        const currentStageIndex = WORKFLOW_CONFIG.findIndex((stage) => stage.id === workflowState)
        const rollbackStageIndex = WORKFLOW_CONFIG.findIndex((stage) => stage.id === processToRollback.originalStage)

        // If rolling back to an earlier stage
        if (rollbackStageIndex < currentStageIndex) {
          // Check if any processes from the current stage are already approved
          const currentStageHasApproved = processes.some((p) => p.stageId === workflowState && p.state === "approved")

          // If no processes in current stage are approved, roll back to the appropriate stage
          if (!currentStageHasApproved) {
            setWorkflowState(processToRollback.originalStage)
          }
        }
      }
    } catch (err) {
      console.error("Error rolling back process:", err)
      setError("Failed to rollback process. Please try again.")
    }
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading workflow data...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <WorkflowHeader currentState={workflowState} />

      {workflowState === "finished" && (
        <Alert icon={<CheckCircle size={24} />} severity="success" sx={{ mb: 3 }}>
          <Box>
            <strong>Application Approved</strong>
            <Box component="p" sx={{ m: 0 }}>
              All processes have been successfully completed.
            </Box>
          </Box>
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          {customer && <CustomerInfoPanel customer={customer} currentStage={workflowState} processes={processes}/>}
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <ProcessList
            processes={processes}
            onApprove={handleApprove}
            onRefuse={handleRefuse}
            onRollback={handleRollback}
            currentState={workflowState}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

