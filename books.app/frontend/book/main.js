import { fetchAllBooks } from "./src/Data/bookRepository.js";

// Simple function to show initial data or set up components
function initializeApp() {
  fetchAllBooks()
    .then((books) => {
      const app = document.querySelector("#app");
      const bookList = books
        .map((book) => `<li>${book.name}</li>`)
        .join("");
      app.innerHTML += `<ul>${bookList}</ul>`;
    })
    .catch((error) => {
      console.error("Failed to fetch students:", error);
    });
}

initializeApp();
