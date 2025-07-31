import 'dotenv/config';
import { db } from "@/db/index";
import { outgoings } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getOutgoingByLeaseId = async (leaseId: number) => {
    return await db.select().from(outgoings).where(eq(outgoings.lease_id, leaseId));
};

export const getAllOutgoings = async () => {
    return await db.select().from(outgoings);
};

// todo: add outgoing
export const addOutgoing = async (leaseId: number, outgoingData: any) => {
    return await db.insert(outgoings).values({ 
        lease_id: leaseId, 
        records: outgoingData.records || outgoingData,
        invoice_id: outgoingData.invoice_id || "",
        invoice_img: outgoingData.invoice_img || "placeholder.jpg"
    });
};

export const updateOutgoingByLeaseId = async (leaseId: number, outgoingData: any) => {
    return await db.update(outgoings).set(outgoingData).where(eq(outgoings.lease_id, leaseId));
};

// todo: delete outgoing
export const deleteOutgoing = async (outgoingId: number) => {
    return await db.delete(outgoings).where(eq(outgoings.outgoing_id, outgoingId));
};