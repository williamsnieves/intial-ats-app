# 🧠 Prompt Structure: LTI ATS App Initialization

## 👤 Role
You are a senior software engineer specialized in:
- Backend: Node.js, Express, TypeScript, Domain-Driven Design (DDD)
- Frontend: React with TypeScript, feature-based layered architecture
- Infrastructure: Docker, PostgreSQL

## 🎯 Objective
Build the initial scaffold of an **Applicant Tracking System (ATS)** application named **"LTI"** that:
1. Implements a **PostgreSQL** database and connects to it via Docker.
2. Uses a **DDD-based backend architecture** using **Express and TypeScript**.
3. Establishes a **React + TypeScript frontend** following a **layered, feature-based architecture**.
4. Integrates backend ↔ database and frontend ↔ backend with a minimal working UI for confirmation.

---

## ❓ Clarifying Questions (Ask Before You Start)
Before implementation, ensure answers to these:

### Domain & Business
- What does **"LTI"** stand for in the context of this ATS?
- What are the key domain entities and their relationships?  
  *(e.g., Candidate, JobPosting, Application, Recruiter?)*
- What minimal data or use-case should be visible in the first version?  
  *(e.g., List job postings, submit application, basic candidate profile view)*

### Technical & Environment
- Should the backend and frontend be in a **monorepo** or **separate repos**?
- Are there preferred ORMs or database libraries (e.g., TypeORM, Prisma)?
- Should we include authentication and role-based access in this initial version?
- Any preferences for CSS/styling libraries on the frontend?
- Should the Docker setup include the full stack (DB, backend, frontend), or just backend + DB?

---

## 🏗️ Project Skeleton Requirements

### 🔧 Docker Setup
- `Dockerfile` and `docker-compose.yml` with services for:
  - **PostgreSQL** with persistent volume
  - **Backend (Node.js + Express)**
  - (Optional) **Frontend (React)**

### 🗄️ Backend (Node.js + Express + TypeScript)
- Structured using **Domain-Driven Design (DDD)**:
  - `/src/domain` – entities, aggregates, value objects
  - `/src/application` – use cases, DTOs, services
  - `/src/infrastructure` – database access, external dependencies
  - `/src/presentation` – routes, controllers, Express setup
  - `/src/config` – DB and env config
- PostgreSQL integration using ORM (e.g., Prisma or TypeORM)
- Implement a sample domain module (e.g., `Candidate`) with basic CRUD

### 🎨 Frontend (React + TypeScript)
- Feature-based, layered folder structure:
  - `/src/features/<feature-name>/components`
  - `/src/features/<feature-name>/pages`
  - `/src/features/<feature-name>/api`
  - `/src/features/<feature-name>/hooks`
- Routing setup (React Router or Next.js)
- Centralized API client (e.g., Axios)
- Display minimal functional page:  
  *(e.g., fetch and display list of job postings or candidates)*

---

## ✅ Deliverables
- A fully functional Dockerized setup with:
  - Backend connected to PostgreSQL
  - Frontend calling backend successfully
- One end-to-end feature flow (e.g., list and create candidate or job posting)
- Git-ready project structure with README and environment setup guide

---

## 🧩 Optional Enhancements
- Code formatting tools: ESLint, Prettier, Husky
- Basic unit testing setup
- Error handling and loading states in frontend
- API documentation (Swagger or Postman collection)

---

## 📘 Prompt Format (Final Usage)
Here’s how the final prompt could be written to generate code:
> "Generate the backend skeleton of the 'LTI' Applicant Tracking System using Node.js, Express, TypeScript with a DDD architecture. Include Dockerized PostgreSQL integration. Implement an example domain 'Candidate' with CRUD functionality. Also scaffold a React frontend with TypeScript using a layered, feature-based structure. Ensure the frontend fetches and displays a list of candidates from the backend. Include Docker Compose setup to run all services together."

---
