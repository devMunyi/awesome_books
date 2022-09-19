const books = JSON.parse(localStorage.getItem('books'))
  ? JSON.parse(localStorage.getItem('books'))
  : [];

function loadBooks() {
  const booksContainerElement = document.getElementById('books');

  const list = books.map(
    (book) => `<div id="${book.id}" class="book">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <br />
        <div class="remove_book-btn__container">
          <button onclick="removeBook(${book.id})" class="remove_book-btn">Remove</button>
        </div>
    </div>`,
  );
  console.log('books html => ', list);

  booksContainerElement.innerHTML = list.join('');
}

function preFillInputs() {}

function populateLocalstorage(key, value, nextAction = '') {
  localStorage.setItem(key, JSON.stringify(value));
  console.log('nextAction ', nextAction);

  nextAction === 'loadBooks' ? loadBooks() : '';
  // nextAction === 'prefillinputs' ? preFillInputs() : '';
}

// function to add a book
function addBook(bookObject) {
  books.push(bookObject);
  populateLocalstorage('books', books, 'loadBooks');
}

// get form element to keep track of user submit action
const form = document.getElementById('add-book-form');

// get title element
const titleElement = form.elements.title;

// get author element
const authorElement = form.elements.author;

form.addEventListener('submit', (e) => {
  // prevent form submission
  e.preventDefault();
  // get the count of books avilable in the books object
  // so as to determine the id of the next book to be added
  const booksCount = books.length;

  // next book
  let nextBookId = books[booksCount - 1]?.id ? books[booksCount - 1]?.id : 0;
  nextBookId += 1;
  // sample book object with title and author properties
  const bookObj = {
    id: nextBookId,
    title: titleElement.value,
    author: authorElement.value,
  };

  // call addBook function and pass this book
  addBook(bookObj);
});

document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
});

const removeBtn = document.get;

function removeBook(id) {
  const booksAfterRemove = books.filter((book) => book.id !== id);
  // console.log('books list after delete ', booksAfterRemove);

  populateLocalstorage('books', booksAfterRemove);
  loadBooks();
}

// addBook(bookObj);

// // function to remove a book
// const removeBook = (id) => {
//   const booksAfterRemove = books.filter((book) => book.id !== id);
//   //update books with books list after one is removed
//   books = booksAfterRemove;
// };

// removeBook(1);
// console.log('BOOKS => ', books);

// const booksInputFields = document.querySelectorAll('.book-input');

// booksInputFields.forEach((inputField) => {
//   inputField.addEventListener('change', () => {
//     const formDataObj = {
//       title: titleElement.value,
//       author: authorElement.value,
//     };
//     populateLocalstorage('formData', formDataObj);
//   });
// });

// function populateInputFields() {
//   const formData = JSON.parse('formData');

//   titleElement.value = formData.title;
//   authorElement.value = formData.author;
// }

// if (!localStorage('formData')) {
//   populateLocalstorage();
// } else {
//   populateInputFields();
// }
