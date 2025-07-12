import 'dotenv/config';
import { db } from "@/db/index";
import { owners, agents, properties, tenants, coWorkers, leases, reviewRecords, maintenanceRequests, outgoings } from "../db/schema";

// 创建数据库连接

// 删除所有表的函数
async function cleanupDatabase() {
  await db.delete(outgoings);
  await db.delete(maintenanceRequests);
  await db.delete(reviewRecords);
  await db.delete(leases);
  await db.delete(coWorkers);
  await db.delete(properties);
  await db.delete(tenants);
  await db.delete(agents);
  await db.delete(owners);
}

// 执行清理
cleanupDatabase()
  .then(() => {
    console.log("所有表已成功删除。");
  })
  .catch((error) => {
    console.error("删除表时出错:", error);
  });