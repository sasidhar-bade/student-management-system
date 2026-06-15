# Backend — Student Management System

A RESTful API built with **Spring Boot** that handles all student data operations backed by a **MySQL** database.

---

## Tech Stack

- **Java 17**
- **Spring Boot 4.0.6**
- **Spring Data JPA** — database access via Hibernate ORM
- **Spring MVC** — REST controller layer
- **MySQL** — relational database
- **Lombok** — reduces boilerplate (getters, setters, constructors, builder)
- **ModelMapper 3.1.1** — Entity ↔ DTO conversion

---

## Project Structure

```
backend/
└── src/main/java/com/student_management_system/
    ├── StudentSanagementSystemApplication.java  # Entry point
    ├── config/
    │   └── ModelMapperConfig.java               # ModelMapper bean
    ├── controller/
    │   └── StudentContoller.java                # REST endpoints
    ├── dtos/
    │   ├── StudentRequestDto.java               # Incoming request body
    │   └── StudentResponseDto.java              # Outgoing response body
    ├── entity/
    │   └── Student.java                         # JPA entity (maps to `student` table)
    ├── exceptions/
    │   ├── GlobalExceptionHandler.java          # Centralised error handling
    │   ├── ResourceNotFoundException.java       # 404 — student not found
    │   └── StudentAlreadyExistsException.java   # 409 — duplicate email
    ├── repository/
    │   └── IStudentRepository.java              # JPA repository
    └── services/
        ├── IStudentServices.java                # Service interface
        └── impl/
            └── StudentServices.java             # Business logic
```

---

## Database Configuration

Update `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost/Student_Management_System
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> `ddl-auto=update` automatically creates or updates the `student` table on startup.

---

## Running the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The server starts at `http://localhost:8080`.

---

## API Reference

### Base URL: `http://localhost:8080/students`

All endpoints support CORS from any origin (`*`).

---

### POST `/students`
Register a new student.

**Request Body:**
```json
{
  "sname": "Sasidhar",
  "semail": "sasidhar@example.com",
  "sfee": 50000.00,
  "scourse": "B.Tech CSE",
  "saddress": "Hyderabad, Telangana"
}
```

**Response:** `201 Created`
```json
{
  "sid": 1,
  "sname": "Sasidhar",
  "semail": "sasidhar@example.com",
  "sfee": 50000.00,
  "scourse": "B.Tech CSE",
  "saddress": "Hyderabad, Telangana"
}
```

---

### GET `/students`
Retrieve all students.

**Response:** `200 OK` — array of student objects.

---

### GET `/students/{id}`
Retrieve a single student by ID.

**Response:** `200 OK` — single student object.  
**Error:** `404 Not Found` if student doesn't exist.

---

### PATCH `/students/{id}`
Partially update a student's details.

**Request Body:** Any subset of student fields.  
**Response:** `200 OK` — updated student object.  
**Error:** `404 Not Found`, `409 Conflict` if the new email is already in use.

---

### DELETE `/students/{id}`
Delete a student by ID.

**Response:** `200 OK` — `"Student with {id} is deleted successfully"`  
**Error:** `404 Not Found`

---

### GET `/students/search?keyword={name}`
Search students by name (case-insensitive exact match).

**Response:** `200 OK` — array of matched students.

---

## Data Model

### `student` table

| Column           | Type    | Constraints              |
|------------------|---------|--------------------------|
| student_id       | BIGINT  | Primary Key, Auto Increment |
| student_name     | VARCHAR | NOT NULL                 |
| student_email    | VARCHAR | UNIQUE, NOT NULL         |
| student_fee      | DOUBLE  |                          |
| student_course   | VARCHAR |                          |
| student_address  | VARCHAR |                          |

---

## Exception Handling

Handled globally via `GlobalExceptionHandler` (`@RestControllerAdvice`):

| Exception                      | HTTP Status           |
|--------------------------------|-----------------------|
| `ResourceNotFoundException`    | `404 Not Found`       |
| `StudentAlreadyExistsException`| `409 Conflict`        |
| `Exception` (all others)       | `500 Internal Server Error` |

---

## Building for Production

```bash
./mvnw clean package
java -jar target/student_sanagement_system-0.0.1-SNAPSHOT.jar
```