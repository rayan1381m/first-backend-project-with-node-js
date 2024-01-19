const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

let books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 2",
    publicationYear: "2000",
    genre: "Genre 1",
    is_available: true,
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 1",
    publicationYear: "2001",
    genre: "Genre 2",
    is_available: false,
  },
];

app.get("/books/:id", (req, res) => {
  const id = +req.params.id;
  console.log("id => ", id);
  const book = books.find((book) => book.id === id);
  if (book != null) {
    res.send(book);
  } else {
    res.status(404).send("No book found heheh");
  }
});

app.get("/books", (req, res) => {
  const { search, sortProperty, sortOrder } = req.query;

  let filteredBooks = [...books];

  if (search) {
    const searchQuery = search.toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery)
    );
  }

  if (sortProperty && sortOrder) {
    const property = sortProperty.toLowerCase();
    const order = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    //https://www.w3schools.com/jsref/jsref_sort.asp
    filteredBooks.sort((a, b) => {
      if (a[property] < b[property]) return -1 * order;
      if (a[property] > b[property]) return 1 * order;
      return 0;
    });
  }

  res.send(filteredBooks);
});

app.post("/books", (req, res) => {
  let nextId = +books[books.length - 1].id;
  const book = req.body;
  book.id = nextId++;
  books.push(book);
  res.send().status(204);
});

app.put("/books/:id", (req, res) => {
  const id = +req.params.id;
  const book = req.body;
 
  const currentBook = books.find((book) => book.id === id);
  if (!currentBook) {
    return res.status(404).send('Book not found');
  }
  const keys = Object.keys(book);
  keys.forEach((key) => {
    currentBook[key] = book[key];
  });
  res.send(currentBook);
 });

app.delete("/books/:id", (req, res) => {
  const id = +req.params.id;
  const findBook = books.find((product) => product.id === id);

  if (findBook == null) {
    return res.status(404).send("Book not found");
  } else {
    books = books.filter((product) => product.id !== id);
    res.send(books);
  }
});

app.patch("/books/:id", (req, res) => {
  const id = +req.params.id;
  const is_available = req.body.is_available;

  const currentBook = product.find((product) => product.id === id);
  currentBook.is_available = is_available;
  res.send(currentBook);
});

app.listen(port, function () {
  console.log("listening on port " + port);
});
