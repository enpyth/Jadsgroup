## JADS Group Real Estate Platform Development Plan

### Project Overview

This project aims to build an integrated real estate platform for JADS Group, covering five core modules: corporate website showcase, user rental workflows, internal approval and document generation, contract signing and post-leasing management, financial system integration, and data closed-loop. The phased development plan is as follows:

---

### V1 – Corporate Website Framework & Static Pages

**Objectives:**

- Establish the foundational architecture for the real estate platform.
- Complete Home, About Us, Technology, Events, Contact Us static pages in English.
- Implement responsive design compatible with desktop, tablet, and mobile.
- Integrate basic SEO optimization for enhanced search engine visibility.
- Optimize page load time to achieve an average response time under 1s for static content.
- Market Plaza tenant data updated every 2 weeks.
- Property listing supports List view.
- Complete the design and deliver a prototype of the property leasing workflow.
- Develop a property management dashboard supporting property and leasing process management, using preset data.
- Ensure deployment and version control pipelines via Vercel and Git integration.

---

### V2 – Leasing System Development

**Objectives:**

- Complete Home, About Us, Technology, Events, Contact Us static pages in both English and Chinese.
- Market Plaza tenant data updated daily.
- Property listing supports both List and Map view.
- Official launch of the property leasing workflow.
- Manage property and leasing processes through a dashboard, with customer-configurable data.
- Implement post-leasing service workflows (repairs, termination, renewal, etc.).

---

### V3 – Financial System Integration & Data Closed-Loop

**Objectives:**

- Develop financial module: billing, payments, invoicing, reconciliation functions.
- Integrate third-party payment platforms (e.g. PayPal, Stripe).
- Develop a data closed-loop analytics system.
- Implement finance dashboards for operational insights.
- Strengthen security and role-based access control for financial transactions.

---

### 📊 Deliverables Table (by Task Type & Version)

| **Task Type**  | **Feature**                                                             | **V1**                      | **V2**                      | **V3**                                |
| -------------- | ----------------------------------------------------------------------- | --------------------------- | --------------------------- | ------------------------------------- |
| Web Pages      | Pages Language support (Home, About Us, Technology, Events, Contact Us) | English                     | English / Chinese           | English / Chinese                     |
| Web Pages      | Design mode                                                             | Replicated by jadsgroup.com | Replicated by jadsgroup.com | Redesigned by designer                |
| Web Pages      | Market Plaza Tenant Data Update Frequency                               | Every 2 weeks               | Daily                       | Daily                                 |
| Property       | OAuth                                                                   | Google                      | Google / Email              | Google / Email / Instagram / Facebook |
| Property       | Property Listing                                                        | List                        | List / Map                  | List / Map                            |
| Property       | Workflow                                                                | Prototype                   | Official                    | Official                              |
| Property       | Data Management                                                         | Preset                      | Configurable                | Configurable                          |
| Property       | Post-Leasing Service                                                    | ❌                           | ✅                           | ✅                                     |
| Finance System | Integration with Frappe                                                 | ❌                           | ❌                           | ✅                                     |

---

### Development Tools & Tech Stack

- Next.js / React / Tailwind CSS
- Vercel deployment
- Neon PostgreSQL database, Cloudflare R2 storage
- Third-party OAuth such as Google

---

### Team Structure

Tutu, Project Manager\
Qiaoyu, Account Manager\
Zhang Su, Developer

---

> This development plan will be continuously iterated and refined according to project progress to ensure efficient development and stable delivery.

