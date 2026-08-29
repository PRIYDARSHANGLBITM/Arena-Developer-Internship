package library;
import java.time.LocalDate;

public class Book {

    private String isbn;
    private String title;
    private String author;
    private int year;
    private boolean available;
    private String borrowedBy;
    private LocalDate dueDate;
    private String reservedBy;

    public Book(String isbn, String title, String author, int year) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
        this.borrowedBy = "";
        this.dueDate = null;
        this.reservedBy = "";
    }

    public Book(
            String isbn,
            String title,
            String author,
            int year,
            boolean available,
            String borrowedBy,
            LocalDate dueDate,
            String reservedBy
    ) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = available;
        this.borrowedBy = borrowedBy;
        this.dueDate = dueDate;
        this.reservedBy = reservedBy;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public int getYear() {
        return year;
    }

    public boolean isAvailable() {
        return available;
    }

    public String getBorrowedBy() {
        return borrowedBy;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public String getReservedBy() {
        return reservedBy;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public void setBorrowedBy(String borrowedBy) {
        this.borrowedBy = borrowedBy;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setReservedBy(String reservedBy) {
        this.reservedBy = reservedBy;
    }

    public boolean isOverdue() {
        return !available
                && dueDate != null
                && LocalDate.now().isAfter(dueDate);
    }

    public double calculateFine() {

        if (!isOverdue()) {
            return 0;
        }

        long overdueDays =
                java.time.temporal.ChronoUnit.DAYS.between(
                        dueDate,
                        LocalDate.now()
                );

        return overdueDays * 5.0;
    }

    public String toFileString() {

        String dueDateValue =
                dueDate == null ? "" : dueDate.toString();

        return isbn + "|" +
                title + "|" +
                author + "|" +
                year + "|" +
                available + "|" +
                borrowedBy + "|" +
                dueDateValue + "|" +
                reservedBy;
    }

    @Override
    public String toString() {

        String status;

        if (available) {
            status = "Available";

            if (!reservedBy.isEmpty()) {
                status += " | Reserved by: " + reservedBy;
            }

        } else {
            status = "Borrowed by: " + borrowedBy
                    + " | Due Date: " + dueDate;

            if (isOverdue()) {
                status += String.format(
                        " | OVERDUE | Fine: Rs. %.2f",
                        calculateFine()
                );
            }
        }

        return String.format(
                "ISBN: %s | Title: %s | Author: %s | Year: %d | %s",
                isbn,
                title,
                author,
                year,
                status
        );
    }
}