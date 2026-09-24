# E-Commerce Backend System

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Getting Started](#getting-started)
6. [Configuration](#configuration)
7. [API Endpoints](#api-endpoints)
8. [Data Models](#data-models)
9. [Database Schema](#database-schema)
10. [Validation](#validation)
11. [Exception Handling](#exception-handling)
12. [Testing](#testing)
13. [Dependencies](#dependencies)
14. [Build & Run](#build--run)

---

## Project Overview

**E-Commerce Backend System** is a RESTful API built with Spring Boot that provides core product management capabilities for an e-commerce platform. It supports full CRUD operations on products with validation, error handling, and OpenAPI documentation.

| Field | Value |
|-------|-------|
| **Group ID** | `com.blogapi` |
| **Artifact ID** | `ecommerce-backend` |
| **Version** | `0.0.1-SNAPSHOT` |
| **Java Version** | 17 |
| **Spring Boot Version** | 3.2.5 |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Java 17** | Runtime language |
| **Spring Boot 3.2.5** | Application framework |
| **Spring Data JPA** | Data access layer |
| **H2 Database** | In-memory database (development) |
| **PostgreSQL Driver** | Production-ready database support |
| **Lombok** | Boilerplate reduction (optional) |
| **SpringDoc OpenAPI** | API documentation (Swagger UI) |
| **Spring Boot Validation** | Request validation |

---

## Project Structure

```
ecommerce-backend/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/blogapi/
│   │   │   ├── EcommerceBackendApplication.java   # Application entry point
│   │   │   ├── controller/
│   │   │   │   └── ProductController.java          # REST endpoints
│   │   │   ├── dto/
│   │   │   │   └── ProductDTO.java                 # Request DTO with validation
│   │   │   ├── entity/
│   │   │   │   └── Product.java                    # JPA entity
│   │   │   ├── exception/
│   │   │   │   └── GlobalExceptionHandler.java     # Global exception handling
│   │   │   ├── repository/
│   │   │   │   └── ProductRepository.java          # Data access layer
│   │   │   └── service/
│   │   │       ├── ProductService.java             # Service interface
│   │   │       └── impl/
│   │   │           └── ProductServiceImpl.java     # Service implementation
│   │   └── resources/
│   │       └── application.properties               # Application config
│   └── test/
│       └── java/com/blogapi/
│           └── EcommerceBackendApplicationTests.java # Test class
└── target/                                         # Build output
```

### Layer Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client / API Caller                │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Controller Layer (ProductController)               │
│  - Maps HTTP requests to service calls              │
│  - Base path: /api/products                         │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Service Layer (ProductService + ProductServiceImpl) │
│  - Business logic                                  │
│  - Transaction management                          │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Repository Layer (ProductRepository)               │
│  - JPA-based data access                           │
│  - Extends JpaRepository<Product, Long>             │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Database (H2 / PostgreSQL)                         │
│  - Table: products                                  │
└─────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Global Exception Handler                           │
│  - Handles validation errors                        │
│  - Handles runtime exceptions                       │
└─────────────────────────────────────────────────────┘
```

---

## Prerequisites

| Requirement | Version |
|------------|---------|
| **Java JDK** | 17 or higher |
| **Maven** | 3.8+ (or use included Maven Wrapper) |
| **Git** | Any recent version |

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/pranjalKumarglbtim/ecommerce-backend.git
cd ecommerce-backend
```

### Install Dependencies

```bash
./mvnw clean install
# Windows
mvnw.cmd clean install
```

### Run the Application

```bash
./mvnw spring-boot:run
# Windows
mvnw.cmd spring-boot:run
```

The application will start on `http://localhost:8080`.

---

## Configuration

All configuration is managed via `src/main/resources/application.properties`.

### H2 Database (Default)

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
```

With H2 enabled, the console is available at: `http://localhost:8080/h2-console`

### PostgreSQL (Production)

Update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driverClassName=org.postgresql.Driver

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## API Endpoints

Base URL: `http://localhost:8080/api/products`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| `POST` | `/` | Create a new product | `Product` (JSON) | `Product` (201 Created) |
| `GET` | `/` | Get all products | None | `List<Product>` (200 OK) |
| `GET` | `/{id}` | Get product by ID | None | `Product` (200 OK) |
| `PUT` | `/{id}` | Update an existing product | `Product` (JSON) | `Product` (200 OK) |
| `DELETE` | `/{id}` | Delete a product | None | 204 No Content |

### Request/Response Schemas

**Product Object:**

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "price": 199.99,
  "quantity": 50
}
```

### Example Requests

#### Create a Product

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones",
    "price": 199.99,
    "quantity": 50
  }'
```

#### Get All Products

```bash
curl http://localhost:8080/api/products
```

#### Get Product by ID

```bash
curl http://localhost:8080/api/products/1
```

#### Update a Product

```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones Pro",
    "description": "Updated version with ANC",
    "price": 249.99,
    "quantity": 30
  }'
```

#### Delete a Product

```bash
curl -X DELETE http://localhost:8080/api/products/1
```

---

## Data Models

### Entity: `Product`

Mapped to the `products` table in the database.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | `Long` | Primary Key, Auto-generated | Unique product identifier |
| `name` | `String` | Not null | Product name |
| `description` | `String` | Not null | Product description |
| `price` | `double` | Not null | Product price |
| `quantity` | `int` | Not null | Available stock quantity |

### DTO: `ProductDTO`

Used for request validation before mapping to the `Product` entity.

| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `name` | `String` | `@NotBlank` | Cannot be empty |
| `description` | `String` | `@NotBlank` | Cannot be empty |
| `price` | `double` | `@Positive` | Must be greater than 0 |
| `quantity` | `int` | `@PositiveOrZero` | Cannot be negative |

---

## Database Schema

### Table: `products`

```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    quantity INTEGER NOT NULL
);
```

---

## Validation

The application uses **Jakarta Validation** (Bean Validation) to enforce business rules on incoming requests.

### Validation Rules

| Field | Rule | Error Message |
|-------|------|--------------|
| `name` | `@NotBlank` | "Name cannot be empty" |
| `description` | `@NotBlank` | "Description cannot be empty" |
| `price` | `@Positive` | "Price must be greater than 0" |
| `quantity` | `@PositiveOrZero` | "Quantity cannot be negative" |

### Error Response Format

When validation fails, the API returns a `400 Bad Request` with a map of field errors:

```json
{
  "name": "Name cannot be empty",
  "price": "Price must be greater than 0"
}
```

---

## Exception Handling

The `GlobalExceptionHandler` class provides centralized exception handling across all controllers.

### Handled Exceptions

| Exception Type | HTTP Status | Response |
|---------------|-------------|----------|
| `MethodArgumentNotValidException` | `400 Bad Request` | JSON map of field errors |
| `RuntimeException` | `400 Bad Request` | Error message string |

---

## Testing

The project includes a test skeleton using `spring-boot-starter-test`.

### Run Tests

```bash
./mvnw test
# Windows
mvnw.cmd test
```

### Test File

| File | Purpose |
|------|---------|
| `EcommerceBackendApplicationTests.java` | Application context load test |

---

## Dependencies

| Dependency | Version | Scope | Purpose |
|-----------|---------|-------|---------|
| `spring-boot-starter-web` | Managed | compile | REST API, Tomcat, Jackson |
| `spring-boot-starter-data-jpa` | Managed | compile | JPA, Hibernate |
| `spring-boot-starter-validation` | Managed | compile | Bean validation (Jakarta) |
| `postgresql` | Managed | runtime | PostgreSQL JDBC driver |
| `h2` | Managed | runtime | H2 in-memory database |
| `lombok` | Managed | optional | Reduce boilerplate code |
| `spring-boot-starter-test` | Managed | test | Testing framework |
| `springdoc-openapi-starter-webmvc-ui` | 2.5.0 | compile | Swagger UI / OpenAPI docs |

---

## Build & Run

### Build JAR

```bash
./mvnw clean package
# Output: target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

### Run JAR

```bash
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

### Maven Wrapper

The project includes a Maven Wrapper (`mvnw` / `mvnw.cmd`) so you do not need to install Maven separately.

---

## OpenAPI Documentation

The project integrates **SpringDoc OpenAPI**, which provides Swagger UI for interactive API exploration.

Once the application is running:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

---

## Notes

- The current implementation uses **H2 in-memory database** for development. Switch to PostgreSQL by updating `application.properties`.
- The `ProductController` directly accepts `Product` entity in `@RequestBody`. For production, it is recommended to use `ProductDTO` in controllers and map it to `Product` entity in the service layer.
- Global exception handling is configured for validation errors and runtime exceptions.
