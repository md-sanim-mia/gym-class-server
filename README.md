# Gym Class Scheduling and Membership Management System

## Project Overview

This is a robust backend system designed for managing gym operations, built using **TypeScript**, **Express.js**, and **Prisma**. The system implements a **Modular Pattern** architecture and features **JWT-based authentication** with defined roles: **Admin**, **Trainer**, and **Trainee**.

The system handles class scheduling, trainee booking, and user management, enforcing key business rules such as a **5 classes per day limit** and a **10 trainees per schedule capacity**.

---

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)

---

## Testing Instructions and Credentials

**Admin Credentials:**

- **Email:** admin@gymclass.com
- **Password:** admin1234
- **live link** https://gym-class-server-three.vercel.app

---

## Architecture and Relational Diagram

This project follows a **Modular Pattern** architecture, structuring the application by feature domains (e.g., Auth, User, Trainer, Schedule, Booking).

**Relational Diagram:**
[Insert Link or Image of the Relational Diagram here]

---

## Database Schema (Prisma Models)

The system utilizes the following models for managing users and gym operations.

````prisma
// Example Schema structure (replace with your actual schema definitions)

enum Role {
    ADMIN
    TRAINER
    TRAINEE
}

model User {
    id       String  @id @default(uuid())
    email    String  @unique
    password String
    role     Role
    // Relationship to Trainer/Trainee models
    trainer  Trainer?
    trainee  Trainee?
}

model Trainer {
    id        String    @id @default(uuid())
    name      String
    userId    String    @unique
    user      User      @relation(fields: [userId], references: [id])
    schedules Schedule[]
}

model Trainee {
    id     String @id @default(uuid())
    name   String
    userId String @unique
    user   User   @relation(fields: [userId], references: [id])
    bookings Booking[]
}

model Schedule {
    id        String   @id @default(uuid())
    startTime DateTime
    endTime   DateTime
    duration  Int      // 2 hours
    capacity  Int      // 10 trainees max
    trainerId String
    trainer   Trainer  @relation(fields: [trainerId], references: [id])
    bookings  Booking[]
}

model Booking {
    id          String   @id @default(uuid())
    traineeId   String
    trainee     Trainee  @relation(fields: [traineeId], references: [id])
    scheduleId  String
    schedule    Schedule @relation(fields: [scheduleId], references: [id])
    createdAt   DateTime @default(now())
}

## API Endpoints

All endpoints are protected by JWT authentication and authorization middleware where applicable.

### 1. Authentication and User Registration

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :-- | :---        |
| `/api/trainers`   | `POST`      | Create a new Trainer | Admin |
| `/api/trainees`   | `POST`      | Register a new Trainee (Self-registration) | No |
| `/api/auth/login` |  `POST`     | User Login | No |
| `/api/auth/refresh-token` |`POST` | Get new Access Token using Refresh Token | No |

**POST /api/trainers ( Self-registration for the trainee ) Demo JSON:**

```json
{
  "email": "trainer@example.com",
  "password": "Trainer@123",
  "name": "Alice Trainer",
  "expertise": "Yoga"
}
```

**POST /api/trainees (login) Demo JSON:**

```json
{
  "email": "new.trainee@example.com",
  "password": "SecurePassword123!",
  "name": "New Trainee Name"
}
```
**POST /api/auth/login (login) Demo JSON:**

```json
{
  "email": "trainee@example.com",
  "password": "Password@123",
}
```

### 2. User Management

| Endpoint         | Method | Description             | Auth Required           |
| :--------------- | :----- | :---------------------- | :---------------------- |
| `/api/users`     | `GET`  | Get all users           | Admin                   |
| `/api/users/:id` | `GET`  | Get single user profile | Admin, Trainee, Trainer |

---

### 3. Trainer Management

Only **Admins** can create and manage Trainers.

| Endpoint            | Method        | Description                | Auth Required  |
| :------------------ | :------------ | :------------------------- | :------------- |
| `/api/trainers`     | `POST`        | Create a new Trainer       | Admin          |
| `/api/trainers`     | `GET`         | Get all Trainers           | Admin          |
| `/api/trainers/:id` | `GET`         | Get single Trainer profile | Admin, Trainer |
| `/api/trainers/:id` | `PATCH`/`PUT` | Update Trainer profile     | Admin,         |
| `/api/trainers/:id` | `DELETE`      | Delete a Trainer           | Admin          |

**POST /api/trainers Demo JSON:**

```json
{
  "email": "trainer@example.com",
  "password": "Trainer@123",
  "name": "Alice Trainer",
  "expertise": "Yoga"
}
```

---

### 4. Schedule Management

Only **Admins** can create and manage schedules.

| Endpoint                      | Method        | Description                                                | Auth Required                   |
| :---------------------------- | :------------ | :--------------------------------------------------------- | :-----------------------------  |
| `/api/schedules`              | `POST`        | Create a new schedule (2 hours duration, max 5/day)        | Admin                           |
| `/api/schedules`              | `GET`         | Get all schedules                                          | Admin,trainee Trainee, Trainer  |
| `/api/schedules/my-schedules` | `GET`         | Get my schedule details                                    | Trainer                         |
| `/api/schedules/:id`          | `GET`         | Get single schedule details                                | Admin, Trainee, Trainer         |
| `/api/schedules/:id`          | `PATCH`/`PUT` | Update schedule details                                    | Admin                           |
| `/api/schedules/:id`          | `DELETE`      | Delete schedule (Cannot delete running or booked schedule) | Admin                           |

**POST /api/schedules Demo JSON:**

```json
{
  "trainerId": "[UUID of a Trainer]",
  "startTime": "2025-07-15T10:00:00Z",
  "endTime": "2025-07-15T12:00:00Z"
}
```

---

### 5. Booking System

Only **Trainees** can book and cancel classes.

| Endpoint                   | Method  | Description                                     | Auth Required  |
| :------------------------- | :------ | :---------------------------------------------- | :------------- |
| `/api/bookings`            | `POST`  | Create a new booking (max 10 trainees/schedule) | Trainee        |
| `/api/bookings/my-booking` | `GET`   | Get Trainee's own bookings list                 | Trainee        |
| `/api/bookings/:id`        | `GET`   | Get single booking details                      | Admin, Trainee |
| `/api/bookings/:id`        | `PATCH` | Cancel a booking                                | Trainee        |
| `/api/bookings`            | `GET`   | Get all bookings list                           | Admin Trainee  |

**POST /api/bookings Demo JSON:**

```json
{
  "scheduleId": "[UUID of the Schedule]"
}
```

---

### 6. Trainee Management

Trainees can manage their own profiles, while Admins can view and manage all trainee profiles.

| Endpoint                       | Method | Description                                | Auth Required         |
| :----------------------------- | :----- | :----------------------------------------- | :-------------------- |
| `/api/trainees`                | `POST` | Register a new Trainee (Self-registration) | No                    |
| `/api/trainees`                | `GET`  | Get all Trainee profiles                   | Admin                 |
| `/api/trainees/:id`            | `GET`  | Get single Trainee profile                 | Admin, Trainee (Self) |
| `/api/trainees/profile-update` | `PUT`  | Update Trainee's own profile               | Trainee               |

**POST /api/trainees (Registration) Demo JSON:**

```json
{
  "email": "new.trainee@example.com",
  "password": "SecurePassword123!",
  "name": "New Trainee Name"
}
```
````
