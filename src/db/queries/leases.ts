import 'dotenv/config';
import { db } from "@/db/index";
import { leases, properties, owners, agents } from '@/db/schema';
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

export const getLeaseWithProperty = async (leaseId: number) => {
    return await db.select({
        // Lease data
        lease_id: leases.lease_id,
        property_id: leases.property_id,
        tenant_email: leases.tenant_email,
        terms: leases.terms,
        start_date: leases.start_date,
        end_date: leases.end_date,
        rent_amount: leases.rent_amount,
        deposit_amount: leases.deposit_amount,
        state: leases.state,
        agreement_to_lease: leases.agreement_to_lease,
        created_at: leases.created_at,
        application_data: leases.application_data,
        updated_at: leases.updated_at,
        // Property data
        property: {
            property_id: properties.property_id,
            owner_id: properties.owner_id,
            agent_id: properties.agent_id,
            name: properties.name,
            unit: properties.unit,
            describe: properties.describe,
            size: properties.size,
            price: properties.price,
            state: properties.state,
            image: properties.image,
            detail: properties.detail,
            release_time: properties.release_time,
        },
        // Owner data
        owner: {
            owner_id: owners.owner_id,
            company: owners.company,
            name: owners.name,
            phone: owners.phone,
            email: owners.email,
            address: owners.address,
            created_at: owners.created_at,
        },
        agent: {
            agent_id: agents.agent_id,
            name: agents.name,
            phone: agents.phone,
            email: agents.email,
            agency_name: agents.agency_name,
        }
    }).from(leases)
    .innerJoin(properties, eq(leases.property_id, properties.property_id))
    .innerJoin(owners, eq(properties.owner_id, owners.owner_id))
    .innerJoin(agents, eq(properties.agent_id, agents.agent_id))
    .where(eq(leases.lease_id, leaseId))
    .limit(1);
};

export const getTenantEmailByLeaseId = async (leaseId: number) => {
    return await db.select({
        tenant_email: leases.tenant_email
    }).from(leases).where(eq(leases.lease_id, leaseId)).limit(1);
};

export const addLease = async (leaseData: any) => {
    const result = await db.insert(leases).values(leaseData).returning({ lease_id: leases.lease_id });
    return result[0].lease_id;
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
