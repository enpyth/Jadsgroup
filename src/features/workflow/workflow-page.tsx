"use client";

import { leases } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import {
  STATES,
  WorkflowState,
  getCurrentStage,
  getProcessPercentage,
  isWorkflowComplete,
  updateProcessesRecords,
} from "@/constants/workflow";
import { getDocumentConfig } from "@/lib/documentConfig";
import { Alert, Container, Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomerInfoPanel from "./info-panel";
import ProcessList from "./process-card-list";
import WorkflowHeader from "./workflow-header";
import { useState, useCallback } from "react";
import { PROCESS_IDS } from "@/constants/workflow";
import { generatePdf } from "@/lib/documentUtils";
import { emailConfig } from "@/lib/email-config";
import type { ApplicationData } from "types";

type LeaseData = InferSelectModel<typeof leases>;

interface WorkflowPageProps {
  leaseData: LeaseData;
  role: string;
}

type NotificationType = "success" | "info" | "warning" | "error";
interface Notification {
  message: string;
  type: NotificationType;
}

// Custom hook for workflow state management
function useWorkflowState(leaseData: LeaseData) {
  const [workflowStates, setWorkflowStates] =
    useState<WorkflowState[]>(leaseData.state as WorkflowState[]);
  const [notification, setNotification] = useState<Notification | null>(null);

  const currentStage = getCurrentStage(workflowStates);
  const processPercentage = getProcessPercentage(workflowStates);
  const isCompleted = isWorkflowComplete(workflowStates);

  // Update the process state when the user clicks on the approve, refuse or rollback button
  const updateProcessState = useCallback(
    async (
      processId: string,
      newState: (typeof STATES)[keyof typeof STATES],
      actionName: string
    ) => {
      try {
        const updatedWorkflowState = workflowStates.map((stage) => ({
          ...stage,
          processes: stage.processes.map((process) =>
            process.id === processId ? { ...process, state: newState } : process
          ),
        }));

        await updateProcessesRecords(leaseData.lease_id, updatedWorkflowState);
        setWorkflowStates(updatedWorkflowState);
        setNotification({
          message: `'${processId}' has been ${actionName}.`,
          type: "success",
        });
      } catch (err) {
        console.error(`Error ${actionName} process:`, err);
        setNotification({
          message: `Failed to ${actionName} process. Please try again.`,
          type: "error",
        });
      }
    },
    [workflowStates, leaseData.lease_id]
  );

  const handleApprove = useCallback(
    async (processId: string) => {
      // Check if this process requires document generation
      const documentConfig = getDocumentConfig(processId);
      
      if (documentConfig) {
        try {
          // Generate and upload document
          const response = await fetch('/api/document', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              processId: processId,
              leaseData: leaseData,
            }),
          });
          
          const result = await response.json();
          if (!result.success) {
            throw new Error('Failed to generate document');
          }
          
          console.log(`Document generated successfully: ${result.fileName}`);
        } catch (err) {
          console.error('Error generating document:', err);
          setNotification({
            message: 'Failed to generate document. Please try again.',
            type: 'error',
          });
          return;
        }
      } else if (processId === PROCESS_IDS.ADMIN_PUBLISH) {
        console.log("TODO: Admin Publish: upload PDF");
      }

      // Update the process state
      updateProcessState(processId, STATES.APPROVED, "approved");
    },
    [updateProcessState, leaseData]
  );

  const handleRefuse = useCallback(
    async (processId: string) => {
      try {
        // Update the process state first
        await updateProcessState(processId, STATES.REFUSED, "refused");

        // Send email notification to the applicant
        const applicationData = leaseData.application_data as ApplicationData;
        const emailResponse = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            template: 'lease-refusal',
            recipients: [leaseData.tenant_email],
            subject: 'Lease Application Update - Not Approved',
            message: 'We regret to inform you that your lease application has not been approved after careful review.',
            leaseId: leaseData.lease_id.toString(),
            applicantName: applicationData?.personal_info?.first_name 
              ? `${applicationData.personal_info.first_name} ${applicationData.personal_info.surname}`
              : 'Applicant',
            refusalReason: 'After careful review of your application, we are unable to proceed with your lease request at this time. This decision was made after thorough consideration of all application criteria and current market conditions.',
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send refusal email notification:', emailResponse.statusText);
          // Don't throw error here as the process state was updated successfully
        } else {
          console.log('Refusal email notification sent successfully');
        }
      } catch (error) {
        console.error('Error in handleRefuse:', error);
        setNotification({
          message: 'Failed to process refusal. Please try again.',
          type: 'error',
        });
      }
    },
    [updateProcessState, leaseData]
  );

  const handleRollback = useCallback(
    (processId: string) => {
      updateProcessState(processId, STATES.PENDING, "rolled back");
    },
    [updateProcessState]
  );

  return {
    workflowStates,
    currentStage,
    processPercentage,
    isCompleted,
    notification,
    setNotification,
    handleApprove,
    handleRefuse,
    handleRollback,
  };
}

export default function WorkflowPage({ leaseData, role }: WorkflowPageProps) {
  const {
    workflowStates,
    currentStage,
    processPercentage,
    isCompleted,
    notification,
    setNotification,
    handleApprove,
    handleRefuse,
    handleRollback,
  } = useWorkflowState(leaseData);

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
            processes={workflowStates.flatMap((s) => s.processes)}
            isCompleted={isCompleted}
            role={role}
          />
        </Grid>
        <Grid size={9}>
          <ProcessList
            workflowStates={workflowStates}
            onApprove={handleApprove}
            onRefuse={handleRefuse}
            onRollback={handleRollback}
            currentStage={currentStage}
            role={role}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.type || "info"}
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
