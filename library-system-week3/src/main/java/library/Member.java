package library;

import java.util.ArrayList;
import java.util.List;

public class Member {

    private String id;
    private String name;
    private String phone;
    private List<String> borrowedBooks;

    public Member(String id, String name, String phone) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.borrowedBooks = new ArrayList<>();
    }

    public Member(
            String id,
            String name,
            String phone,
            List<String> borrowedBooks
    ) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.borrowedBooks = borrowedBooks;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public List<String> getBorrowedBooks() {
        return borrowedBooks;
    }

    public void borrowBook(String isbn) {

        if (!borrowedBooks.contains(isbn)) {
            borrowedBooks.add(isbn);
        }
    }

    public void returnBook(String isbn) {
        borrowedBooks.remove(isbn);
    }

    public String toFileString() {

        String books =
                String.join(",", borrowedBooks);

        return id + "|" +
                name + "|" +
                phone + "|" +
                books;
    }

    @Override
    public String toString() {

        return "Member ID: " + id
                + " | Name: " + name
                + " | Phone: " + phone
                + " | Borrowed Books: "
                + borrowedBooks.size();
    }
}