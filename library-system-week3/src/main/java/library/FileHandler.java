package library;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FileHandler {

    private static final String DATA_DIRECTORY = "data";

    private static final String BOOKS_FILE =
            DATA_DIRECTORY + File.separator + "books.txt";

    private static final String MEMBERS_FILE =
            DATA_DIRECTORY + File.separator + "members.txt";


    public FileHandler() {
        createDataDirectory();
    }


    private void createDataDirectory() {

        File directory =
                new File(DATA_DIRECTORY);

        if (!directory.exists()) {

            boolean created =
                    directory.mkdirs();

            if (created) {

                System.out.println(
                        "Data directory created successfully."
                );
            }
        }
    }


    // ==========================================
    // SAVE BOOKS
    // ==========================================

    public void saveBooks(List<Book> books) {

        try (
                BufferedWriter writer =
                        new BufferedWriter(
                                new FileWriter(BOOKS_FILE)
                        )
        ) {

            for (Book book : books) {

                writer.write(
                        book.toFileString()
                );

                writer.newLine();
            }

        } catch (IOException e) {

            System.out.println(
                    "Error saving books: "
                            + e.getMessage()
            );
        }
    }


    // ==========================================
    // LOAD BOOKS
    // ==========================================

    public List<Book> loadBooks() {

        List<Book> books =
                new ArrayList<>();

        File file =
                new File(BOOKS_FILE);

        if (!file.exists()) {
            return books;
        }

        try (
                BufferedReader reader =
                        new BufferedReader(
                                new FileReader(file)
                        )
        ) {

            String line;

            while (
                    (line = reader.readLine())
                            != null
            ) {

                if (line.trim().isEmpty()) {
                    continue;
                }

                String[] parts =
                        line.split(
                                "\\|",
                                -1
                        );

                if (parts.length < 8) {
                    continue;
                }

                String isbn =
                        parts[0];

                String title =
                        parts[1];

                String author =
                        parts[2];

                int year =
                        Integer.parseInt(parts[3]);

                boolean available =
                        Boolean.parseBoolean(parts[4]);

                String borrowedBy =
                        parts[5];

                LocalDate dueDate =
                        parts[6].isEmpty()
                                ? null
                                : LocalDate.parse(
                                parts[6]
                        );

                String reservedBy =
                        parts[7];

                Book book =
                        new Book(
                                isbn,
                                title,
                                author,
                                year,
                                available,
                                borrowedBy,
                                dueDate,
                                reservedBy
                        );

                books.add(book);
            }

        } catch (
                IOException |
                NumberFormatException e
        ) {

            System.out.println(
                    "Error loading books: "
                            + e.getMessage()
            );
        }

        return books;
    }


    // ==========================================
    // SAVE MEMBERS
    // ==========================================

    public void saveMembers(
            List<Member> members
    ) {

        try (
                BufferedWriter writer =
                        new BufferedWriter(
                                new FileWriter(
                                        MEMBERS_FILE
                                )
                        )
        ) {

            for (Member member : members) {

                writer.write(
                        member.toFileString()
                );

                writer.newLine();
            }

        } catch (IOException e) {

            System.out.println(
                    "Error saving members: "
                            + e.getMessage()
            );
        }
    }


    // ==========================================
    // LOAD MEMBERS
    // ==========================================

    public List<Member> loadMembers() {

        List<Member> members =
                new ArrayList<>();

        File file =
                new File(MEMBERS_FILE);

        if (!file.exists()) {
            return members;
        }

        try (
                BufferedReader reader =
                        new BufferedReader(
                                new FileReader(file)
                        )
        ) {

            String line;

            while (
                    (line = reader.readLine())
                            != null
            ) {

                if (line.trim().isEmpty()) {
                    continue;
                }

                String[] parts =
                        line.split(
                                "\\|",
                                -1
                        );

                if (parts.length < 4) {
                    continue;
                }

                String id =
                        parts[0];

                String name =
                        parts[1];

                String phone =
                        parts[2];

                List<String> borrowedBooks =
                        new ArrayList<>();

                if (!parts[3].isEmpty()) {

                    borrowedBooks.addAll(
                            Arrays.asList(
                                    parts[3].split(",")
                            )
                    );
                }

                Member member =
                        new Member(
                                id,
                                name,
                                phone,
                                borrowedBooks
                        );

                members.add(member);
            }

        } catch (IOException e) {

            System.out.println(
                    "Error loading members: "
                            + e.getMessage()
            );
        }

        return members;
    }
}