import { NextResponse } from "next/server";
import { addOutgoing, updateOutgoingByLeaseId } from "@/db/queries/outgoings";

export async function PUT(
    request: Request,
    { params }: { params: { leaseId: string } }
) {
    try {
        const body = await request.json();
        const { leaseId } = await params;
        await updateOutgoingByLeaseId(parseInt(leaseId), body);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update outgoing:', error);
        return NextResponse.json(
            { error: 'Failed to update outgoing' },
            { status: 500 }
        );
    }
} 

export async function POST(
    request: Request,
    { params }: { params: { leaseId: string } }
) {
    try {
        const body = await request.json();
        const { leaseId } = await params;
        await addOutgoing(parseInt(leaseId), body.records);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to create outgoing:', error);
        return NextResponse.json(
            { error: 'Failed to create outgoing' },
            { status: 500 }
        );
    }
}