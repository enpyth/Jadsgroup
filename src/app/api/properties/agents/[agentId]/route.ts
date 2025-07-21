import { NextResponse } from 'next/server';
import { getAgentById } from '@/db/queries/properties';
import { db } from '@/db/index';
import { agents } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const agentId = parseInt(params.agentId);
    if (isNaN(agentId)) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      );
    }

    const agent = await getAgentById(agentId);
    if (!agent || agent.length === 0) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(agent[0]);
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const agentId = parseInt(params.agentId);
    if (isNaN(agentId)) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, phone, email, agency_name } = body;

    // Validate required fields
    if (!name || !phone || !email || !agency_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update agent
    const updatedAgent = await db
      .update(agents)
      .set({
        name,
        phone,
        email,
        agency_name,
      })
      .where(eq(agents.agent_id, agentId))
      .returning();

    if (updatedAgent.length === 0) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAgent[0]);
  } catch (error) {
    console.error('Error updating agent:', error);
    return NextResponse.json(
      { error: 'Failed to update agent' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const agentId = parseInt(params.agentId);
    if (isNaN(agentId)) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      );
    }

    // Delete agent
    const deletedAgent = await db
      .delete(agents)
      .where(eq(agents.agent_id, agentId))
      .returning();

    if (deletedAgent.length === 0) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    );
  }
} 