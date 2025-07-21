import { NextResponse } from 'next/server';
import { getAllAgents } from '@/db/queries/properties';
import { db } from '@/db/index';
import { agents } from '@/db/schema';

export async function GET() {
  try {
    const agents = await getAllAgents();
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, agency_name } = body;

    // Validate required fields
    if (!name || !phone || !email || !agency_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert new agent
    const newAgent = await db.insert(agents).values({
      name,
      phone,
      email,
      agency_name,
    }).returning();

    return NextResponse.json(newAgent[0], { status: 201 });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
} 