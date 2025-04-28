export async function approveProcess(processId: string): Promise<{ success: boolean }> {
  const response = await fetch("/api/processes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "approve", processId }),
  })

  if (!response.ok) {
    throw new Error("Failed to approve process")
  }

  return response.json()
}

export async function refuseProcess(
  processId: string,
  reason: string,
): Promise<{
  success: boolean
  timestamp: string
}> {
  const response = await fetch("/api/processes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "refuse", processId, reason }),
  })

  if (!response.ok) {
    throw new Error("Failed to refuse process")
  }

  return response.json()
}

export async function rollbackProcess(processId: string): Promise<{ success: boolean }> {
  const response = await fetch("/api/processes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "rollback", processId }),
  })

  if (!response.ok) {
    throw new Error("Failed to rollback process")
  }

  return response.json()
}

