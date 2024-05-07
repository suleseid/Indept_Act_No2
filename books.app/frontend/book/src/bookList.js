import { fetchAllBooks } from "./Data/bookRepository.js";

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document
      .getElementById("books-table")
      .getElementsByTagName("tbody")[0];
  
    fetchAllBooks()
      .then((books) => {
        books.forEach((book) => {
          let row = tableBody.insertRow();
          row.innerHTML = `
                  <td>${book.id}</td>
                  <td>${book.isbn}</td>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.description}</td>
                  <td>${book.thumbnail}</td>
                  <td>
                      <a href="bookDetails.html?id=${book.id}">Details</a> |
                      <a href="editBook.html?id=${book.id}">Edit</a>
                  </td>
              `;
        });
      })
      .catch((error) => {
        console.error("Failed to fetch books:", error);
        tableBody.innerHTML = `<tr><td colspan="5">Error loading books. Please try again later.</td></tr>`;
      });
  });
  