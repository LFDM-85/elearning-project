# 🎓 Elearning Management System

A Full-stack project developed with **NestJS** and **React**, designed to be a functional demonstration environment for practicing **Docker Swarm** and **Kubernetes**.

The system allows for the management of courses, lectures, students, and professors, featuring robust authentication and Role-Based Access Control (RBAC).

---

## 🚀 Quick Start

### 1. Requirements
- Docker and Docker Compose
- Node.js v18+ (optional for local execution)

### 2. Automatic Setup (Recommended)
To spin up the entire environment (Database, Backend, Frontend, and Mock Data), run the script in the root directory:
```bash
chmod +x start-all.sh
./start-all.sh
```

### 3. Docker Compose Setup
If you prefer using only Docker:
```bash
docker-compose up --build
```
*Once the containers are up, run the seed script in the backend to populate the data:*
```bash
cd Backend-main && npm install && node seed.js
```

---

## 🔑 Demonstration Credentials (Mock Data)

The system is pre-configured with test data via the `seed.js` script:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@admin.com` | `qwertyuiop` | Full access to the management panel. |
| **Professor** | `prof1@elearning.com` | `professorpassword` | Course and lecture management. |
| **Student** | `student1@elearning.com` | `studentpassword` | View courses and grades. |

> **Tip:** On the Login page, use the **"Admin Demonstration Sign IN"** button to log in instantly with the main account.

---

## 🛠️ Architecture and Technologies

### Backend (NestJS)
- **Port:** 5000
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT with Refresh Tokens and **Argon2** hashing.
- **Documentation:** Swagger available at `http://localhost:5000/api`

### Frontend (React + TypeScript)
- **Port:** 3000 (Docker) or 3001 (Local)
- **UI:** Material UI (MUI)
- **Global State:** Context API for Authentication.
- **Security:** Axios interceptors for token management and route normalization.

---

## 📦 Mock Data Structure
Running the seed script generates:
- **1 Admin** (with professor permissions).
- **5 Distinct Professors**.
- **20 Students**.
- **10 Courses** with 5 lectures each.
- Automatic distribution of students across courses with attendance logs and simulated grades.

---

## 🔧 Fixes Implemented for Demonstration
- ✅ **Blank Page Fix:** Added protection against corrupted or missing tokens in `jwt_decode`.
- ✅ **Routing Normalization:** Implemented an Axios interceptor to ensure API calls from nested routes (`/my/...`) do not collide with React routing.
- ✅ **Argon2 Compatibility:** Synchronized password hashing between the Seed script and the NestJS Auth service.
- ✅ **Nginx Proxy:** Production configuration adjusted to correctly redirect API requests and handle sub-paths.

---

## 👨‍💻 Next Steps (DevOps)
This project is optimized for:
1. **Docker Swarm:** Deploying stacks with backend replicas and load balancing.
2. **Kubernetes:** Creating Deployments, Services, and Ingress Controllers.
3. **CI/CD:** Pipelines for building images and automatic deployment.
