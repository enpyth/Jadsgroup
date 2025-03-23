import { addLease } from '@/db/queries/leases'; // 导入添加租约的函数

export async function POST(request: Request) {
    if (request.method === 'POST') {
        const leaseData = await request.json(); // Parse the JSON body

        // Validate that property_id is present
        if (!leaseData.property_id) {
            return new Response(JSON.stringify({ message: 'property_id is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        try {
            await addLease(leaseData);
            return new Response(JSON.stringify({ message: 'Lease added successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ message: 'Error adding lease' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        return new Response(`Method ${request.method} Not Allowed`, {
            status: 405,
            headers: { 'Allow': 'POST', 'Content-Type': 'text/plain' },
        });
    }
} 