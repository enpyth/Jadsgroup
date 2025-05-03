"use client"

import { useState } from "react"
import { ProcessCard } from "@/features/workflow/process-card"
import { RefusalDialog } from "@/features/workflow/dialog-refusal"
import { type Process, type WorkflowId, type WorkflowState, STATES } from "@/constants/workflow"
import { CheckCircle, XCircle } from "lucide-react"
import { Box, Typography, Paper } from "@mui/material"
import { calculateTimeRemaining, getHoursRemaining } from "@/lib/utils"

interface ProcessListProps {
  workflowStates: WorkflowState[]
  onApprove: (id: string) => void
  onRefuse: (id: string, reason: string) => void
  onRollback: (id: string) => void
  currentStage: WorkflowId
}

export default function ProcessList({ workflowStates, onApprove, onRefuse, onRollback, currentStage }: ProcessListProps) {
  const [refusalDialogOpen, setRefusalDialogOpen] = useState(false)
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null)

  // Get all processes from all workflow states
  const allProcesses = workflowStates.flatMap(stage => stage.processes)

  // Group processes by their state
  const approvedProcesses = allProcesses.filter((p) => p.state === STATES.APPROVED)
  const refusedProcesses = allProcesses.filter((p) => p.state === STATES.REFUSED)

  // Group active processes by workflow stage
  const activeProcessesByStage = workflowStates.reduce(
    (acc, stage) => {
      acc[stage.stageId] = stage.processes.filter(p => p.state === STATES.PENDING)
      return acc
    },
    {} as Record<WorkflowId, Process[]>
  )

  const handleRefuseClick = (id: string) => {
    setSelectedProcessId(id)
    setRefusalDialogOpen(true)
  }

  const handleRefuseSubmit = (reason: string) => {
    if (selectedProcessId) {
      onRefuse(selectedProcessId, reason)
      setRefusalDialogOpen(false)
      setSelectedProcessId(null)
    }
  }

  // Get stage background color
  const getStageBgColor = (stageId: WorkflowId) => {
    if (stageId === currentStage) {
      return "rgba(25, 118, 210, 0.04)"
    }
    return "transparent"
  }

  // Get stage color based on time remaining
  const getStageColor = (stageId: WorkflowId) => {
    if (stageId !== currentStage) {
      return "grey.500"
    }

    // Check if any process in this stage has less than 24 hours remaining
    const stageProcesses = activeProcessesByStage[stageId]

    if (stageProcesses.length === 0) {
      return "info"
    }

    // Check time remaining for each process
    for (const process of stageProcesses) {
      const hoursRemaining = getHoursRemaining(process.createdAt)
      if (hoursRemaining < 24) {
        return "error"
      }
    }

    return "warning"
  }

  // Render all processes in the specified order
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Approved Processes at the top */}
      {approvedProcesses.length > 0 && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: "success.lighter",
            borderColor: "success.light",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1.5,
              color: "success.dark",
            }}
          >
            <CheckCircle size={16} style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Approved Processes</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
            }}
          >
            {approvedProcesses.map((process) => (
              <ProcessCard
                key={process.id}
                process={process}
                onApprove={() => onApprove(process.id)}
                onRefuse={() => handleRefuseClick(process.id)}
                onRollback={() => onRollback(process.id)}
                isCurrentStage={process.state === STATES.APPROVED && currentStage === process.id}
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Refused Processes */}
      {refusedProcesses.length > 0 && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: "error.lighter",
            borderColor: "error.light",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1.5,
              color: "error.dark",
            }}
          >
            <XCircle size={16} style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Refused Processes</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
            }}
          >
            {refusedProcesses.map((process) => (
              <ProcessCard
                key={process.id}
                process={process}
                onApprove={() => onApprove(process.id)}
                onRefuse={() => handleRefuseClick(process.id)}
                onRollback={() => onRollback(process.id)}
                isCurrentStage={process.state === STATES.REFUSED && currentStage === process.id}
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Active Processes by Stage */}
      {workflowStates.map((stage, index) => {
        const stageProcesses = activeProcessesByStage[stage.stageId] || []
        if (stageProcesses.length === 0) return null

        const stageIndex = index + 1
        const isCurrentStage = stage.stageId === currentStage
        const stageColor = getStageColor(stage.stageId)

        return (
          <Paper
            key={stage.stageId}
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: getStageBgColor(stage.stageId),
              borderColor: isCurrentStage ? `${stageColor}.light` : "divider",
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: `${stageColor}.main`,
                  color: "grey.300",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  mr: 1,
                  fontWeight: "bold",
                  border: "1px solid rgba(0,0,0,0.2)",
                }}
              >
                {stageIndex}
              </Box>
              <Typography variant="subtitle2">{stage.stageId}</Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
              }}
            >
              {stageProcesses.map((process) => (
                <ProcessCard
                  key={process.id}
                  process={process}
                  onApprove={() => onApprove(process.id)}
                  onRefuse={() => handleRefuseClick(process.id)}
                  isCurrentStage={currentStage === stage.stageId}
                  timeRemaining={currentStage === stage.stageId ? calculateTimeRemaining(process.createdAt) : undefined}
                />
              ))}
            </Box>
          </Paper>
        )
      })}

      <RefusalDialog
        open={refusalDialogOpen}
        onClose={() => setRefusalDialogOpen(false)}
        onSubmit={handleRefuseSubmit}
      />
    </Box>
  )
}

