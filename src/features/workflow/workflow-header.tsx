import { Chip, LinearProgress, Typography, Box, Alert } from "@mui/material"
import { type WorkflowId } from "@/constants/workflow"
import { CheckCircle } from "lucide-react"

interface WorkflowHeaderProps {
  currentStage: WorkflowId
  processPercentage: number
  isCompleted: boolean
}

export default function WorkflowHeader({ currentStage, processPercentage, isCompleted }: WorkflowHeaderProps) {
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
          {isCompleted ? (
            <Chip icon={<CheckCircle size={16} />} label="Workflow Complete" color="success" size="small" />
          ) : (
            <Chip 
              label={currentStage}
              color="primary" 
              size="small" 
            />
          )}
        </Box>
      </Box>

      <Box sx={{ my: 2 }}>
        <LinearProgress
          variant="determinate"
          value={processPercentage}
          color={isCompleted ? "success" : "primary"}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
      
      {isCompleted && (
        <Alert icon={<CheckCircle size={24} />} severity="success" sx={{ mb: 3 }}>
          <Box>
            <strong>Application Approved</strong>
            <Box component="p" sx={{ m: 0 }}>
              All processes have been successfully completed.
            </Box>
          </Box>
        </Alert>
      )}
    </Box>
  )
}

