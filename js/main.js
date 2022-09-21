class Awesomebooks {
  // object contructor metthod for setting object properties
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // class method to get book list
  static getBookList() {
    return JSON.parse(localStorage.getItem('books'))
      ? JSON.parse(localStorage.getItem('books'))
      : [];
  }

  // class method to get added book id
  static getAddedBookId() {
    const books = Awesomebooks.getBookList();
    const booksCount = books.length;
    const lastBookIndex = booksCount - 1;
    const lastAddedBookId = books[lastBookIndex]?.id
      ? books[lastBookIndex].id
      : 0;

    return lastAddedBookId + 1;
  }

  // class method to render book list on user interface
  static displayBookList() {
    const booksContainer = document.querySelector('.books-list');
    const bookData = Awesomebooks.getBookList();
    if (bookData.length) {
      const listOfBooks = bookData
        .map(
          (book) => `<div id="book_id" class="book">
            <div class="title-and-author">
            <div class="book-title">${book.title} by</div>
            <div class="book-author">${book.author}</div>
            </div>
          <br />
          <div class="remove_book-btn__container">
            <button onclick="Awesomebooks.removeBook(${book.id});" class="remove_book-btn">Remove</button>
          </div>
        </div><hr>`,
        )
        .join('');
      booksContainer.innerHTML = listOfBooks;
    } else {
      booksContainer.innerHTML = ' <span class="text-center"><i>No books added yet</i></span>';
    }
  }

  // class method to persist book data in the localstorage
  static sendToLocal(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
    Awesomebooks.displayBookList();
  }

  // class method to a book booklist
  static addBook(bookItem) {
    const bookData = Awesomebooks.getBookList();
    bookData.push(bookItem);
    // eslint-disable-next-line no-use-before-define
    Awesomebooks.sendToLocal('books', bookData);
  }

  // class method to remove a book from booklist
  /* eslint-disable-next-line no-unused-vars */
  static removeBook(id) {
    const bookData = Awesomebooks.getBookList();
    const filteredBooks = bookData.filter((item) => item.id !== id);
    // bookData = filteredBooks;

    // eslint-disable-next-line no-use-before-define
    Awesomebooks.sendToLocal('books', filteredBooks);
  }
}

// listens to page content loaded event
document.addEventListener('DOMContentLoaded', () => {
  Awesomebooks.displayBookList();
});

// listens to form submission event
document.getElementById('add-book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const bookId = Awesomebooks.getAddedBookId();
  const bookObject = new Awesomebooks(
    bookId,
    document.getElementById('title').value,
    document.getElementById('author').value,
  );
  Awesomebooks.addBook(bookObject);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});

// Add active class to the current button (highlight it)
// var header = document.querySelector('.nav-right__list-container');
const links = document.getElementsByClassName('nav__item');
for (let i = 0; i < links.length; i += 1) {
  links[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0]?.className?.replace(' active', '');
    this.className += ' active';
  });
}

/* eslint-disable-next-line no-unused-vars */
function toggleSection(domId) {
  if (domId === 'books-list') {
    document.getElementById('add-books').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('books-list').style.display = 'block';
  }

  if (domId === 'add-books') {
    document.getElementById('books-list').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('add-books').style.display = 'flex';
  }

  if (domId === 'contact') {
    document.getElementById('books-list').style.display = 'none';
    document.getElementById('add-books').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
  }
}
