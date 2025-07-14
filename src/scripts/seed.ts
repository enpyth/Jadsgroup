import "dotenv/config";
// if the dotenv/config not be set, error: DATABASE_URL environment variable is not set
import { db } from "@/db/index";
import { properties, owners, agents, tenants } from "@/db/schema";

async function seed() {
  console.log("Seeding database...");

  // 插入房产所有者数据
  const ownersData = [
    {
      owner_id: 1,
      company: { name: "Willsmere Pty Ltd", acn: "081211111" },
      name: "property owner 1",
      phone: "123-456-7890",
      email: "abc@gmail.com",
      address: "123 Main St, Adelaide, SA 5000",
    },
    {
      owner_id: 2,
      company: { name: "Willsmere Pty Ltd", acn: "081252222" },
      name: "property owner 2",
      phone: "234-567-8901",
      email: "def@gmail.com",
      address: "456 Oak Ave, Adelaide, SA 5000",
    },
  ];
  await db.insert(owners).values(ownersData);

  // 插入房产经纪人数据
  const agentsData = [
    {
      agent_id: 1,
      name: "David Wong",
      phone: "8212 8866",
      email: "david@jadsgroup.com",
      agency_name: "JADSGroup",
    },
    {
      agent_id: 2,
      name: "Andy Wong",
      phone: "8212 8866",
      email: "andy@jadsgroup.com",
      agency_name: "JADSGroup",
    },
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
      photo_identification:
        "https://api.slingacademy.com/public/sample-products/1.png",
    },
    {
      tenant_id: 2,
      name: "Bob White",
      phone: "987-654-3210",
      email: "bob@example.com",
      id_card: "ID987654321",
      abn_lookup: "ABN987654321",
      business_address: "789 Business St",
      photo_identification:
        "https://api.slingacademy.com/public/sample-products/1.png",
    },
  ];
  await db.insert(tenants).values(tenantsData);

  // 插入房产数据
  const propertiesData = [
    {
      owner_id: 1,
      agent_id: 1,
      name: "01",
      unit: "11",
      describe: "placeholder...",
      size: "50.50",
      price: "1200",
      state: "available",
      image: "https://api.slingacademy.com/public/sample-products/1.png",
      detail: {
        volumn: "5532",
        folio: "183",
        address: "61-63 GROTE STREET, ADELAIDE SA 5000",
        office_id: "1A",
        initial_rent: "10,000",
        rent_review_percentage: "4.0"
      },
    },
    {
      owner_id: 2,
      agent_id: 2,
      name: "02",
      unit: "11",
      describe: "placeholder...",
      size: "98.70",
      price: "750",
      state: "available",
      image: "https://api.slingacademy.com/public/sample-products/2.png",
      detail: {
        volumn: "5532",
        folio: "183",
        address: "61-63 GROTE STREET, ADELAIDE SA 5000",
        office_id: "2B",
        initial_rent: "12,000",
        rent_review_percentage: "3.5"
      },
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
