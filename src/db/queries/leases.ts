import 'dotenv/config';
import { db } from "@/db/index";
import { leases, properties } from '@/db/schema';
import { eq } from 'drizzle-orm';

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
            stage: leases.stage,
            agreement_to_lease: leases.agreement_to_lease
          }
    ).from(leases).innerJoin(properties, eq(leases.property_id, properties.property_id));
    // return await db.select().from(leases);
};

export const addLease = async (leaseData: any) => {
    return await db.insert(leases).values(leaseData);
}; 