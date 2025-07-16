import { NextResponse } from 'next/server';
import { getAllAgents } from '@/db/queries/properties';

export async function GET() {
  try {
    const agents = await getAllAgents();
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
} 