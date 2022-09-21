let books = JSON.parse(localStorage.getItem("books"))
  ? JSON.parse(localStorage.getItem("books"))
  : [];

// function loadBooks() {
//   const booksContainerElement = document.getElementById('books');

//   const list = books.map(
//     (book) => `<div id="${book.id}" class="book">
//         <div class="book-title">${book.title}</div>
//         <div class="book-author">${book.author}</div>
//         <br />
//         <div class="remove_book-btn__container">
//           <button onclick="removeBook(${book.id})" class="remove_book-btn">Remove</button>
//         </div>
//     </div> <hr>`,
//   );
//   booksContainerElement.innerHTML = list.join('');
// }

// function populateLocalstorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
//   loadBooks();
// }

// function to add a book
// function addBook(bookObject) {
//   books.push(bookObject);
//   populateLocalstorage('books', books);
// }

// get form element to keep track of user submit action
// const form = document.getElementById('add-book-form');

// // get title element
// const titleElement = form.elements.title;

// // get author element
// const authorElement = form.elements.author;

// form.addEventListener('submit', (e) => {
//   // prevent form submission
//   e.preventDefault();
//   // get the count of books avilable in the books object
//   // so as to determine the id of the next book to be added
//   const booksCount = books.length;

//   // next book
//   let nextBookId = books[booksCount - 1]?.id ? books[booksCount - 1]?.id : 0;
//   nextBookId += 1;
//   // sample book object with title and author properties
//   const bookObj = {
//     id: nextBookId,
//     title: titleElement.value,
//     author: authorElement.value,
//   };

//   // call addBook function and pass this book
//   addBook(bookObj);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   loadBooks();
// });

// function removeBook(id) {
//   const booksAfterRemove = books.filter((book) => book.id !== id);
//   books = booksAfterRemove;
//   populateLocalstorage('books', booksAfterRemove);
// }
// removeBook();

class Main {
  constructor(author, title, id) {
    this.author = author;
    this.title = title;
    this.id = id;
  }

  static loadBooks() {
    const boos = document.getElementById("books");
    var maped = books.map(
      (ob) => `<div id="${ob.id}" class="book">
        <div class="book-title">${ob.title}</div>
          <div class="book-author">${ob.author}</div>
          <br />
          <div class="remove_book-btn__container">
            <button onclick="Main.removeBook(${ob.id})" class="remove_book-btn">Remove</button>
          </div>
        </div> <hr>
    `
    );
    boos.innerHTML = maped.join("");
  }

  static addBooks(obj) {
    books.push(obj);
    tolocal("books", books);
  }

  static removeBook(id) {
    const newbooks = books.filter((book) => book.id !== id);
    books = newbooks;
    tolocal("books", newbooks);
  }
}

function tolocal(x, y) {
  localStorage.setItem(x, JSON.stringify(y));
  Main.loadBooks();
}

const formx = document.getElementById("add-book-form");

formx.addEventListener("submit", (e) => {
  e.preventDefault();
  let booksCount = books.length;
  let nextBookId = books[booksCount - 1]?.id ? books[booksCount - 1]?.id : 0;
  nextBookId += 1;
  const Awesomebook = new Main(
    formx.author.value,
    formx.title.value,
    nextBookId
  );
  Main.addBooks(Awesomebook);
});

document.addEventListener("DOMContentLoaded", () => {
  Main.loadBooks();
});
tolocal();
