import { NextResponse } from 'next/server';
import { getPropertiesByID } from '@/db/queries/properties';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const properties = await getPropertiesByID(parseInt(params.id));
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch property' },
            { status: 500 }
        );
    }
} 