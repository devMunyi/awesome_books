let bookData = JSON.parse(localStorage.getItem('books'))
  ? JSON.parse(localStorage.getItem('books'))
  : [];

class Awesomebooks {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static createBooks() {
    const booksContainer = document.querySelector('.books-list');
    if (bookData.length) {
      const displayBooks = bookData
        .map(
          (book) => `<div id="book_id" class="book">
            <div class="title-and-author">
            <div class="book-title">${book.title} by</div>
            <div class="book-author">${book.author}</div>
            </div>
          <br />
          <div class="remove_book-btn__container">
            <button onclick="Awesomebooks.delBook(${book.id});" class="remove_book-btn">Remove</button>
          </div>
        </div><hr>`,
        )
        .join('');
      booksContainer.innerHTML = displayBooks;
    } else {
      booksContainer.innerHTML = ' <span class="text-center"><i>No books added yet</i></span>';
    }
  }

  // Method to add books
  static addBook(bookItem) {
    bookData.push(bookItem);
    // eslint-disable-next-line no-use-before-define
    sendToLocal('books', bookData);
  }

  // Method to delete books
  // eslint-disable-next-line no-unused-vars
  static delBook(id) {
    const filteredBooks = bookData.filter((item) => item.id !== id);
    bookData = filteredBooks;
    // eslint-disable-next-line no-use-before-define
    sendToLocal('books', filteredBooks);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  Awesomebooks.createBooks();
});
function sendToLocal(a, b) {
  localStorage.setItem(a, JSON.stringify(b));
  Awesomebooks.createBooks();
}
document.getElementById('add-book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nextBookId = bookData.length + 1;

  const bookObject = new Awesomebooks(
    nextBookId,
    document.getElementById('title').value,
    document.getElementById('author').value,
  );
  Awesomebooks.addBook(bookObject);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});
Awesomebooks.delBook();
