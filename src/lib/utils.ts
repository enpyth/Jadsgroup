import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate time remaining from creation date until 48 hours have passed
export function calculateTimeRemaining(createdAt: string): string {
  const creationTime = new Date(createdAt).getTime()
  const deadline = creationTime + 48 * 60 * 60 * 1000 // 48 hours in milliseconds
  const now = Date.now()

  // If deadline has passed
  if (now >= deadline) {
    return "0h 0m"
  }

  const remainingMs = deadline - now
  const hours = Math.floor(remainingMs / (60 * 60 * 1000))
  const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000))

  return `${hours}h ${minutes}m`
}

// Get hours remaining (can be negative if overdue)
export function getHoursRemaining(createdAt: string): number {
  const creationTime = new Date(createdAt).getTime()
  const deadline = creationTime + 48 * 60 * 60 * 1000 // 48 hours in milliseconds
  const now = Date.now()

  const remainingMs = deadline - now
  return Math.floor(remainingMs / (60 * 60 * 1000))
}

