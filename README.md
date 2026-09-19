# 🚀 Leadyfy OS

### UGC & Digital Marketing Agency Operations SaaS — Prototype

Leadyfy OS is a full-stack prototype designed to centralize UGC and Digital Marketing agency operations, from client onboarding to final video delivery.

---

## 🎯 Business Problem

Agency workflows are often distributed across spreadsheets, communication tools, and separate production systems.

Leadyfy OS provides one platform to manage:

* Clients & Orders
* Scripts
* Creators
* Shoots
* Video Production
* Client Reviews & Revisions
* Payments
* Tasks & Notifications

---

## 🔄 Core Workflow

```text
Client
 → Order
 → Script
 → Creator
 → Shoot
 → Editing
 → Client Review
 → Revision
 → Approval
 → Delivery
```

---

## ✨ Key Features

* 🔐 JWT Authentication
* 👥 Role-Based Access Control
* 📊 Operational Dashboard
* 👤 Client Management
* 📦 Order & Package Management
* 📝 Script Workflow
* 🎭 Creator Management
* 📅 Shoot Scheduling
* 🎥 Video Production Pipeline
* 💬 Client Approval & Revision
* 💰 Basic Payment Tracking
* 🔔 Notifications & Tasks
* 📝 Activity Tracking

The four main roles are **Owner, Admin, Employee, and Client**, with the Client having an isolated portal.

---

## 🏗️ Architecture

### Backend

```text
React
  ↓
REST API
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
JPA / Hibernate
  ↓
MySQL
```

### Frontend

```text
React
 ├── Pages
 ├── Components
 ├── Routing
 ├── State Management
 └── API Services
```

---

## 🛠️ Tech Stack

**Backend:** Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL, Maven

**Frontend:** React.js, JavaScript/TypeScript, React Router, Axios, Redux/Context API

**Tools:** Git, GitHub, Postman, VS Code

---

## 🔐 Authentication & RBAC

```text
Login
 ↓
Validate Credentials
 ↓
Generate JWT
 ↓
Authorization Header
 ↓
JwtAuthFilter
 ↓
Validate Token
 ↓
SecurityContext
 ↓
Protected API
```

| Role     | Access            |
| -------- | ----------------- |
| Owner    | Full system       |
| Admin    | Operations        |
| Employee | Assigned modules  |
| Client   | Own client portal |

---

## 🗄️ Core Entities

```text
User
Employee
Client
Order
Script
Creator
Shoot
Video
VideoFeedback
Task
Payment
Notification
ActivityLog
```

---

## 🌐 Main APIs

```text
POST   /api/auth/login

GET    /api/clients
POST   /api/clients
PUT    /api/clients/{id}

GET    /api/orders
POST   /api/orders

GET    /api/scripts
POST   /api/scripts

GET    /api/creators
POST   /api/creators

GET    /api/shoots
POST   /api/shoots

GET    /api/videos
POST   /api/videos

POST   /api/videos/{id}/approve
POST   /api/videos/{id}/revision
```

---

## ⚙️ Setup

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Configure MySQL and environment variables before running.

```env
DB_URL=jdbc:mysql://localhost:3306/leadyfy_os
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret
JWT_EXPIRATION=86400000
```

---

## 📸 Screenshots

Add screenshots here:

* Login
* Dashboard
* Client Management
* Video Pipeline
* Client Portal

---

## ⚠️ Known Limitations

This is a **24-hour prototype**, so advanced production features such as complete financial reporting, advanced audit infrastructure, production deployment hardening, and comprehensive automated testing are not fully implemented.

---

## ⏱️ 24-Hour Prototype Scope

The development priority was:

1. Authentication & RBAC
2. Client & Order Management
3. Script & Creator Workflow
4. Shoot & Video Pipeline
5. Client Review & Approval
6. API Integration & Testing
7. Documentation

---

## 🎯 Key Technical Highlight

A critical Client Creation schema issue was addressed by maintaining consistent mapping between the frontend/API `companyName` field and the database `company_name` column.

---

## 🚀 Future Improvements

* Advanced financial reporting
* Creator payout automation
* Real-time notifications
* Advanced audit logging
* Cloud storage integration
* CI/CD & production deployment
* Comprehensive automated testing

---

## 💡 Prototype Statement

> **This prototype prioritizes the core operational lifecycle and security foundation. Remaining advanced financial, reporting, support, audit and production-hardening functionality is planned as subsequent development phases.**

---

## 👨‍💻 Author

**Prasant Singh**
Java Full Stack Developer

`Java` `Spring Boot` `Spring Security` `JWT` `React.js` `MySQL` `REST API`
