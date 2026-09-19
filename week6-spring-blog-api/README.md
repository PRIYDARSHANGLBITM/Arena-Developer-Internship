# Blog Management REST API 📝

A production-ready RESTful Web Service built using Spring Boot for managing blog posts and categories. The application supports standard CRUD operations, request validations, pagination, centralized exception handling, unit tests, and interactive API documentation powered by Swagger UI.

---

## 🚀 Key Features

- **Category Management**: Complete CRUD operations for blog categories.
- **Post Management**: Complete CRUD operations for blog posts mapped to categories.
- **Pagination & Sorting**: Paginated list retrieval for blog posts.
- **Data Validation**: Input payload validation using Spring Validation (`@NotBlank`, `@NotNull`, etc.).
- **Global Exception Handling**: Centralized exception response handling (`ResourceNotFoundException`).
- **Interactive Documentation**: Auto-generated API documentation using OpenAPI 3.0 / Swagger UI.
- **Unit Testing**: Service layer unit tests written using JUnit 5 and Mockito.

---

## 🛠️ Tech Stack

- **Java Version**: Java 17
- **Framework**: Spring Boot 3.2.1
- **Database**: H2 In-Memory Database / Spring Data JPA
- **Build Tool**: Maven
- **Documentation**: Springdoc OpenAPI / Swagger UI (v3)
- **Testing**: JUnit 5, Mockito

---

## 📁 Project Structure
week6-spring-blog-api
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── blogapi
│   │   │           ├── BlogApiApplication.java
│   │   │           ├── config
│   │   │           │   └── SwaggerConfig.java
│   │   │           ├── controller
│   │   │           │   ├── CategoryController.java
│   │   │           │   └── PostController.java
│   │   │           ├── exception
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   └── ResourceNotFoundException.java
│   │   │           ├── model
│   │   │           │   ├── dto
│   │   │           │   │   ├── PostRequest.java
│   │   │           │   │   └── PostResponse.java
│   │   │           │   └── entity
│   │   │           │       ├── Category.java
│   │   │           │       └── Post.java
│   │   │           ├── repository
│   │   │           │   ├── CategoryRepository.java
│   │   │           │   └── PostRepository.java
│   │   │           └── service
│   │   │               └── PostService.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── application-prod.properties
│   └── test
│       └── java
│           └── com
│               └── blogapi
│                   └── service
│                       └── PostServiceTest.java
├── .gitignore
├── pom.xml
└── README.md  


---

## ⚙️ How to Run the Project

### Prerequisites
- JDK 17 installed
- Apache Maven installed

### Execution Steps

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd week6-spring-blog-api


   Run Unit Tests  --- mvn test 

   Start the Server --- mvn spring-boot:run

   The application will launch locally at http://localhost:8080.

   📖 Swagger UI API Documentation
Access the interactive API documentation and test endpoints directly at:
👉 http://localhost:8080/swagger-ui/index.html

📌 Main API Endpoints Summary
Categories (/api/categories)
GET /api/categories - Fetch all categories

GET /api/categories/{id} - Fetch category by ID

POST /api/categories - Create a new category

PUT /api/categories/{id} - Update existing category

DELETE /api/categories/{id} - Delete category by ID

Posts (/api/posts)
GET /api/posts - Fetch paginated list of posts

GET /api/posts/{id} - Fetch post by ID

POST /api/posts - Create a new post

PUT /api/posts/{id} - Update existing post

DELETE /api/posts/{id} - Delete post by ID

GET /api/posts/category/{categoryId} - Fetch posts by Category ID

🧪 Sample Request Payloads
1. Create Category (POST /api/categories)
JSON
{
  "name": "Technology",
  "description": "Tech news and software development tutorials"
}
2. Create Post (POST /api/posts)
JSON
{
  "title": "Getting Started with Spring Boot",
  "content": "Spring Boot simplifies building stand-alone production grade Spring based Applications.",
  "author": "Priyand",
  "categoryId": 1
}