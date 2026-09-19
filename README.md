# 🚀 Leadyfy OS

> **Agency Management & Operations SaaS Prototype**

Leadyfy OS is a full-stack web application prototype designed for **UGC and Digital Marketing Agency operations**.

The platform centralizes the agency workflow into a single system, covering clients, orders, scripts, creators, shoots, video production, client approvals, and delivery.

---

## 📌 Project Overview

Leadyfy OS manages the complete operational lifecycle:

**Client → Onboarding → Order → Scripting → Creator Match → Shoot → Editing → Client Review → Revision → Final Delivery**

This prototype focuses on demonstrating the core operational workflow, secure authentication, role-based access control, and a scalable full-stack architecture.

---

## 🎯 Business Problem

UGC and digital marketing agencies often manage operations across:

* Spreadsheets
* WhatsApp conversations
* Separate tools
* Manual tracking
* Multiple communication channels

This can make it difficult to track clients, orders, scripts, creators, shoots, videos, approvals, and payments in one place.

**Leadyfy OS** provides a centralized platform for managing these operations.

---

## 🔄 Core Workflow

```text
Client
  ↓
Onboarding
  ↓
Order / Package
  ↓
Script
  ↓
Creator Assignment
  ↓
Shoot
  ↓
Video Editing
  ↓
Internal QA
  ↓
Client Review
  ↓
Revision
  ↓
Final Approval
  ↓
Delivery
```

---

## ✨ Features

### Authentication

* User login
* JWT-based authentication
* Password encryption
* Protected APIs
* Role-based authorization

### Dashboard

* Active clients
* Active orders
* Pending scripts
* Upcoming shoots
* Video production status
* Pending approvals
* Tasks
* Payment information

### Client Management

* Add client
* Edit client
* View client
* Delete client
* Client status management
* Company and business information

### Order Management

* Create packages/orders
* Track contracted video count
* Track received amount
* Track outstanding balance
* Track order status

### Script Management

```text
Draft
→ Assigned
→ In Review
→ Sent to Client
→ Revision Required
→ Approved
→ Ready for Shoot
```

### Creator Management

* Creator profiles
* Languages
* Location
* Niches
* Rates
* Availability
* Assignment to scripts/shoots

### Shoot Management

* Schedule shoots
* Assign creators
* Assign team members
* Track shoot status
* Pre-shoot checklist
* Post-shoot verification

### Video Production

```text
Shoot Pending
→ Raw Footage Received
→ Video Editing
→ Internal QA
→ Client Review
→ Revision
→ Final Approved
→ Delivered
```

### Client Portal

* View assigned orders
* Review scripts
* Approve scripts
* Provide feedback
* Review videos
* Request revisions
* Approve final videos
* Access delivery links

### Tasks & Notifications

* Task assignment
* Priority tracking
* Deadlines
* In-app notifications
* Activity tracking

---

# 🛠 Tech Stack

## Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Security
* JWT
* Bean Validation
* MySQL
* Lombok
* Maven

## Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Bootstrap
* CSS

## Development Tools

* IntelliJ IDEA / Eclipse / STS
* VS Code
* Postman
* Git
* GitHub

---

# 🏗 Backend Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Entity
    ↓
MySQL
```

### Suggested Package Structure

```text
com.leadyfy.os
│
├── config
├── controller
├── dto
├── entity
├── repository
├── service
├── security
│   ├── JwtAuthFilter
│   ├── JwtUtils
│   └── CustomUserDetailsService
├── exception
└── LeadyfyOsApplication
```

The architecture separates API handling, business logic, database access, and security concerns.

---

# 🎨 Frontend Architecture

```text
React Application
│
├── components
├── pages
├── layouts
├── services
├── redux
│   ├── store
│   └── slices
├── routes
└── utils
```

### Main Pages

```text
Login
Dashboard
Clients
Orders
Scripts
Creators
Shoots
Videos
Tasks
Payments
Client Portal
```

---

# 🔐 JWT Authentication Flow

```text
User Login
    ↓
POST /api/auth/login
    ↓
Spring Security Authentication
    ↓
Validate Username + Password
    ↓
Generate JWT
    ↓
Return Token
    ↓
Frontend Stores Token
    ↓
Axios Adds JWT to Request Header
    ↓
JwtAuthFilter
    ↓
Validate JWT
    ↓
Set SecurityContext
    ↓
Protected API
```

Example header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 👥 Role-Based Access Control

Leadyfy OS supports four primary roles:

| Role     | Access                     |
| -------- | -------------------------- |
| OWNER    | Full system access         |
| ADMIN    | Operational administration |
| EMPLOYEE | Assigned modules/tasks     |
| CLIENT   | Isolated client portal     |

### OWNER

* Full dashboard
* Clients
* Employees
* Creators
* Orders
* Scripts
* Shoots
* Videos
* Financial information
* System configuration

### ADMIN

* Client operations
* Orders
* Scripts
* Shoots
* Creator assignments
* Tasks
* Operational reports

### EMPLOYEE

Access is restricted according to assigned responsibilities.

### CLIENT

Clients can access only their own:

* Orders
* Scripts
* Videos
* Feedback
* Approvals
* Delivery links
* Invoices/support

Clients must not access internal creators, costs, or internal agency information.

---

# 🗄 Database Entities

Core entities include:

```text
User
Role
Employee
Client
Order
Script
Creator
CreatorAvailability
Shoot
Video
VideoFeedback
Task
Payment
Expense
CreatorPayout
Notification
SupportTicket
ActivityLog
Asset
```

### Core Relationships

```text
Client
  ├── Orders
  │     ├── Scripts
  │     ├── Shoots
  │     └── Videos
  │
  └── Payments

Script
  └── Creator

Shoot
  └── Creator

Video
  ├── Script
  ├── Creator
  ├── Shoot
  └── VideoFeedback
```

The specification identifies these as the normalized core entities for the system.

---

# 🌐 API Overview

### Authentication

```http
POST /api/auth/login
POST /api/auth/register
```

### Clients

```http
GET    /api/clients
GET    /api/clients/{id}
POST   /api/clients
PUT    /api/clients/{id}
DELETE /api/clients/{id}
```

### Orders

```http
GET    /api/orders
GET    /api/orders/{id}
POST   /api/orders
PUT    /api/orders/{id}
PATCH  /api/orders/{id}/status
```

### Scripts

```http
GET    /api/scripts
POST   /api/scripts
PUT    /api/scripts/{id}
PATCH  /api/scripts/{id}/status
```

### Creators

```http
GET    /api/creators
POST   /api/creators
PUT    /api/creators/{id}
```

### Shoots

```http
GET    /api/shoots
POST   /api/shoots
PUT    /api/shoots/{id}
PATCH  /api/shoots/{id}/status
```

### Videos

```http
GET    /api/videos
POST   /api/videos
PUT    /api/videos/{id}
PATCH  /api/videos/{id}/status
```

### Client Approval

```http
POST /api/videos/{id}/approve
POST /api/videos/{id}/revision
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
cd leadyfy-os
```

## 2. Backend Setup

```bash
cd backend
```

Configure MySQL and update the environment variables.

Run:

```bash
mvn clean install
```

Start the application:

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

## 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000
```

---

# 🔑 Environment Variables

### Backend

Create an environment configuration with:

```env
DB_URL=jdbc:mysql://localhost:3306/leadyfy_os
DB_USERNAME=root
DB_PASSWORD=your_password

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRATION=86400000
```

### Frontend

```env
REACT_APP_API_URL=http://localhost:8080/api
```

> Never commit real passwords, JWT secrets, API keys, or production credentials to GitHub.

---

# 👤 Demo Credentials

> Replace these credentials with the actual credentials configured in your prototype.

| Role     | Email                                               | Password   |
| -------- | --------------------------------------------------- | ---------- |
| Owner    | [owner@leadyfy.com](mailto:owner@leadyfy.com)       | `********` |
| Admin    | [admin@leadyfy.com](mailto:admin@leadyfy.com)       | `********` |
| Employee | [employee@leadyfy.com](mailto:employee@leadyfy.com) | `********` |
| Client   | [client@leadyfy.com](mailto:client@leadyfy.com)     | `********` |

---

# 📸 Screenshots

Add screenshots of the following modules:

### Login

```text
[ Add Login Screenshot Here ]
```

### Dashboard

```text
[ Add Dashboard Screenshot Here ]
```

### Client Management

```text
[ Add Client Screenshot Here ]
```

### Video Pipeline

```text
[ Add Video Pipeline Screenshot Here ]
```

### Client Portal

```text
[ Add Client Portal Screenshot Here ]
```

---

# ⚠️ Known Limitations

This submission is a **24-hour prototype**, therefore some production-level functionality is intentionally limited.

Current limitations may include:

* Advanced financial reporting
* Complete expense management
* Advanced creator payout automation
* Advanced notification infrastructure
* Complete support-ticket workflows
* Advanced audit logging
* Production cloud storage automation
* Advanced analytics
* Automated deployment infrastructure
* Comprehensive automated test coverage

These areas are planned for subsequent development phases.

---

# 🚀 Future Improvements

* Advanced financial dashboards
* Creator payout automation
* Expense management
* Advanced reporting and analytics
* Google Drive/cloud storage integration
* Email/WhatsApp notifications
* Real-time notifications
* Advanced audit logging
* Automated database backups
* CI/CD pipeline
* Docker production deployment
* Comprehensive unit and integration testing
* Advanced permission management
* Multi-tenant architecture enhancements

---

# ⏱️ 24-Hour Prototype Scope

The prototype was developed with a time-boxed approach.

### Priority 1 — Security

* JWT authentication
* Password encryption
* RBAC
* Protected APIs

### Priority 2 — Core Operations

* Clients
* Orders
* Scripts
* Creators
* Shoots
* Videos

### Priority 3 — End-to-End Workflow

```text
Client
→ Order
→ Script
→ Creator
→ Shoot
→ Video
→ Client Review
→ Approval / Revision
→ Delivery
```

### Priority 4 — Frontend

* Dashboard
* CRUD screens
* Production pipeline
* Client portal
* API integration

---

# 🎯 Prototype Philosophy

> **This prototype prioritizes the core operational lifecycle and security foundation. Remaining advanced financial, reporting, support, audit and production-hardening functionality is planned as subsequent development phases.**

The original specification itself uses phased implementation: audit/architecture, core fixes and RBAC, operational modules, client portal, financials/reporting, and finally QA/security/deployment.

---

# 📋 Critical Technical Note

The specification identifies a known **Client Creation schema mismatch** involving:

```text
Frontend Form
      ↓
API Payload
      ↓
Database Model
      ↓
company / company_name
```

The prototype should maintain a consistent API property such as:

```json
{
  "companyName": "Example Company"
}
```

with the database mapping:

```java
@Column(name = "company_name")
private String companyName;
```

The required verification path is:

```text
Add Client Form
→ API Payload
→ DB Insertion
→ Client Listing
→ Client Profile
→ Edit Client
→ Associated Order Pipeline
```

---

# 📄 License

This project was developed as a technical assignment/prototype.

For evaluation and demonstration purposes only.

---

# 👨‍💻 Author

**Prasant Singh**

Java Full Stack Developer

* Java
* Spring Boot
* Spring Security
* React.js
* Redux
* MySQL

---

## ⭐ Conclusion

Leadyfy OS demonstrates a full-stack approach to building an agency operations platform with:

* Secure authentication
* RBAC
* REST APIs
* Relational database design
* React frontend
* Operational workflow management
* Client portal
* End-to-end production lifecycle

The architecture is designed so that the remaining advanced modules can be extended in subsequent development phases.
