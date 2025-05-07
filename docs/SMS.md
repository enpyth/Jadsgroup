# Software Requirements Specification (SRS)  

JADS Group Corporate Website and Property Management System  

## 1. Introduction

### 1.1 Purpose
This document defines the software requirements for the JADS Group Corporate Website, with a special focus on the integrated Property Management System. The purpose is twofold:

- Present JADS Group’s corporate identity, technologies, services, and events to the public
- Provide a secure and efficient platform for managing the end-to-end leasing process through the `/property` page

### 1.2 Intended Audience
This specification is intended for:
- Web developers and designers
- Project managers
- JADS Group administrators and legal staff
- Property owners (lessors) and leasing agents
- Prospective tenants

### 1.3 Scope
The platform will:
- Display company information and services
- Showcase technology and community involvement
- Provide an advanced leasing system accessible via the `/property` route, handling:
  - Public property listings
  - Lease applications
  - Internal review workflows
  - Legal document generation
  - Digital signing and tenant management

---

## 2. Website Structure

| Page Name     | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| Home          | Company introduction, services, news, and call-to-action elements           |
| About Us      | Company background, mission, and leadership team                           |
| Property      | Property listing and application interface for users; internal dashboard for JADS staff |
| Technology    | Overview of JADS' solar and microgrid technologies                          |
| Market Plaza  | Interactive floor map with dynamically updated tenant listings             |
| Events        | JADS-hosted or affiliated events listings                                   |
| Contact Us    | Email-based contact form for public inquiries                               |

### Notes on Pages
- **/property**: Primary entry point for prospective tenants; internal staff can access management tools
- **Market Plaza**: Auto-updated weekly with tenant name, contact, and floor area as lease status changes
- **Contact Us**: Sends inquiry emails directly to JADS admin inbox
- **Home, About Us, Technology, Events**: Content is static, adapted from [jadsgroup.com](https://jadsgroup.com)

---

## 3. Functional Requirements: Property Leasing System

### 3.0 Authentication

All parties involved log in using Google's third-party authentication identity

### 3.1 Property Listings

Users can browse rental property information in list mode and map mode. List mode supports single property rental, and map mode supports multiple property rentals. Property information is based on the property data provided by Jadsgroup.

Prerequisite: Fill in the property data in PropertyTable.xlsx (https://docs.google.com/spreadsheets/d/1IdxSV_yDgJ3VW8OCp8Qb4bUoD-2Uc82BIDE4mroucSI/edit?gid=0#gid=0) to confirm whether there are any added or deleted property attributes.

### 3.2 Lease Application Form

The Application Form is a complete replica of https://www.jadsgroup.com/properties/. The Application Form Submit for JADS to review. JADS can approve or refuse it.

Prerequisite: JADS check whether current Application Form is vaild.

### 3.3 Lease Schedule Form

Use the data in the property and lease tables of the database to fill in the email template provided by Jadsgroup and generate an email, which is automatically sent to the corresponding tenants when JADS Admin approve 3.2 process.

Prerequisite: JADS provide "Lease Schedule Form" template, and specify the email service provider.

### 3.4 Document Mapping and Draft Generation

Use the data from the property and lease tables in the database to fill in the file template provided by Jadsgroup and generate the document include "Agreement to Lease" and "Disclosure Statement"

Prerequisite: JADS provide "Document Mapping" and "Draft Generation" template.

### 3.5 Document revisions

Document revisions of Lease schedule, Agreement to lease and Disclosure Statement. Add version history timestamps or unique document IDs for traceability.

### 3.6 Document Finalization and Signature

The system generates the final “Agreement to Lease” and “Disclosure Statement,” including a draft of the lease contract, which the applicant may e-sign—manually entering their full name and address—before the lessor countersigns and the full document set is sent to JAD’s lawyer to prepare the lease contract.

### 3.7 Post-Lease Features

1. Tenants can view repair information during the lease period.

2. Operation outgoings. This part of data is set by the Jadsgroup administrator in the Dashboard interface.

---

## 4. Non-Functional Requirements

| Area             | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Security         | HTTPS encryption, secure authentication, and role-based access control     |
| Performance      | Target load time < 1 seconds     |
| Usability        | Responsive UI with accessibility support (ARIA standards)                 |
| Compatibility    | Support for Chrome, Firefox, Safari, and Edge                             |
