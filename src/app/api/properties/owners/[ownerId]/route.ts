import { NextResponse } from 'next/server';
import { getOwnerById } from '@/db/queries/properties';
import { db } from '@/db/index';
import { owners } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    const ownerId = parseInt(params.ownerId);
    if (isNaN(ownerId)) {
      return NextResponse.json({ error: 'Invalid owner ID' }, { status: 400 });
    }
    const owner = await getOwnerById(ownerId);
    if (!owner || owner.length === 0) {
      return NextResponse.json({ error: 'Owner not found' }, { status: 404 });
    }
    return NextResponse.json(owner[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch owner' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    const ownerId = parseInt(params.ownerId);
    if (isNaN(ownerId)) {
      return NextResponse.json({ error: 'Invalid owner ID' }, { status: 400 });
    }
    const body = await request.json();
    const { name, phone, email, address, company } = body;
    if (!name || !phone || !email || !address || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    let companyObj = company;
    if (typeof company === 'string') {
      try {
        companyObj = JSON.parse(company);
      } catch {
        return NextResponse.json({ error: 'Company must be a valid JSON object' }, { status: 400 });
      }
    }
    if (typeof companyObj !== 'object' || Array.isArray(companyObj)) {
      return NextResponse.json({ error: 'Company must be an object' }, { status: 400 });
    }
    const updatedOwner = await db
      .update(owners)
      .set({ name, phone, email, address, company: companyObj })
      .where(eq(owners.owner_id, ownerId))
      .returning();
    if (updatedOwner.length === 0) {
      return NextResponse.json({ error: 'Owner not found' }, { status: 404 });
    }
    return NextResponse.json(updatedOwner[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update owner' }, { status: 500 });
  }
} 