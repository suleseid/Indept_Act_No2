import { deleteBook } from "./Data/bookRepository.js";

document.getElementById("delete-book-form")
        .addEventListener("submit", function (event) {
           event.preventDefault(); // Prevent the form from submitting the traditional way
  
   const bookId = document.getElementById("id").value; // Get the Id from the form
   deleteBook(bookId)
    .then(() => {
      alert("Book deleted successfully!");
      window.location.href = "bookList.html"; // Redirect to the book list
    })
    .catch((error) => {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Please try again.");
    });
});
