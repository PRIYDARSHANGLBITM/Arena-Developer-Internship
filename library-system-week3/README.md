# 📚 Console-Based Library Management System

A feature-rich **Java Console-Based Library Management System** developed using Object-Oriented Programming principles. The application allows users to manage books, library members, borrowing and returning operations, reservations, overdue fines, statistics, and file-based data persistence.

## 🎯 Project Overview

The purpose of this project is to build a complete command-line library management application while practicing core Java concepts such as:

* Object-Oriented Programming
* Classes and Objects
* Encapsulation
* ArrayLists
* File Handling
* Exception Handling
* Input Validation
* Searching and Filtering
* Java Streams
* Date and Time API

The application stores library data in files, allowing books and members to remain available even after the program is closed and restarted.

---

# ✨ Features

## 📖 Book Management

* Add new books
* View all books
* Search books by title or author
* Remove books
* Check book availability

## 👤 Member Management

* Register new library members
* View all registered members
* Track borrowed books for each member

## 🔄 Borrowing Operations

* Borrow available books
* Automatic due date tracking
* Return borrowed books
* Update member borrowing records

## ⏰ Overdue Management

* Detect overdue books
* Calculate overdue fines
* Display overdue status

## 📌 Reservation System

* Reserve unavailable books
* Track book reservations

## 💾 Data Persistence

* Save books to text files
* Save members to text files
* Automatically load data when the application starts
* Handle file read and write operations

## 📊 Library Statistics

The application provides statistics including:

* Total books
* Available books
* Borrowed books
* Overdue books
* Registered members

## 📤 CSV Export

Books can be exported to a CSV file for external use.

## 🛡️ Input Validation

The system validates user input and provides meaningful feedback for invalid operations.

---

# 🛠️ Technologies Used

* Java
* Object-Oriented Programming
* Java Collections Framework
* ArrayList
* File I/O
* Java Streams
* LocalDate API
* Exception Handling
* Maven Project Structure
* Git and GitHub

---

# 📂 Project Structure

```text
library-system-week3/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── library/
│       │       ├── Main.java
│       │       ├── Book.java
│       │       ├── Member.java
│       │       ├── Library.java
│       │       └── FileHandler.java
│       │
│       └── resources/
│
├── data/
│   ├── books.txt
│   └── members.txt
│
├── screenshots/
│   ├── 01-main-menu.png
│   ├── 02-view-books.png
│   ├── 03-register-member.png
│   ├── 04-search-book.png
│   ├── 05-statistics.png
│   └── 06-csv-export.png
│
├── README.md
├── .gitignore
└── pom.xml
```

---

# 🚀 Installation and Setup

## Prerequisites

Make sure Java JDK is installed on your system.

Check Java installation:

```bash
java -version
javac -version
```

---

## Clone the Repository

```bash
git clone https://github.com/PRIYDARSHANGLBITM/Arena-Developer-Internship.git
```

Navigate to the project folder:

```bash
cd library-system-week3
```

---

# ▶️ How to Compile

Compile all Java files:

```bash
javac -d bin src/main/java/library/*.java
```

For Windows PowerShell, if required:

```powershell
javac -d bin src\main\java\library\*.java
```

---

# ▶️ How to Run

Run the application using:

```bash
java -cp bin library.Main
```

---

# 🖥️ Application Menu

```text
==========================================
   LIBRARY MANAGEMENT SYSTEM
==========================================

==========================================
              MAIN MENU
==========================================

1.  Add New Book
2.  View All Books
3.  Search Books
4.  Remove Book
5.  Register Member
6.  View All Members
7.  Borrow Book
8.  Return Book
9.  Reserve Book
10. View Library Statistics
11. Export Books to CSV
12. Exit

==========================================
Enter your choice:
```

---

# 🧩 Code Architecture

## 📕 Book.java

The `Book` class represents a book in the library.

### Main Properties

* ISBN
* Title
* Author
* Publication Year
* Availability Status
* Borrowed Member
* Due Date
* Reservation Information

It also contains methods for:

* Checking overdue status
* Calculating overdue fines
* Converting book data into file format

---

## 👤 Member.java

The `Member` class represents a library member.

### Main Properties

* Member ID
* Name
* Phone Number
* Borrowed Books

It manages member borrowing operations.

---

## 🏛️ Library.java

The `Library` class contains the main business logic of the application.

It manages:

* Books
* Members
* Borrowing operations
* Returning operations
* Reservations
* Searching
* Statistics
* CSV exporting

The project uses `ArrayList` to manage collections dynamically.

---

## 💾 FileHandler.java

The `FileHandler` class handles data persistence.

It performs:

* Saving books
* Loading books
* Saving members
* Loading members
* Handling file-related exceptions

This ensures that data remains available after restarting the application.

---

## 🖥️ Main.java

The `Main` class contains the console-based user interface.

It:

* Displays the main menu
* Accepts user input
* Validates choices
* Calls appropriate library operations
* Handles user interaction

---

# 🧠 Technical Concepts Implemented

## Object-Oriented Programming

The project uses multiple Java classes to represent real-world entities.

```text
Book
Member
Library
FileHandler
Main
```

### Encapsulation

Class properties are declared as private and accessed using methods.

```java
private String title;

public String getTitle() {
    return title;
}
```

---

## ArrayList

Dynamic collections are managed using Java Lists.

```java
List<Book> books = new ArrayList<>();
List<Member> members = new ArrayList<>();
```

---

## File Handling

The project saves data to text files and loads it when the application starts.

```text
books.txt
members.txt
```

---

## Java Streams

Streams are used for searching and filtering data.

Example operations include:

* Finding books by ISBN
* Searching books
* Calculating statistics

---

## LocalDate API

Java's `LocalDate` is used for:

* Borrowing due dates
* Overdue detection
* Fine calculation

---

# 📊 Library Statistics

The application calculates important library information:

```text
Total Books
Available Books
Borrowed Books
Overdue Books
Registered Members
```

This provides a quick overview of the library system.

---

# 🧪 Testing

The application was tested using different scenarios.

| Test Case        | Expected Result           | Status   |
| ---------------- | ------------------------- | -------- |
| Add Book         | Book added successfully   | ✅ Passed |
| View Books       | All books displayed       | ✅ Passed |
| Search Book      | Matching books displayed  | ✅ Passed |
| Remove Book      | Selected book removed     | ✅ Passed |
| Register Member  | Member registered         | ✅ Passed |
| Borrow Book      | Book assigned to member   | ✅ Passed |
| Return Book      | Book becomes available    | ✅ Passed |
| Reserve Book     | Reservation recorded      | ✅ Passed |
| Statistics       | Correct counts displayed  | ✅ Passed |
| CSV Export       | CSV file generated        | ✅ Passed |
| Data Persistence | Data loaded after restart | ✅ Passed |
| Invalid Input    | Error message displayed   | ✅ Passed |

---

# 📸 Screenshots

## 🏠 Main Menu

![Main Menu](screenshots/01-main-menu.png)

---

## 📚 View All Books

![View Books](screenshots/02-view-books.png)

---

## 👤 Register Member

![Register Member](screenshots/03-register-member.png)

---

## 🔍 Search Book

![Search Book](screenshots/04-search-book.png)


---

## 📊 Library Statistics

![Library Statistics](screenshots/05-statistics.png)

---

## 📤 CSV Export

![CSV Export](screenshots/06-csv-export.png)

---

# 💾 Data Persistence

The system automatically saves data after important operations.

When the application starts, previously saved data is loaded.

Example:

```text
Data loaded successfully.
Books: 3 | Members: 2
```

This demonstrates successful implementation of file-based persistence.

---

# 🎓 Learning Outcomes

Through this project, the following concepts were practiced:

* Java Programming Fundamentals
* Object-Oriented Programming
* Classes and Objects
* Constructors
* Encapsulation
* ArrayLists
* File Handling
* Exception Handling
* Input Validation
* Java Streams
* LocalDate API
* Console-Based Applications
* Git and GitHub

---

# 🔮 Future Improvements

Possible future enhancements include:

* Graphical User Interface using JavaFX
* Database integration using MySQL
* User authentication
* Book categories
* Advanced search filters
* Email notifications for overdue books
* Fine payment system
* Admin dashboard
* Web-based library management system

---

# 👨‍💻 Author

**Priy Darshan**

B.Tech Computer Science Engineering
G. L. Bajaj Institute of Technology & Management, Greater Noida

---

# 📌 Internship Project

This project was developed as part of the **Arena Developer Internship – Week 3: Java Programming Basics**.

---

⭐ If you found this project useful, consider giving the repository a star!
