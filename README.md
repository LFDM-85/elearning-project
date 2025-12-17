# E-Learn Platform

A modern, full-stack e-learning platform built with React (Frontend) and NestJS (Backend).

## 🚀 Technologies

### Frontend
*   **Framework:** React v18
*   **Language:** TypeScript
*   **UI Library:** Material-UI (MUI) v5
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios
*   **State/Context:** React Context API for Auth

### Backend
*   **Framework:** NestJS
*   **Language:** TypeScript
*   **Database:** MongoDB
*   **ORM:** Mongoose
*   **Authentication:** JWT (JSON Web Tokens) with Passport strategy
*   **File Storage:** Cloudinary

## 🛠️ Prerequisites

*   **Node.js** (v14 or higher)
*   **Docker** and **Docker Compose** (for running MongoDB)
*   **Yarn** or **NPM**

## 🏁 Getting Started

We have provided convenient shell scripts to get you up and running quickly.

### 1. Setup & Start All (Recommended)

To start the Database, Backend, and Frontend with a single command:

```bash
./start-all.sh
```

This script will:
1.  Start MongoDB via Docker.
2.  Install dependencies for both Backend and Frontend if missing.
3.  Start the Backend server (background process).
4.  Seed the database with mock data (Users, Courses, Lectures).
5.  Start the Frontend application.

### 2. Manual Setup

If you prefer to run services individually:

**Step 1: Start Database**
```bash
./start-db.sh
```

**Step 2: Start Backend**
```bash
./start-backend.sh
```
The backend will run on `http://localhost:5000`.

**Step 3: Seed Database (Optional)**
Populate the database with initial mock data (Admin, Professors, Students, Courses).
```bash
./seed-db.sh
```

**Step 4: Start Frontend**
```bash
./start-frontend.sh
```
The frontend will run on `http://localhost:3000`.

## 🧪 Mock Data Credentials

The `seed-db.sh` script now populates the database with a rich, realistic dataset:

*   **5 Professors** (e.g., Dr. Alice Johnson, Prof. Bob Smith...)
*   **30 Students** (e.g., Frank Miller, Grace Wilson...)
*   **25 Diverse Courses** (Web Dev, Cloud Computing, Data Science, AI, Game Dev, etc.)
*   **200+ Lectures** with associated Assignments and Attendance records.

### Quick Login Credentials

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | Admin User | `admin@admin.com` | `qwertyuiop` |
| **Professor** | Dr. Alice Johnson | `prof1@elearning.com` | `professorpassword` |
| **Professor** | Prof. Bob Smith | `prof2@elearning.com` | `professorpassword` |
| **Student** | Frank Miller | `student1@elearning.com` | `studentpassword` |
| **Student** | Grace Wilson | `student2@elearning.com` | `studentpassword` |

*(Note: Professors range from `prof1` to `prof5`. Students range from `student1` to `student20`.)*

## 📂 Project Structure

*   `Frontend-main/`: React application source code.
*   `Backend-main/`: NestJS API source code.
*   `docker-compose.yml`: MongoDB service configuration.

## 🎨 UI Modernization

The project features a modernized UI using Material-UI v5 with:
*   A fresh color palette (Indigo & Emerald).
*   Glassmorphism effects in the Header.
*   Responsive and interactive layouts.
*   Data Grids for efficient management.

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
