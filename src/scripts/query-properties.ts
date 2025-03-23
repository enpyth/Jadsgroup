import 'dotenv/config';
import { db } from "@/db/index";
import { properties } from "@/db/schema";

async function queryProperties() {
  console.log("Querying properties table...");

  try {
    // 查询所有房产数据
    const allProperties = await db.select().from(properties);
    
    // 打印查询结果
    console.log("Found", allProperties.length, "properties:");
    console.log(JSON.stringify(allProperties, null, 2));
    
    console.log("Query completed successfully!");
  } catch (error) {
    console.error("Error querying properties:", error);
  }

  process.exit(0);
}

queryProperties().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
}); 