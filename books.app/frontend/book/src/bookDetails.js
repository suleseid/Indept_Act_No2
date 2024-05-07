import { fetchBookById } from "./Data/bookRepository.js";

function getBookIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
}

document.addEventListener("DOMContentLoaded", ()=> {
   const bookId =getBookIdFromUrl();
   if (bookId) {
    fetchBookById(bookId)
    .then((book)=>{
        document.getElementById("book-id").textContent =book.id;
        document.getElementById("book-isbn").textContent =book.isbn;
        document.getElementById("book-title").textContent =book.title;
        document.getElementById("book-author").textContent =book.author;
        document.getElementById("book-description").textContent =book.description;
        document.getElementById("book-thumbnail").textContent =book.thumbnail;
    })
    .catch((error)=>{
        console.error("Failed to fetch book details:", error);
        document.getElementById("app").innerHTML =
          "Failed to load book details.";
    });
   }
   else
   {
    console.error("No book ID provided in the URL.");
   }

});