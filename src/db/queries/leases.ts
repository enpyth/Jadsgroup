import 'dotenv/config';
import { db } from "@/db/index";
import { leases } from '@/db/schema';

// 查询所有租约
export const getAllLeases = async () => {
    return await db.select().from(leases);
};

// 添加新的租约
export const addLease = async (leaseData: any) => {
    return await db.insert(leases).values(leaseData);
}; 