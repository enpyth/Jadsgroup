import { db } from '@/db/index';
import { tenants } from '@/db/schema';

export async function POST(request: Request) {
    try {
        const tenantData = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'phone', 'email', 'id_card'];
        for (const field of requiredFields) {
            if (!tenantData[field]) {
                return new Response(JSON.stringify({ message: `${field} is required` }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        // Insert tenant into database
        await db.insert(tenants).values(tenantData);

        return new Response(JSON.stringify({ message: 'Tenant created successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating tenant:', error);
        return new Response(JSON.stringify({ message: 'Error creating tenant' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 