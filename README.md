# LTI ATS - Lead Talent Intelligence Applicant Tracking System

A modern, full-stack Applicant Tracking System built with Domain-Driven Design principles.

## 🏗️ Architecture

### Backend
- **Framework**: Node.js + Express + TypeScript
- **Architecture**: Domain-Driven Design (DDD)
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful API with proper error handling

### Frontend
- **Framework**: React + TypeScript
- **Architecture**: Feature-based layered structure
- **Styling**: Tailwind CSS
- **State Management**: React Query + Context API

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL 15
- **Development**: Hot reload for both frontend and backend

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- Git

### Setup
1. Clone the repository
```bash
git clone <your-repo>
cd lti-ats-app
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm run setup
```

This will:
- Install all dependencies
- Start PostgreSQL in Docker
- Run database migrations
- Start both backend and frontend in development mode

### Individual Services
```bash
# Start only database
npm run docker:up

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Start both frontend and backend
npm run dev
```

## 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Database**: postgresql://lti_user:lti_password@localhost:5432/lti_ats

## 📁 Project Structure

```
lti-ats-app/
├── packages/
│   ├── backend/                 # Node.js + Express + TypeScript
│   │   ├── src/
│   │   │   ├── domain/         # Domain entities, aggregates, value objects
│   │   │   ├── application/    # Use cases, DTOs, services
│   │   │   ├── infrastructure/ # Database, external dependencies
│   │   │   ├── presentation/   # Routes, controllers, Express setup
│   │   │   └── config/         # Configuration files
│   │   ├── prisma/            # Database schema and migrations
│   │   └── Dockerfile
│   └── frontend/               # React + TypeScript
│       ├── src/
│       │   ├── features/      # Feature-based modules
│       │   ├── shared/        # Shared components and utilities
│       │   ├── api/          # API client configuration
│       │   └── App.tsx
│       └── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🎯 Core Features (Initial Version)

### Candidates Management
- List all candidates
- Create new candidates
- View candidate details
- Update candidate information

### Job Postings
- List job postings
- Create new job postings
- View job details

### Applications
- Link candidates to job postings
- Track application status

## 🛠️ Development

### Database Operations
```bash
# Generate Prisma client
npm run db:generate --workspace=packages/backend

# Run migrations
npm run db:migrate --workspace=packages/backend

# Reset database
npm run db:reset --workspace=packages/backend

# Open Prisma Studio
npm run db:studio --workspace=packages/backend
```

### Docker Operations
```bash
# Rebuild and start services
npm run docker:build

# Stop all services
npm run docker:down

# View logs
docker-compose logs -f [service-name]
```

## 🧪 Testing
```bash
# Run backend tests
npm run test --workspace=packages/backend

# Run frontend tests
npm run test --workspace=packages/frontend
```

## 📝 API Documentation

The API follows RESTful conventions:
- `GET /api/candidates` - List candidates
- `POST /api/candidates` - Create candidate
- `GET /api/candidates/:id` - Get candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate

Similar patterns for job postings and applications.

## 🤝 Contributing

1. Follow the established DDD patterns in the backend
2. Use the feature-based structure in the frontend
3. Write tests for new functionality
4. Follow TypeScript strict mode guidelines
5. Use meaningful commit messages

## 📄 License

MIT License - see LICENSE file for details. 