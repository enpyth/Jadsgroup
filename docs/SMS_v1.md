# **Software Requirements Specification (SRS)**

**JADS Group Corporate Website and Property Management System**


## **1. Introduction**

### **1.1 Purpose**

This document defines the software requirements for the JADS Group Corporate Website and the integrated Property Management System. The purpose is twofold:

* Present JADS Group's corporate identity, technologies, services, and events to the public.
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
| Technology   | Introduction to JADS Group's solar and microgrid technologies                             |
| Market Plaza | Interactive floor map with dynamic tenant data based on leasing status                    |
| Events       | List of upcoming and past events hosted or sponsored by JADS                              |
| Contact Us   | Public inquiry form that sends emails to the JADS administrator inbox                     |

### **Notes**

* `/property`: Serves as both a public portal and internal management interface.
* **Market Plaza**: Automatically updates weekly to reflect current tenant occupancy, contact details, and lease areas.
* **Static Content Pages**: Home, About Us, Technology, and Events pages adapt content from [jadsgroup.com](https://jadsgroup.com).


## **3. Functional Requirements: Property Management System**

### **3.1 Authentication**

* All users (admins, lawyers, landlords, tenants) can login and sign up by Google account, or use email verification code.
* Manager roles (Admin, Lawyer, Landlord) are pre-configured in the system and are assigned upon setup.

![alt text](image-1.png)

### **3.2 Property Listings**

* Users can browse rental properties in list view.

* Listings properties content are based on data provided by Jadsgroup.

![alt text](image.png)
### **3.3 Lease Application Form**

* The form is modeled on [JADS Lease Application](https://www.jadsgroup.com/properties/).

* The application includes the following sections:

  1. Lease Information
  2. Application Details
  3. Entity Details
  4. Assets & Liabilities
  5. Rental History
  6. Trading Experience
  7. Privacy Acknowledgment

![alt text](image-2.png)

* Applicants must input their **company name and ABN**, which is validated using the ABN Lookup API.

* Upon submission, the form enters the JADS Admin Dashboard for approval or rejection.

![alt text](image-4.png)

### **3.4 Document Mapping and Draft Generation**

The website provides the function of automatically generating contract documents, which can support filling the user application form data (data come from 3.3) and properties data (provided by Jadsgroup) into the template and generate the following three documents.

  * Lease Schedule (approx. 3 pages)
  * Agreement to Lease (approx. 5 pages)
  * Disclosure Statement (approx. 30 pages)

During the document generation process, the website performs some optimization work for the document.

  * All monetary values must include both numeric and **auto-generated textual descriptions** (e.g., "\$10,000 (Ten Thousand Dollars)").
  * The system updates the Tenant List and appends floor plans with labels.

These automatically generated documents are downloaded by relevant personnel to their work environment, signed and uploaded to this system for archiving.

![alt text](image-7.png)
![alt text](image-3.png)

### **3.5 Document Revisions**

* All document types support revision tracking.
* The system stores **version history with timestamps** and/or unique document IDs.

### **3.6 Post-Lease Features**

1. **Maintenance & Repairs**:
  
    Tenants can view contact details for property maintenance.

![alt text](image-5.png)

2. **Operating Outgoings**:

    * Admin can edit outgoings (e.g., utilities, strata) for each active properties contract via the Dashboard. The outgoings format should be provided by Jadsgroup.

![alt text](image-6.png)

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

## **5. Deployment and Infrastructure**

### **5.1 Hosting Platform**

The website will be deployed using Vercel, which provides:

* Automatic deployments from Git repository
* Global CDN for optimal performance
* Serverless functions support
* Environment variable management
* Preview deployments for pull requests
* Automatic SSL/TLS certificates

### **5.2 Database Infrastructure**

The system will utilize two cloud databases:

1. **Cloudflare R2**
   * Used for storing and serving static assets
   * Document storage and versioning
   * Backup storage
   * Benefits:
     - Zero egress fees
     - Global edge caching
     - S3-compatible API

2. **Neon PostgreSQL**
   * Primary database for all application data
   * Benefits:
     - Serverless PostgreSQL
     - Automatic scaling
     - Branching for development
     - Point-in-time recovery
     - Built-in connection pooling
