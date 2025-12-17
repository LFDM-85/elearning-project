# E-Learning Backend API

The robust backend service for the E-Learning platform, built with **NestJS** and **MongoDB**.

## 🚀 Key Features

*   **Authentication:** JWT-based auth (Access & Refresh tokens) with Passport strategies.
*   **Role-Based Access Control (RBAC):** Guards for Admin, Professor, and Student roles.
*   **Data Models:** Mongoose schemas for Users, Courses, Lectures, Assessments, Works, and Attendance.
*   **File Handling:** Integrated with Cloudinary for asset management.
*   **Documentation:** Auto-generated Swagger API docs available at `/api`.

## 🛠️ Tech Stack

*   **Framework:** [NestJS](https://nestjs.com/)
*   **Database:** MongoDB
*   **ODM:** Mongoose
*   **Validation:** class-validator & class-transformer
*   **Security:** Helmet, CORS, Argon2 (hashing)

## 🏁 Getting Started

### Prerequisites
*   Node.js (v14+)
*   MongoDB (running locally or via Docker)

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode (recommended for dev)
$ npm run start:dev

# production mode
$ npm run start:prod
```

### API Documentation

Once running, visit:
`http://localhost:5000/api`

## 🧪 Seeding Data

Use the seed script in the root directory to populate the database with realistic mock data:

```bash
cd ..
./seed-db.sh
```