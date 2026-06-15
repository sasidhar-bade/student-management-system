# Student Management System

A full-stack web application for managing student records. Built with a **Spring Boot** REST API backend and a **React** frontend with Redux state management.

---

## Project Structure

```
student-management-system/
├── backend/       # Spring Boot REST API
├── frontend/      # React + Redux SPA
└── README.md
```

---

## Features

- Add new students with name, email, fee, course, and address
- View all registered students in a table
- Edit existing student information
- Delete students by ID
- Search students by name
- Toast notifications for all actions
- Duplicate email validation
- Global error handling

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 19, Redux Toolkit, React Router v7, Axios, Bootstrap 5 |
| Backend  | Spring Boot 4, Spring Data JPA, Spring MVC      |
| Database | MySQL                                           |
| Build    | Maven (backend), npm (frontend)                 |

---

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.8+

---

## Getting Started

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE Student_Management_System;
```

### 2. Backend Setup

```bash
cd backend
# Update DB credentials in src/main/resources/application.properties
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`.

---

## API Endpoints Overview

| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| POST   | `/students`               | Register a new student  |
| GET    | `/students`               | Get all students        |
| GET    | `/students/{id}`          | Get student by ID       |
| PATCH  | `/students/{id}`          | Update student          |
| DELETE | `/students/{id}`          | Delete student          |
| GET    | `/students/search?keyword=` | Search by name        |

---

## License

This project is licensed under the terms of the included LICENSE file.