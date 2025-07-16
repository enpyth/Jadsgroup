import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // adjust this import to your db instance
import { properties } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      owner_id,
      agent_id,
      name,
      unit,
      describe,
      size,
      price,
      state,
      image,
      detail,
    } = body;

    const newProperty = await db.insert(properties).values({
      owner_id,
      agent_id,
      name,
      unit,
      describe,
      size,
      price,
      state,
      image,
      detail,
    }).returning();

    return NextResponse.json(newProperty[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add property" }, { status: 500 });
  }
}
