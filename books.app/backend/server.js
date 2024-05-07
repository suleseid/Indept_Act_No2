const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// function to load book data from JSON file
function loadBooks() {
  return JSON.parse(fs.readFileSync("./books.json", "utf8"));
}

// function that saves books data to JSON file
function saveBooks(books) {
  //validate the data before saving
  fs.writeFileSync("./books.json", JSON.stringify(books), "utf8");
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cors is a node.js package  used for Connect/Express middleware.
//It allows us to handle request from different origins.
//It is a way to ensure the security restrictions on the browser.
//Our client will not be able to access the api without our permission(used to be enable).
app.use(cors()); // Enable CORS


// Lets Get all books
app.get("/books", (req, res) => {
  const books = loadBooks();
  res.json(books);
});

// lets Get a single book by ID
app.get("/books/:id", (req, res) => {
    const books = loadBooks();
    //get requests pass data in req.params
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
      res.json(book);
    } else {
      res.books(404).send("Book do not found");
    }
  });
  
  //lets Create a new book
  app.post("/books", (req, res) => {
    const books = loadBooks();
    //post requests pass data in req.body
    const book = req.body;
    console.log("Received book:", book);
    //Assign a unique ID to the book (This is usually handled by the database)
    book.id = books.length + 1;
    books.push(book);
    saveBooks(books);
    //201 status code is used to indicate that a new resource has been created.
    res.status(201).send(books);
  });
  
  //lets Update an existing books
  //when we passes the put request through id, 
  //the data in the body find the index of the book
  //we want update
app.put("/books/:id", (req, res) => {
  let books = loadBooks();
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  //if the book is found, update the book with the new data
  if (index !== -1) {
    //update the book at index with the data from the request body
    books[index] = { ...books[index], ...req.body };
    saveBooks(books);
    res.send(books[index]);
  } else {
    res.status(404).send("Book not found");
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  let books = loadBooks();
  //create a new array of all books except the one with the id passed in the request
  const filteredBooks = books.filter(
    (book) => book.id !== parseInt(req.params.id)
  );
  //if the lengths do not match, it means a book was deleted
  if (books.length !== filteredBooks.length) {
    saveBooks(filteredBooks);
    res.status(200).send({ message: "Book deleted successfully" });
  } else {
    res.status(404).send("Book not found");
  }
});

//lets start a server
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
