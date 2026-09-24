# ecommerce-backend


## **🛒 Ecommerce Backend API**

A Spring Boot-based RESTful backend system for an E-Commerce application.
It provides APIs for managing products with full CRUD operations, built using Spring Boot, Spring Data JPA, and H2/PostgreSQL database support.


---
## **🚀 Features**

* 📦 Product Management (CRUD)
* 🔍 Get product by ID
* 📃 Get all products
* ✏️ Update product details
* ❌ Delete product**
* 🧪 In-memory H2 database support (easy testing)
* 🐘 PostgreSQL support (production ready)
* 📄 Swagger UI API documentation
* ⚡ Layered architecture (Controller → Service → Repository)
---

---

## 🛠️ Tech Stack
* **Language:** Java 17+
* **Framework:** Spring Boot 3+
* **Data Access:** Spring Data JPA
* **Databases:** PostgreSQL / H2 Database
* **Build Tool:** Maven
* **API Docs:** Swagger (springdoc-openapi)
* **Testing:** Postman (API testing)
---  


## **📁 Project Structure**
```

ecommerce-backend
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java/com/blogapi
 ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┣ service/impl
 ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┗ EcommerceBackendApplication.java
 ┃ ┃ ┗ resources
 ┃ ┃   ┣ application.properties
 ┃ ┗ test
 ┣ pom.xml
 ┗ README.md
```


---
 ## **⚙️ Setup Instructions**
 ```
   1️⃣ Clone the repository
      git clone https://github.com/your-username/ecommerce-backend.git
      cd ecommerce-backend
   2️⃣ Run the project

      Using Maven:

      mvn spring-boot:run
             OR 
      run from IDE:
  👉 EcommerceBackendApplication.java

3️⃣ Access Application

| Service      | URL                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------ |
| API Base URL | [http://localhost:8080](http://localhost:8080)                                             |
| Swagger UI   | [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) |
| H2 Console   | [http://localhost:8080/h2-console](http://localhost:8080/h2-console)                       |
```

## **📌 API Endpoints**
```

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/products`      | Create product    |
| GET    | `/api/products`      | Get all products  |
| GET    | `/api/products/{id}` | Get product by ID |
| PUT    | `/api/products/{id}` | Update product    |
| DELETE | `/api/products/{id}` | Delete product    |
```

## **📤 Sample JSON (POST /api/products)**

```
{
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 79999,
  "quantity": 10
}
```


## **🧪 Testing with Postman**
```
Open Postman
Select method (GET/POST/PUT/DELETE)
Enter URL:
http://localhost:8080/api/products
```
For POST → select Body → raw → JSON
Paste sample JSON → Send
```

🐘 Database Configuration
H2 (Default - No setup needed)

spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true

PostgreSQL (Optional)

spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=postgres
spring.datasource.password=yourpassword
```
---

## **📈 Future Improvements**

* 🔐 JWT Authentication
* 🛍️ Cart & Order System
* 👤 User Management
* 💳 Payment Integration
* 📦 Category Management
* 🧾 Role-based Access Control
---  


## **👨‍💻 Author**
```
Priy Darshan
Java Backend Developer
```
..
