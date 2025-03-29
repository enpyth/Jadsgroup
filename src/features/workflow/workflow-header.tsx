import { Chip, LinearProgress, Typography, Box } from "@mui/material"
import { type WorkflowState, STAGE_NAMES, WORKFLOW_CONFIG } from "@/constants/data"
import { CheckCircle } from "lucide-react"

interface WorkflowHeaderProps {
  currentState: WorkflowState
}

export function WorkflowHeader({ currentState }: WorkflowHeaderProps) {
  // Calculate progress percentage based on current stage
  const getProgressPercentage = () => {
    const totalStages = WORKFLOW_CONFIG.length
    const currentIndex = WORKFLOW_CONFIG.findIndex((stage) => stage.id === currentState)

    if (currentState === "finished") return 100
    if (currentIndex === -1) return 0

    return ((currentIndex) / totalStages) * 100
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
          mb: 2,
        }}
      >
        <div>
          <Typography variant="h5" fontWeight="bold">
            Rental Application
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Process tenant application and lease agreement
          </Typography>
        </div>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            Current Stage:
          </Typography>
          {currentState === "finished" ? (
            <Chip icon={<CheckCircle size={16} />} label={STAGE_NAMES[currentState]} color="success" size="small" />
          ) : (
            <Chip label={STAGE_NAMES[currentState]} color="primary" size="small" />
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          {WORKFLOW_CONFIG.map((stage) => (
            <Typography key={stage.id} variant="caption" fontWeight="medium">
              {stage.name}
            </Typography>
          ))}
        </Box>
        <LinearProgress
          variant="determinate"
          value={getProgressPercentage()}
          color={currentState === "finished" ? "success" : "primary"}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </Box>
  )
}

