package library;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import java.time.LocalDate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Library {

    private List<Book> books;
    private List<Member> members;
    private FileHandler fileHandler;

    private static final int MAX_BOOKS_PER_MEMBER = 5;
    private static final int LOAN_DAYS = 14;


    public Library() {

        books =
                new ArrayList<>();

        members =
                new ArrayList<>();

        fileHandler =
                new FileHandler();

        loadData();
    }


    // ==========================================
    // LOAD DATA
    // ==========================================

    private void loadData() {

        books =
                fileHandler.loadBooks();

        members =
                fileHandler.loadMembers();

        System.out.println(
                "\nData loaded successfully."
        );

        System.out.println(
                "Books: "
                        + books.size()
                        + " | Members: "
                        + members.size()
        );
    }


    // ==========================================
    // ADD BOOK
    // ==========================================

    public boolean addBook(Book book) {

        if (
                findBookByIsbn(
                        book.getIsbn()
                ) != null
        ) {

            System.out.println(
                    "A book with this ISBN already exists!"
            );

            return false;
        }

        books.add(book);

        fileHandler.saveBooks(
                books
        );

        System.out.println(
                "Book added successfully: "
                        + book.getTitle()
        );

        return true;
    }


    // ==========================================
    // REMOVE BOOK
    // ==========================================

    public void removeBook(String isbn) {

        Book book =
                findBookByIsbn(isbn);

        if (book == null) {

            System.out.println(
                    "Book not found!"
            );

            return;
        }

        if (!book.isAvailable()) {

            System.out.println(
                    "Cannot remove a borrowed book!"
            );

            return;
        }

        books.remove(book);

        fileHandler.saveBooks(
                books
        );

        System.out.println(
                "Book removed successfully."
        );
    }


    // ==========================================
    // FIND BOOK
    // ==========================================

    public Book findBookByIsbn(
            String isbn
    ) {

        return books.stream()
                .filter(
                        book ->
                                book.getIsbn()
                                        .equalsIgnoreCase(
                                                isbn
                                        )
                )
                .findFirst()
                .orElse(null);
    }


    // ==========================================
    // SEARCH BOOKS
    // ==========================================

    public List<Book> searchBooks(
            String keyword
    ) {

        String search =
                keyword.toLowerCase();

        return books.stream()
                .filter(
                        book ->

                                book.getTitle()
                                        .toLowerCase()
                                        .contains(search)

                                        ||

                                        book.getAuthor()
                                                .toLowerCase()
                                                .contains(search)

                                        ||

                                        book.getIsbn()
                                                .toLowerCase()
                                                .contains(search)
                )
                .collect(
                        Collectors.toList()
                );
    }


    // ==========================================
    // DISPLAY BOOKS
    // ==========================================

    public void displayAllBooks() {

        if (books.isEmpty()) {

            System.out.println(
                    "\nNo books in the library."
            );

            return;
        }

        List<Book> sortedBooks =
                books.stream()
                        .sorted(
                                Comparator.comparing(
                                        Book::getTitle
                                )
                        )
                        .collect(
                                Collectors.toList()
                        );

        System.out.println(
                "\n========== ALL BOOKS =========="
        );

        System.out.println(
                "Total Books: "
                        + sortedBooks.size()
        );

        System.out.println(
                "-".repeat(100)
        );

        for (
                int i = 0;
                i < sortedBooks.size();
                i++
        ) {

            System.out.println(
                    (i + 1)
                            + ". "
                            + sortedBooks.get(i)
            );
        }
    }


    // ==========================================
    // REGISTER MEMBER
    // ==========================================

    public boolean registerMember(
            Member member
    ) {

        if (
                findMemberById(
                        member.getId()
                ) != null
        ) {

            System.out.println(
                    "Member ID already exists!"
            );

            return false;
        }

        members.add(member);

        fileHandler.saveMembers(
                members
        );

        System.out.println(
                "Member registered successfully: "
                        + member.getName()
        );

        return true;
    }


    // ==========================================
    // FIND MEMBER
    // ==========================================

    public Member findMemberById(
            String id
    ) {

        return members.stream()
                .filter(
                        member ->
                                member.getId()
                                        .equalsIgnoreCase(
                                                id
                                        )
                )
                .findFirst()
                .orElse(null);
    }


    // ==========================================
    // DISPLAY MEMBERS
    // ==========================================

    public void displayAllMembers() {

        if (members.isEmpty()) {

            System.out.println(
                    "\nNo registered members."
            );

            return;
        }

        System.out.println(
                "\n======= ALL MEMBERS ======="
        );

        for (
                int i = 0;
                i < members.size();
                i++
        ) {

            System.out.println(
                    (i + 1)
                            + ". "
                            + members.get(i)
            );
        }
    }


    // ==========================================
    // BORROW BOOK
    // ==========================================

    public void borrowBook(
            String isbn,
            String memberId
    ) {

        Book book =
                findBookByIsbn(isbn);

        Member member =
                findMemberById(memberId);


        if (book == null) {

            System.out.println(
                    "Book not found!"
            );

            return;
        }


        if (member == null) {

            System.out.println(
                    "Member not found!"
            );

            return;
        }


        if (!book.isAvailable()) {

            System.out.println(
                    "Book is already borrowed!"
            );

            return;
        }


        if (
                member.getBorrowedBooks()
                        .size()
                        >=
                        MAX_BOOKS_PER_MEMBER
        ) {

            System.out.println(
                    "Member has reached the maximum borrowing limit of "
                            + MAX_BOOKS_PER_MEMBER
                            + " books."
            );

            return;
        }


        book.setAvailable(false);

        book.setBorrowedBy(
                memberId
        );

        LocalDate dueDate =
                LocalDate.now()
                        .plusDays(
                                LOAN_DAYS
                        );

        book.setDueDate(
                dueDate
        );

        member.borrowBook(
                isbn
        );


        fileHandler.saveBooks(
                books
        );

        fileHandler.saveMembers(
                members
        );


        System.out.println(
                "\nBook borrowed successfully!"
        );

        System.out.println(
                "Due Date: "
                        + dueDate
        );
    }


    // ==========================================
    // RETURN BOOK
    // ==========================================

    public void returnBook(
            String isbn
    ) {

        Book book =
                findBookByIsbn(isbn);


        if (book == null) {

            System.out.println(
                    "Book not found!"
            );

            return;
        }


        if (book.isAvailable()) {

            System.out.println(
                    "This book is not currently borrowed."
            );

            return;
        }


        String memberId =
                book.getBorrowedBy();

        Member member =
                findMemberById(
                        memberId
                );


        double fine =
                book.calculateFine();


        if (member != null) {

            member.returnBook(
                    isbn
            );
        }


        book.setAvailable(true);

        book.setBorrowedBy("");

        book.setDueDate(null);


        fileHandler.saveBooks(
                books
        );

        fileHandler.saveMembers(
                members
        );


        System.out.println(
                "\nBook returned successfully!"
        );


        if (fine > 0) {

            System.out.printf(
                    "Overdue Fine: Rs. %.2f%n",
                    fine
            );

        } else {

            System.out.println(
                    "No overdue fine."
            );
        }


        if (
                !book.getReservedBy()
                        .isEmpty()
        ) {

            System.out.println(
                    "This book is reserved by Member ID: "
                            + book.getReservedBy()
            );
        }
    }


    // ==========================================
    // RESERVE BOOK
    // ==========================================

    public void reserveBook(
            String isbn,
            String memberId
    ) {

        Book book =
                findBookByIsbn(isbn);

        Member member =
                findMemberById(memberId);


        if (book == null) {

            System.out.println(
                    "Book not found!"
            );

            return;
        }


        if (member == null) {

            System.out.println(
                    "Member not found!"
            );

            return;
        }


        if (book.isAvailable()) {

            System.out.println(
                    "Book is currently available. You can borrow it directly."
            );

            return;
        }


        if (
                !book.getReservedBy()
                        .isEmpty()
        ) {

            System.out.println(
                    "Book is already reserved by another member."
            );

            return;
        }


        book.setReservedBy(
                memberId
        );

        fileHandler.saveBooks(
                books
        );


        System.out.println(
                "Book reserved successfully for "
                        + member.getName()
        );
    }


    // ==========================================
    // STATISTICS
    // ==========================================

    public void displayStatistics() {

        long availableBooks =
                books.stream()
                        .filter(
                                Book::isAvailable
                        )
                        .count();


        long borrowedBooks =
                books.size()
                        - availableBooks;


        long overdueBooks =
                books.stream()
                        .filter(
                                Book::isOverdue
                        )
                        .count();


        long reservedBooks =
                books.stream()
                        .filter(
                                book ->
                                        !book.getReservedBy()
                                                .isEmpty()
                        )
                        .count();


        System.out.println(
                "\n====== LIBRARY STATISTICS ======"
        );

        System.out.println(
                "Total Books: "
                        + books.size()
        );

        System.out.println(
                "Available Books: "
                        + availableBooks
        );

        System.out.println(
                "Borrowed Books: "
                        + borrowedBooks
        );

        System.out.println(
                "Overdue Books: "
                        + overdueBooks
        );

        System.out.println(
                "Reserved Books: "
                        + reservedBooks
        );

        System.out.println(
                "Registered Members: "
                        + members.size()
        );
    }


    // ==========================================
    // EXPORT TO CSV
    // ==========================================

    public void exportBooksToCSV() {

        File directory =
                new File("exports");

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName =
                "exports"
                        + File.separator
                        + "books_export.csv";


        try (
                BufferedWriter writer =
                        new BufferedWriter(
                                new FileWriter(
                                        fileName
                                )
                        )
        ) {

            writer.write(
                    "ISBN,Title,Author,Year,Available,BorrowedBy,DueDate,ReservedBy"
            );

            writer.newLine();


            for (Book book : books) {

                writer.write(
                        "\"" + book.getIsbn() + "\","
                                + "\"" + book.getTitle() + "\","
                                + "\"" + book.getAuthor() + "\","
                                + book.getYear() + ","
                                + book.isAvailable() + ","
                                + "\"" + book.getBorrowedBy() + "\","
                                + "\"" +
                                (
                                        book.getDueDate() == null
                                                ? ""
                                                : book.getDueDate()
                                )
                                + "\","
                                + "\"" +
                                book.getReservedBy()
                                + "\""
                );

                writer.newLine();
            }


            System.out.println(
                    "Books exported successfully to: "
                            + fileName
            );

        } catch (IOException e) {

            System.out.println(
                    "Error exporting CSV: "
                            + e.getMessage()
            );
        }
    }


    // ==========================================
    // DISPLAY SEARCH RESULTS
    // ==========================================

    public void displaySearchResults(
            List<Book> results
    ) {

        if (results.isEmpty()) {

            System.out.println(
                    "No matching books found."
            );

            return;
        }


        System.out.println(
                "\n===== SEARCH RESULTS ====="
        );


        for (
                int i = 0;
                i < results.size();
                i++
        ) {

            System.out.println(
                    (i + 1)
                            + ". "
                            + results.get(i)
            );
        }
    }
}