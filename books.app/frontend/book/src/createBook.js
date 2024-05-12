import { createBook } from "./Data/bookRepository";

document
  .getElementById("create-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const bookData = {
        id: parseInt(document.getElementById("id").value, 10),
        isbn: parseInt(document.getElementById("isbn").value, 10),
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        description: document.getElementById("description").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    console.log(bookData);

    createBook(bookData)
      .then((data) => {
        alert("Book created successfully!");
        window.location.href = "bookList.html"; // Redirect to the book list
      })
      .catch((error) => {
        console.error("Error creating book:", error);
        alert("Failed to create book. Please try again.");
      });
  });