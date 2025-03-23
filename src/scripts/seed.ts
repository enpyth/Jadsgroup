import 'dotenv/config';
// if the dotenv/config not be set, error: DATABASE_URL environment variable is not set
import { db } from "@/db/index";
import { properties, owners, agents, tenants } from "@/db/schema";

async function seed() {
  console.log("Seeding database...");

  // 插入房产所有者数据
  const ownersData = [
    { owner_id: 1, name: "John Smith", phone: "123-456-7890", email: "john@example.com", address: "123 Main St" },
    { owner_id: 2, name: "Sarah Johnson", phone: "234-567-8901", email: "sarah@example.com", address: "456 Oak Ave" },
    { owner_id: 3, name: "Michael Brown", phone: "345-678-9012", email: "michael@example.com", address: "789 Pine Rd" },
    { owner_id: 4, name: "Emma Davis", phone: "456-789-0123", email: "emma@example.com", address: "101 Maple Dr" },
  ];
  await db.insert(owners).values(ownersData);

  // 插入房产经纪人数据
  const agentsData = [
    { agent_id: 1, name: "David Wilson", phone: "567-890-1234", email: "david@realestate.com", agency_name: "Wilson Realty" },
    { agent_id: 2, name: "Lisa Thompson", phone: "678-901-2345", email: "lisa@realestate.com", agency_name: "Thompson Properties" },
    { agent_id: 3, name: "Robert Miller", phone: "789-012-3456", email: "robert@realestate.com", agency_name: "Miller Real Estate" },
  ];
  await db.insert(agents).values(agentsData);

  // 插入租户数据
  const tenantsData = [
    {
      tenant_id: 1,
      name: "Alice Green",
      phone: "321-654-0987",
      email: "alice@example.com",
      id_card: "ID123456789",
      abn_lookup: "ABN123456789",
      business_address: "456 Business Rd",
      photo_identification: "https://api.slingacademy.com/public/sample-products/1.png",
    },
    {
      tenant_id: 2,
      name: "Bob White",
      phone: "987-654-3210",
      email: "bob@example.com",
      id_card: "ID987654321",
      abn_lookup: "ABN987654321",
      business_address: "789 Business St",
      photo_identification: "https://api.slingacademy.com/public/sample-products/1.png",
    },
  ];
  await db.insert(tenants).values(tenantsData);

  // 插入房产数据
  const propertiesData = [
    {
      owner_id: 1,
      agent_id: 1,
      name: "10A",
      describe: "placeholder...",
      size: "15.5",
      price: "1200",
      state: "available",
      image: "https://api.slingacademy.com/public/sample-products/1.png",
    },
    {
      owner_id: 1,
      agent_id: 2,
      name: "15B",
      describe: "placeholder...",
      size: "8.2",
      price: "750",
      state: "available",
      image: "https://api.slingacademy.com/public/sample-products/2.png",
    },
    {
      owner_id: 2,
      agent_id: 1,
      name: "22C",
      describe: "placeholder...",
      size: "12.8",
      price: "980",
      state: "sold",
      image: "https://api.slingacademy.com/public/sample-products/3.png",
    }, {
      property_id: 10,
      owner_id: 2,
      agent_id: 1,
      name: "22C",
      describe: "placeholder...",
      size: "12.8",
      price: "980",
      state: "sold",
      image: "https://api.slingacademy.com/public/sample-products/3.png",
    },
  ];
  await db.insert(properties).values(propertiesData);

  console.log("Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
