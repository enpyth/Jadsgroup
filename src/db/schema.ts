import {
  integer,
  decimal,
  pgTable,
  serial,
  text,
  timestamp,
  date,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";
// 业主表
export const owners = pgTable("owners", {
  owner_id: serial("owner_id").primaryKey(),
  company: jsonb("company").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// 中介表
export const agents = pgTable("agents", {
  agent_id: serial("agent_id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  agency_name: text("agency_name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// 房产表
export const properties = pgTable("properties", {
  property_id: serial("property_id").primaryKey(),
  owner_id: integer("owner_id")
    .notNull()
    .references(() => owners.owner_id),
  agent_id: integer("agent_id")
    .notNull()
    .references(() => agents.agent_id),
  name: text("name").notNull(),
  unit: text("unit").notNull(),
  describe: text("describe").notNull(),
  size: text("size").notNull(),
  price: text("price").notNull(),
  state: text("state").notNull().default("available"),
  image: text("image").default("placeholder.jpg"),
  detail: jsonb("detail").notNull(),
  release_time: timestamp("release_time").defaultNow().notNull(),
});

// 租户表
export const tenants = pgTable("tenants", {
  tenant_id: serial("tenant_id"),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().primaryKey(),
  id_card: text("id_card").notNull(),
  abn_lookup: text("abn_lookup"),
  business_address: text("business_address"),
  photo_identification: text("photo_identification"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// 租约表
export const leases = pgTable("leases", {
  lease_id: serial("lease_id").primaryKey(),
  property_id: integer("property_id")
    .notNull()
    .references(() => properties.property_id),
  tenant_email: text("tenant_email")
    .notNull()
    .references(() => tenants.email),
  terms: text("terms").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  rent_amount: text("rent_amount").notNull(),
  deposit_amount: text("deposit_amount").notNull(),
  state: jsonb("state").notNull(),
  agreement_to_lease: text("agreement_to_lease").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  application_data: jsonb("application_data"),
  updated_at: timestamp("updated_at").defaultNow(),
});

// 合作工人表
export const coWorkers = pgTable("co_workers", {
  coworker_id: serial("coworker_id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  specialization: text("specialization").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// 审核记录表
export const reviewRecords = pgTable("review_records", {
  review_id: serial("review_id").primaryKey(),
  lease_id: integer("lease_id")
    .notNull()
    .references(() => leases.lease_id),
  content: text("content").notNull(),
  reviewer: text("reviewer").notNull(),
  review_date: timestamp("review_date").notNull(),
});

// 维修请求表
export const maintenanceRequests = pgTable("maintenance_requests", {
  request_id: serial("request_id").primaryKey(),
  lease_id: integer("lease_id")
    .notNull()
    .references(() => leases.lease_id),
  issue_description: text("issue_description").notNull(),
  state: varchar("state", { length: 50 }).notNull().default("pending"),
  request_date: timestamp("request_date").notNull(),
  coworker_id: integer("coworker_id").references(() => coWorkers.coworker_id),
});

// 支出表
export const outgoings = pgTable("outgoings", {
  outgoing_id: serial("outgoing_id").primaryKey(),
  lease_id: integer("lease_id")
    .notNull()
    .references(() => leases.lease_id),
  records: jsonb("records").notNull(),
  invoice_id: text("invoice_id").default(""),
  invoice_img: text("invoice_img").default("placeholder.jpg"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
