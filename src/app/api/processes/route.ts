import { NextResponse } from "next/server"
import { updateLeaseState } from "@/db/queries/leases"

export async function POST(request: Request) {
  try {
    const { leaseId, workflowState } = await request.json()

    if (!leaseId || !workflowState) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      )
    }

    // Update lease with new processes and stage
    await updateLeaseState(leaseId, workflowState)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in process API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
