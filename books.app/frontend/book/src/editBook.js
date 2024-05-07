import { fetchBookById, updateBook } from "./Data/bookRepository.js";

function getBookIdFromUrl(){
   const queryParams = new URLSearchParams(window.location.search);
   return queryParams.get("bookId");
}

 document.addEventListener("DOMContentLoaded", () => {
  const bookId = getBookIdFromUrl();
   if (bookId) {
    fetchBookById(bookId)
      .then((book) => {
        document.getElementById("id").value = book.id;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("description").value = book.description;
        document.getElementById("thumbnail").value = book.thumbnail;
      })
      .catch((error) => {
        console.error("Failed to fetch book for editing:", error);
        alert("Failed to load book data.");
      });

    document
      .getElementById("edit-book-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const updatedBookData = {
          id: parseInt(document.getElementById("id").value, 10),
          isbn: parseInt(document.getElementById("isbn").value, 10),
          title: document.getElementById("title").value,
          author: document.getElementById("author").value,
          description: document.getElementById("description").value,
          thumbnail: document.getElementById("thumbnail").value,
        };

        updateBook(bookId, updatedBookData)
          .then((data) => {
            alert("Book updated successfully!");
            window.location.href = "BookList.html"; // Redirect to the book list
          })
          .catch((error) => {
            console.error("Error updating book:", error);
            alert("Failed to update book. Please try again.");
          });
      });
  } 
  else 
  {
    console.error();
  }
  
});
