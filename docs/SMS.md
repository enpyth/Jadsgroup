# **Software Requirements Specification (SRS)**

**JADS Group Corporate Website and Property Management System**


## **1. Introduction**

### **1.1 Purpose**

This document defines the software requirements for the JADS Group Corporate Website and the integrated Property Management System. The purpose is twofold:

* Present JADS Group’s corporate identity, technologies, services, and events to the public.
* Provide a secure and efficient platform to manage the end-to-end leasing process via the `/property` section.

### **1.2 Intended Audience**

This specification is intended for:

* Web developers and designers
* Project managers
* JADS Group administrators and legal staff
* Property owners (lessors) and leasing agents
* Prospective tenants

### **1.3 Scope**

The platform will serve both public-facing and internal administrative purposes. It will:

* Display corporate information, services, technologies, and events.
* Enable a comprehensive leasing management system accessible via the `/property` route, including:

  * Public property listings (list and map views)
  * Online lease application form and submission
  * Internal multi-role workflow reviews
  * Automated generation of legal documents
  * Digital signing and document tracking
  * Post-lease communications and tenant support


## **2. Website Structure**

| Page Name    | Description                                                                               |
| ------------ | ----------------------------------------------------------------------------------------- |
| Home         | Company introduction, services, latest news, and call-to-action content                   |
| About Us     | Company background, mission statement, and leadership profiles                            |
| Property     | Property listing and application interface for tenants; internal dashboard for JADS staff |
| Technology   | Introduction to JADS Group’s solar and microgrid technologies                             |
| Market Plaza | Interactive floor map with dynamic tenant data based on leasing status                    |
| Events       | List of upcoming and past events hosted or sponsored by JADS                              |
| Contact Us   | Public inquiry form that sends emails to the JADS administrator inbox                     |

### **Notes**

* `/property`: Serves as both a public portal and internal management interface.
* **Market Plaza**: Automatically updates weekly to reflect current tenant occupancy, contact details, and lease areas.
* **Static Content Pages**: Home, About Us, Technology, and Events pages adapt content from [jadsgroup.com](https://jadsgroup.com).


## **3. Functional Requirements: Property Management System**

### **3.0 Authentication**

* All users (admins, lawyers, landlords, tenants) must authenticate using Google Sign-In.
* Manager roles (Admin, Lawyer, Landlord) are pre-configured in the system and are assigned upon setup.


### **3.1 Property Listings**

* Users can browse rental properties in both list view (individual properties) and map view (multi-property visualization).
* Listings are based on data entered in the master property file:
  ➤ [PropertyTable.xlsx](https://docs.google.com/spreadsheets/d/1IdxSV_yDgJ3VW8OCp8Qb4bUoD-2Uc82BIDE4mroucSI/edit?gid=0#gid=0)

**Prerequisite:** JADS must verify that the property data in the spreadsheet is current and complete.


### **3.2 Lease Application Form**

* The form is modeled on [JADS Lease Application](https://www.jadsgroup.com/properties/).

* The application includes the following sections:

  1. Lease Information
  2. Application Details
  3. Entity Details
  4. Assets & Liabilities
  5. Rental History
  6. Trading Experience
  7. Privacy Acknowledgment

* Applicants must input their **company name and ABN**, which is validated using the ABN Lookup API.

* Upon submission, the form enters the JADS Admin Dashboard for approval or rejection.

**Prerequisite:** JADS must confirm that the current application form structure is valid.


### **3.3 Lease Schedule Form**

* Upon approval of a lease application, an email is generated using a JADS-provided template and sent to the tenant.
* The form is auto-filled using data from the property and lease database tables.

**Prerequisite:**

* JADS must provide a standard email template for the Lease Schedule Form.
* The email service provider must be specified (e.g., Gmail API, SendGrid, Mailgun).


### **3.4 Document Mapping and Draft Generation**

* Generates two legal documents:

  * Agreement to Lease (approx. 5 pages)
  * Disclosure Statement (approx. 30 pages)

* Data from the database populates the templates provided by JADS.

* Output formats:

  * **Preview**
  * **Download**
  * **Upload a revised version**

* All monetary values must include both numeric and **auto-generated textual descriptions** (e.g., "\$10,000 (Ten Thousand Dollars)").

* The system updates the Tenant List and appends floor plans with labels.

**Prerequisite:** JADS must provide:

* Templates for the “Agreement to Lease” and “Disclosure Statement”
* Sample document mappings


### **3.5 Document Revisions**

* All document types support revision tracking.
* The system stores **version history with timestamps** and/or unique document IDs.


### **3.6 Document Finalization and E-signature**

* The final version of each document can be e-signed by the applicant.
* Signature requirements:

  * Full name (typed)
  * Address (typed)
* After applicant signs, the lessor reviews and countersigns.
* The finalized documents are then forwarded to JADS lawyers to prepare the lease contract.


### **3.7 Post-Lease Features**

1. **Maintenance & Repairs**:
   Tenants can view and track property repair records and status updates.

2. **Operating Outgoings**:

   * Admin can set monthly outgoings (e.g., utilities, strata) via the Dashboard.
   * Tenants receive automated monthly email reminders.



## **4. Non-Functional Requirements**

| Area            | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| Security        | HTTPS, secure OAuth login (Google), role-based access, and audit logging |
| Performance     | Target page load time < 1 second under normal network conditions         |
| Usability       | Responsive UI, support for screen readers (ARIA), mobile-first design    |
| Compatibility   | Full support for Chrome, Firefox, Safari, Edge (latest two versions)     |
| Maintainability | Modular architecture with clean code and technical documentation         |
| Auditability    | All key actions logged with user ID and timestamps for traceability      |
| Scalability     | Designed to scale with property count and concurrent users               |


