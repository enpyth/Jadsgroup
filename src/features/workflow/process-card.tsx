"use client"

import { format } from "date-fns"
import { CheckCircle, XCircle, RotateCcw, Clock, MessageSquare, ChevronDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material"
import { type Process, STAGE_NAMES } from "@/constants/workflow"

interface ProcessCardProps {
  process: Process
  onApprove: () => void
  onRefuse: () => void
  onRollback?: () => void
  isCurrentStage: boolean
  timeRemaining?: string
}

export function ProcessCard({
  process,
  onApprove,
  onRefuse,
  onRollback,
  isCurrentStage,
  timeRemaining,
}: ProcessCardProps) {
  const isProcessed = process.state === "approved" || process.state === "refused"

  // Get the stage name for display
  const getStageName = (state: string) => {
    if (state === "approved" || state === "refused") return ""
    return STAGE_NAMES[state as keyof typeof STAGE_NAMES] || state
  }

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "MMM d, yyyy 'at' h:mm a")
  }

  return (
    <Card variant="outlined">
      <CardHeader
        sx={{ p: 1.5, pb: 0 }}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Typography variant="subtitle1" fontWeight="bold">
                {process.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Assigned to: {process.assignedTo}
              </Typography>
            </div>
            <div>
              {process.state === "approved" && (
                <Box sx={{ display: "flex", alignItems: "center", color: "success.main" }}>
                  <CheckCircle size={16} style={{ marginRight: 4 }} />
                  <Typography variant="caption" fontWeight="medium">
                    Approved
                  </Typography>
                </Box>
              )}
              {process.state === "refused" && (
                <Box sx={{ display: "flex", alignItems: "center", color: "error.main" }}>
                  <XCircle size={16} style={{ marginRight: 4 }} />
                  <Typography variant="caption" fontWeight="medium">
                    Refused
                  </Typography>
                </Box>
              )}
            </div>
          </Box>
        }
      />
      <CardContent sx={{ p: 1.5, pt: 1 }}>
        <Typography variant="body2">{process.description}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 0.5,
          }}
        >
          {timeRemaining && !isProcessed && isCurrentStage && (
            <Box sx={{ display: "flex", alignItems: "center", color: "warning.main" }}>
              <Clock size={12} style={{ marginRight: 4 }} />
              <Typography variant="caption">Countdown {timeRemaining}</Typography>
            </Box>
          )}
        </Box>

        {/* Refusal Records with timestamps */}
        {process.refusalRecords && process.refusalRecords.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Accordion disableGutters>
              <AccordionSummary
                expandIcon={<ChevronDown size={16} />}
                sx={{
                  minHeight: "unset",
                  py: 0.5,
                  "& .MuiAccordionSummary-content": { margin: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", color: "error.main" }}>
                  <MessageSquare size={12} style={{ marginRight: 4 }} />
                  <Typography variant="caption" fontWeight="medium">
                    Refusal History ({process.refusalRecords.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1 }}>
                <Box
                  sx={{
                    maxHeight: 128,
                    overflowY: "auto",
                    pr: 1,
                    "& > div:not(:last-child)": { mb: 1 },
                  }}
                >
                  {process.refusalRecords.map((record, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1,
                        bgcolor: "error.lighter",
                        border: "1px solid",
                        borderColor: "error.light",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="caption" color="error.dark">
                        {record.reason}
                      </Typography>
                      <Typography variant="caption" color="error.main" sx={{ display: "block", mt: 0.5 }}>
                        {formatTimestamp(record.timestamp)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          p: 1,
          bgcolor: "action.hover",
        }}
      >
        {(process.state === "approved" || process.state === "refused") && onRollback && (
          <Button
            variant="outlined"
            size="small"
            onClick={onRollback}
            startIcon={<RotateCcw size={12} />}
            sx={{ textTransform: "none", fontSize: "0.75rem" }}
          >
            Rollback
          </Button>
        )}

        {!isProcessed && (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={onRefuse}
              disabled={!isCurrentStage}
              sx={{ textTransform: "none", fontSize: "0.75rem" }}
            >
              Refuse
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={onApprove}
              disabled={!isCurrentStage}
              sx={{ textTransform: "none", fontSize: "0.75rem" }}
            >
              Approve
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

