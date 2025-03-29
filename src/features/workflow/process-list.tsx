"use client"

import { useState } from "react"
import { ProcessCard } from "@/features/workflow/process-card"
import { RefusalDialog } from "@/features/workflow/dialog-refusal"
import { type Process, type WorkflowState, WORKFLOW_CONFIG } from "@/constants/data"
import { calculateTimeRemaining } from "@/lib/utils"
import { CheckCircle, XCircle } from "lucide-react"
import { Box, Typography, Paper } from "@mui/material"

interface ProcessListProps {
  processes: Process[]
  onApprove: (id: string) => void
  onRefuse: (id: string, reason: string) => void
  onRollback: (id: string) => void
  currentState: WorkflowState
}

export function ProcessList({ processes, onApprove, onRefuse, onRollback, currentState }: ProcessListProps) {
  const [refusalDialogOpen, setRefusalDialogOpen] = useState(false)
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null)

  // Group processes by their state
  const approvedProcesses = processes.filter((p) => p.state === "approved")
  const refusedProcesses = processes.filter((p) => p.state === "refused")

  // Group active processes by stage
  const activeProcessesByStage = WORKFLOW_CONFIG.reduce(
    (acc, stage) => {
      acc[stage.id] = processes.filter((p) => p.state === stage.id)
      return acc
    },
    {} as Record<string, Process[]>,
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
  const getStageBgColor = (stage: string) => {
    if (stage === currentState && currentState !== "finished") {
      return "rgba(25, 118, 210, 0.04)"
    }
    return "transparent"
  }

  // Get stage color for badge
  const getStageColor = (stageId: string) => {
    const stage = WORKFLOW_CONFIG.find((s) => s.id === stageId)
    return stage?.color || "gray"
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
                isCurrentStage={process.stageId === currentState}
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Refused Processes - now displayed after approved but before pending */}
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
                isCurrentStage={process.stageId === currentState}
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Active Processes by Stage */}
      {WORKFLOW_CONFIG.map((stage) => {
        const stageProcesses = activeProcessesByStage[stage.id] || []
        if (stageProcesses.length === 0) return null

        const stageIndex = WORKFLOW_CONFIG.findIndex((s) => s.id === stage.id) + 1
        const isCurrentStage = stage.id === currentState

        return (
          <Paper
            key={stage.id}
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: getStageBgColor(stage.id),
              borderColor: isCurrentStage ? "primary.light" : "divider",
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
                  bgcolor: `${stage.color}.main`,
                  color: "#fff",
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
              <Typography variant="subtitle2">{stage.name}</Typography>
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
                  isCurrentStage={currentState === stage.id}
                  timeRemaining={currentState === stage.id ? calculateTimeRemaining(process.createdAt) : undefined}
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

