import { NextResponse } from "next/server"
import { type Process, WORKFLOW_CONFIG } from "@/constants/data"

// Server-side process data generation
export async function GET() {
  const processes = generateInitialProcesses()
  return NextResponse.json(processes)
}

// Generate initial processes from configuration
function generateInitialProcesses() {
  const now = Date.now()
  const processes: Process[] = []

  WORKFLOW_CONFIG.forEach((stage) => {
    stage.processes.forEach((processConfig) => {
      processes.push({
        id: processConfig.id,
        name: processConfig.name,
        description: processConfig.description,
        state: stage.id,
        stageId: stage.id,
        createdAt: new Date(now - Math.floor(Math.random() * 48) * 3600 * 1000).toISOString(),
        assignedTo: processConfig.assignedTo,
        originalStage: stage.id,
      })
    })
  })

  return processes
}

// Handle process approval
export async function POST(request: Request) {
  const { action, processId, reason } = await request.json()

  // In a real application, this would update a database
  // For now, we'll just return a success response
  return NextResponse.json({
    success: true,
    action,
    processId,
    reason,
    timestamp: new Date().toISOString(),
  })
}

