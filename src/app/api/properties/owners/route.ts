import { NextResponse } from 'next/server';
import { getAllOwners } from '@/db/queries/properties';

export async function GET() {
  try {
    const owners = await getAllOwners();
    return NextResponse.json(owners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch owners' }, { status: 500 });
  }
} 