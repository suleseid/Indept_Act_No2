const API_BASE_URL ="http://localhost:3000";

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// Fetch all books
function fetchAllBooks() {
  return fetch(`${API_BASE_URL}/books`)
    .then(handleResponse)
    .catch((error) => {
      console.error("Error fetching all books:", error);
      throw error; // This allow to call or display error message
    });
}

// Fetch a single book by Id
function fetchBookById(bookId) {
  return fetch(`${API_BASE_URL}/books/${bookId}`)
    .then(handleResponse)
    .catch((error) => {
      console.error("Error fetching book by Id:", error);
      throw error; // This allow to call or display error message
    });
}

// Create a new book
function createBook(bookData) {
  return fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Error creating new book:", error);
      throw error; // This allow to call or display error message
    });
}

// Update an existing book
function updateBook(bookId, bookData) {
    return fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then(handleResponse)
      .catch((error) => {
        console.error("Error updating book:", error);
        throw error; // Re-throw to allow caller to handle or display error message
      });
  }

// Delete a book by ID
function deleteBook(bookId) {
    return fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "DELETE",
    })
      .then(handleResponse)
      .catch((error) => {
        console.error("Error deleting book:", error);
        throw error; // Re-throw to allow caller to handle or display error message
      });
  }

export { fetchAllBooks, fetchBookById, createBook, updateBook, deleteBook, };