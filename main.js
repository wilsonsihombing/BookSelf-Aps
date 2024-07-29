const books = [];
const RENDER_EVENT = "render-book";
const SAVED_BOOK = "saved-book";
const STORAGE_KEY = "my_book";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const listUncompleted = document.getElementById("incompleteBookshelfList");
  listUncompleted.innerHTML = "";

  const listCompleted = document.getElementById("completeBookshelfList");
  listCompleted.innerHTML = "";

  for (const bookItem of books) {
    const newBook = makeBook(bookItem);
    if (!bookItem.isComplete) {
      listUncompleted.append(newBook);
    } else {
      listCompleted.append(newBook);
    }
  }
});

document.addEventListener(SAVED_BOOK, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const bookObject = generateBookObject(
    generateId(),
    title,
    author,
    year,
    isComplete
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function makeBook(bookItem) {
  const title = document.createElement("h3");
  title.innerText = bookItem.title;

  const author = document.createElement("p");
  author.innerText = `Penulis: ${bookItem.author}`;

  const year = document.createElement("p");
  year.innerText = `Tahun: ${bookItem.year}`;

  const container = document.createElement("div");
  container.classList.add("book_item");
  container.append(title, author, year);

  const action = document.createElement("div");
  action.classList.add("action");
  container.append(action);
  container.setAttribute("id", `book-${bookItem.id}`);

  if (bookItem.isComplete) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("green");
    undoButton.innerText = "Belum selesai dibaca";

    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(bookItem.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("red");
    trashButton.innerText = "Hapus buku";

    trashButton.addEventListener("click", function () {
      removeBookFromCompleted(bookItem.id);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("blue");
    editButton.innerText = "Edit buku";

    editButton.addEventListener("click", function () {
      editBook(bookItem.id);
    });

    action.append(undoButton, trashButton, editButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("green");
    checkButton.innerText = "Selesai dibaca";

    checkButton.addEventListener("click", function () {
      addBookToCompleted(bookItem.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("red");
    trashButton.innerText = "Hapus buku";

    trashButton.addEventListener("click", function () {
      removeBookFromCompleted(bookItem.id);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("blue");
    editButton.innerText = "Edit buku";

    editButton.addEventListener("click", function () {
      editBook(bookItem.id);
    });

    action.append(checkButton, trashButton, editButton);
  }

  return container;
}

function addBookToCompleted(id) {
  const bookTarget = findBook(id);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(id) {
  for (const bookItem of books) {
    if (bookItem.id === id) {
      return bookItem;
    }
  }
  return null;
}

function removeBookFromCompleted(id) {
  const bookTarget = findBookIndex(id);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookFromCompleted(id) {
  const bookTarget = findBook(id);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookIndex(id) {
  for (const index in books) {
    if (books[index].id === id) {
      return index;
    }
  }

  return -1;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_BOOK));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookItem of data) {
      books.push(bookItem);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function searchBook() {
  const search = document.getElementById("searchBookTitle").value;
  const listUncompleted = document.getElementById("incompleteBookshelfList");
  listUncompleted.innerHTML = "";

  const listCompleted = document.getElementById("completeBookshelfList");
  listCompleted.innerHTML = "";

  for (const bookItem of books) {
    if (bookItem.title.toLowerCase().includes(search.toLowerCase())) {
      const newBook = makeBook(bookItem);
      if (!bookItem.isComplete) {
        listUncompleted.append(newBook);
      } else {
        listCompleted.append(newBook);
      }
    }
  }
}

function editBook(id) {
  const bookTarget = findBook(id);
  const title = document.getElementById("inputBookTitle");
  const author = document.getElementById("inputBookAuthor");
  const year = document.getElementById("inputBookYear");
  const isComplete = document.getElementById("inputBookIsComplete");

  title.value = bookTarget.title;
  author.value = bookTarget.author;
  year.value = bookTarget.year;
  isComplete.checked = bookTarget.isComplete;

  removeBookFromCompleted(id);
}
