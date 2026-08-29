package library;

import java.util.List;
import java.util.Scanner;

public class Main {

    private static final Scanner scanner =
            new Scanner(System.in);

    private static final Library library =
            new Library();


    public static void main(String[] args) {

        System.out.println(
                "\n=========================================="
        );

        System.out.println(
                "   LIBRARY MANAGEMENT SYSTEM"
        );

        System.out.println(
                "=========================================="
        );


        boolean running =
                true;


        while (running) {

            displayMenu();


            int choice =
                    getIntInput(
                            "Enter your choice: "
                    );


            switch (choice) {

                case 1:
                    addBook();
                    break;

                case 2:
                    library.displayAllBooks();
                    break;

                case 3:
                    searchBooks();
                    break;

                case 4:
                    removeBook();
                    break;

                case 5:
                    registerMember();
                    break;

                case 6:
                    library.displayAllMembers();
                    break;

                case 7:
                    borrowBook();
                    break;

                case 8:
                    returnBook();
                    break;

                case 9:
                    reserveBook();
                    break;

                case 10:
                    library.displayStatistics();
                    break;

                case 11:
                    library.exportBooksToCSV();
                    break;

                case 12:

                    System.out.println(
                            "\nThank you for using Library Management System!"
                    );

                    running = false;

                    break;

                default:

                    System.out.println(
                            "Invalid choice! Please select a valid option."
                    );
            }

            if (running) {

                pressEnterToContinue();
            }
        }


        scanner.close();
    }


    // ==========================================
    // MENU
    // ==========================================

    private static void displayMenu() {

        System.out.println(
                "\n=========================================="
        );

        System.out.println(
                "              MAIN MENU"
        );

        System.out.println(
                "=========================================="
        );

        System.out.println(
                "1.  Add New Book"
        );

        System.out.println(
                "2.  View All Books"
        );

        System.out.println(
                "3.  Search Books"
        );

        System.out.println(
                "4.  Remove Book"
        );

        System.out.println(
                "5.  Register Member"
        );

        System.out.println(
                "6.  View All Members"
        );

        System.out.println(
                "7.  Borrow Book"
        );

        System.out.println(
                "8.  Return Book"
        );

        System.out.println(
                "9.  Reserve Book"
        );

        System.out.println(
                "10. View Library Statistics"
        );

        System.out.println(
                "11. Export Books to CSV"
        );

        System.out.println(
                "12. Exit"
        );

        System.out.println(
                "=========================================="
        );
    }


    // ==========================================
    // ADD BOOK
    // ==========================================

    private static void addBook() {

        System.out.println(
                "\n--- ADD NEW BOOK ---"
        );


        String isbn =
                getNonEmptyInput(
                        "Enter ISBN: "
                );


        String title =
                getNonEmptyInput(
                        "Enter Title: "
                );


        String author =
                getNonEmptyInput(
                        "Enter Author: "
                );


        int year =
                getValidYear();


        Book book =
                new Book(
                        isbn,
                        title,
                        author,
                        year
                );


        library.addBook(book);
    }


    // ==========================================
    // REMOVE BOOK
    // ==========================================

    private static void removeBook() {

        System.out.println(
                "\n--- REMOVE BOOK ---"
        );


        String isbn =
                getNonEmptyInput(
                        "Enter ISBN of the book: "
                );


        library.removeBook(
                isbn
        );
    }


    // ==========================================
    // SEARCH BOOK
    // ==========================================

    private static void searchBooks() {

        System.out.println(
                "\n--- SEARCH BOOKS ---"
        );


        String keyword =
                getNonEmptyInput(
                        "Enter title, author, or ISBN: "
                );


        List<Book> results =
                library.searchBooks(
                        keyword
                );


        library.displaySearchResults(
                results
        );
    }


    // ==========================================
    // REGISTER MEMBER
    // ==========================================

    private static void registerMember() {

        System.out.println(
                "\n--- REGISTER MEMBER ---"
        );


        String id =
                getNonEmptyInput(
                        "Enter Member ID: "
                );


        String name =
                getNonEmptyInput(
                        "Enter Member Name: "
                );


        String phone =
                getValidPhone();


        Member member =
                new Member(
                        id,
                        name,
                        phone
                );


        library.registerMember(
                member
        );
    }


    // ==========================================
    // BORROW BOOK
    // ==========================================

    private static void borrowBook() {

        System.out.println(
                "\n--- BORROW BOOK ---"
        );


        String isbn =
                getNonEmptyInput(
                        "Enter Book ISBN: "
                );


        String memberId =
                getNonEmptyInput(
                        "Enter Member ID: "
                );


        library.borrowBook(
                isbn,
                memberId
        );
    }


    // ==========================================
    // RETURN BOOK
    // ==========================================

    private static void returnBook() {

        System.out.println(
                "\n--- RETURN BOOK ---"
        );


        String isbn =
                getNonEmptyInput(
                        "Enter Book ISBN: "
                );


        library.returnBook(
                isbn
        );
    }


    // ==========================================
    // RESERVE BOOK
    // ==========================================

    private static void reserveBook() {

        System.out.println(
                "\n--- RESERVE BOOK ---"
        );


        String isbn =
                getNonEmptyInput(
                        "Enter Book ISBN: "
                );


        String memberId =
                getNonEmptyInput(
                        "Enter Member ID: "
                );


        library.reserveBook(
                isbn,
                memberId
        );
    }


    // ==========================================
    // VALID INTEGER INPUT
    // ==========================================

    private static int getIntInput(
            String message
    ) {

        while (true) {

            System.out.print(
                    message
            );


            String input =
                    scanner.nextLine()
                            .trim();


            try {

                return Integer.parseInt(
                        input
                );

            } catch (
                    NumberFormatException e
            ) {

                System.out.println(
                        "Invalid input! Please enter a number."
                );
            }
        }
    }


    // ==========================================
    // NON EMPTY INPUT
    // ==========================================

    private static String getNonEmptyInput(
            String message
    ) {

        while (true) {

            System.out.print(
                    message
            );


            String input =
                    scanner.nextLine()
                            .trim();


            if (!input.isEmpty()) {

                return input;
            }


            System.out.println(
                    "Input cannot be empty!"
            );
        }
    }


    // ==========================================
    // YEAR VALIDATION
    // ==========================================

    private static int getValidYear() {

        while (true) {

            int year =
                    getIntInput(
                            "Enter Publication Year: "
                    );


            if (
                    year >= 1000
                            &&
                            year <= 2026
            ) {

                return year;
            }


            System.out.println(
                    "Please enter a valid year between 1000 and 2026."
            );
        }
    }


    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    private static String getValidPhone() {

        while (true) {

            String phone =
                    getNonEmptyInput(
                            "Enter Phone Number: "
                    );


            if (
                    phone.matches(
                            "[0-9]{10,15}"
                    )
            ) {

                return phone;
            }


            System.out.println(
                    "Invalid phone number! Enter 10 to 15 digits."
            );
        }
    }


    // ==========================================
    // PAUSE
    // ==========================================

    private static void pressEnterToContinue() {

        System.out.println(
                "\nPress Enter to continue..."
        );

        scanner.nextLine();
    }
}