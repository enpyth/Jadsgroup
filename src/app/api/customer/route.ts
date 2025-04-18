import { NextResponse } from "next/server"
import type { Customer } from "@/constants/workflow"

// Server-side customer data
export async function GET() {
  // TODO In a real application, this would fetch from a database
  const customerInfo: Customer = {
    property_id: 10,
    tenant_email: "bob@example.com",
    start_date: new Date(),
    end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    rent_amount: 1200.0,
    deposit_amount: 1200.0,
    stage: "Review Application",
    agreement_to_lease: "a file url",
  }

  return NextResponse.json(customerInfo)
}

