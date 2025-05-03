import 'dotenv/config';
import { db } from "@/db/index";
import { leases, properties } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const getAllLeases = async () => {
    return await db.select(
        {
            lease_id: leases.lease_id,
            property_id: leases.property_id,
            property_name: properties.name,
            tenant_email: leases.tenant_email,
            start_date: leases.start_date,
            end_date: leases.end_date,
            rent_amount: leases.rent_amount,
            deposit_amount: leases.deposit_amount,
            state: leases.state,
            agreement_to_lease: leases.agreement_to_lease,
            created_at: leases.created_at
        }
    ).from(leases).innerJoin(properties, eq(leases.property_id, properties.property_id))
        .orderBy(desc(leases.created_at));
};

export const addLease = async (leaseData: any) => {
    return await db.insert(leases).values(leaseData);
};

export const getLeaseById = async (leaseId: number) => {
    return await db.select().from(leases).where(eq(leases.lease_id, leaseId));
};

export const updateLeaseState = async (leaseId: number, newState: any) => {
    return await db.update(leases)
        .set({
            state: newState,
            updated_at: new Date()
        })
        .where(eq(leases.lease_id, leaseId));
};
