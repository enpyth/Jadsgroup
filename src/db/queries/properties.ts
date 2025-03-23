import 'dotenv/config';
import { db } from "@/db/index";
import { properties, owners, agents, tenants } from "@/db/schema";
import { eq, like, and, or, desc, asc, gte, lte, sql } from "drizzle-orm";

// 获取所有房产
export async function getAllProperties() {
  return await db.select().from(properties);
}

// 获取单个房产详情
export async function getPropertyById(propertyId: number) {
  return await db
    .select()
    .from(properties)
    .where(eq(properties.property_id, propertyId))
    .limit(1);
}

// 获取房产详情，包含所有者和经纪人信息
export async function getPropertyWithDetails() {
  return await db
  .select({
    property_id: properties.property_id,
    name: properties.name,
    description: properties.describe,
    size: properties.size,
    price: properties.price,
    state: properties.state,
    image: properties.image,
    releaseTime: properties.release_time,
    ownerName: owners.name,
    agentName: agents.agency_name,
  })
  .from(properties)
  .innerJoin(owners, eq(properties.owner_id, owners.owner_id))
  .innerJoin(agents, eq(properties.agent_id, agents.agent_id))
  // TODO lease
}

// 创建新房产
export async function createProperty(propertyData: any) {
  return await db.insert(properties).values(propertyData).returning();
}

// 更新房产信息
export async function updateProperty(propertyId: number, propertyData: any) {
  return await db
    .update(properties)
    .set(propertyData)
    .where(eq(properties.property_id, propertyId))
    .returning();
}

// 删除房产
export async function deleteProperty(propertyId: number) {
  return await db
    .delete(properties)
    .where(eq(properties.property_id, propertyId))
    .returning();
}

// 按状态筛选房产
export async function getPropertiesByState(state: string) {
  return await db
    .select()
    .from(properties)
    .where(eq(properties.state, state));
}

// 按所有者ID获取房产
export async function getPropertiesByOwnerId(ownerId: number) {
  return await db
    .select()
    .from(properties)
    .where(eq(properties.owner_id, ownerId));
}

// 按经纪人ID获取房产
export async function getPropertiesByAgentId(agentId: number) {
  return await db
    .select()
    .from(properties)
    .where(eq(properties.agent_id, agentId));
}

// 获取最新发布的房产
export async function getLatestProperties(limit = 10) {
  return await db
    .select()
    .from(properties)
    .orderBy(desc(properties.release_time))
    .limit(limit);
}

// 获取价格范围内的房产
export async function getPropertiesByPriceRange(minPrice: string, maxPrice: string) {
  return await db
    .select()
    .from(properties)
    .where(
      and(
        gte(properties.price, minPrice),
        lte(properties.price, maxPrice)
      )
    );
}

// 获取房产统计信息
export async function getPropertyStats() {
  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(properties);
    
  const stateCounts = await db
    .select({
      state: properties.state,
      count: sql<number>`count(*)`
    })
    .from(properties)
    .groupBy(properties.state);
    
  const avgPrice = await db
    .select({
      avgPrice: sql<string>`avg(${properties.price})`
    })
    .from(properties);
    
  return {
    totalCount: totalCount[0]?.count || 0,
    stateCounts,
    avgPrice: avgPrice[0]?.avgPrice || '0'
  };
}

// 添加搜索和筛选函数
// export async function searchProperties(filters: any) {
//   let query = db.select().from(properties);
  
//   const conditions = [];
  
//   if (filters.name) {
//     conditions.push(like(properties.name, `%${filters.name}%`));
//   }
  
//   if (filters.status) {
//     conditions.push(eq(properties.status, filters.status));
//   }
  
//   if (filters.minPrice) {
//     conditions.push(gte(properties.price, filters.minPrice));
//   }
  
//   if (filters.maxPrice) {
//     conditions.push(lte(properties.price, filters.maxPrice));
//   }
  
//   if (conditions.length > 0) {
//     query = query.where(and(...conditions));
//   }
  
//   // 添加排序
//   if (filters.sortBy) {
//     const sortField = properties[filters.sortBy as keyof typeof properties];
//     if (sortField) {
//       query = query.orderBy(filters.sortOrder === 'desc' ? desc(sortField) : asc(sortField));
//     }
//   } else {
//     query = query.orderBy(desc(properties.release_time));
//   }
  
//   // 添加分页
//   if (filters.limit) {
//     query = query.limit(filters.limit);
//   }
  
//   if (filters.offset) {
//     query = query.offset(filters.offset);
//   }
  
//   return await query;
// } 