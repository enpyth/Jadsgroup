import { NextResponse } from 'next/server';
import { getAllOwners } from '@/db/queries/properties';
import { db } from '@/db/index';
import { owners } from '@/db/schema';

export async function GET() {
  const allOwners = await getAllOwners();
  return NextResponse.json(allOwners);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, address, company, acn } = body;
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
    const newOwner = await db.insert(owners).values({
      name,
      phone,
      email,
      address,
      company: companyObj,
    }).returning();
    return NextResponse.json(newOwner[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create landowner' }, { status: 500 });
  }
} 