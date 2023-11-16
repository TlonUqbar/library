const classics = [
  ["1984", "George Orwell", 310], ["Frankenstein", "Mary Shelley", 224],
  ["Invisible Man", "Ralph Ellison", 568], ["Jane Eyre", "Charlotte Bronte", 328],
  ["Little Women", "Louisa May Alcott", 440], ["Moby-Dick", "Herman Melville", 372],
  ["Paradise Lost", "John Milton", 313], ["Siddhartha", "Herman Hesse", 152],
  ["The Bell Jar", "Sylvia Plath", 258], ["Metamorphoses", "Ovid", 576],
  ["The Great Gatsby", "F. Scott Fitzgerald", 193], ["The God of Small Things", "Arundhati Roy", 455],
  ["The Odyssey", "Homer", 270], ["Things Fall Apart", "Chinua Achebe", 192],
  ["The Sun Also Rises", "Ernest Hemingway", 247], ["Ulysses", "James Joyce", 682],
  ["The Picture of Dorian Grey", "Oscar Wilde", 240], ["Anna Karenina", "Leo Tolstoy", 462],
  ["The Complete Works of William Shakespeare", "William Shakespeare", 1312 ], ["Pride and Prejudice", "Jane Austen", 345],
  ["One Hundred Years of Solitude", "Gabriel Garcia Marquez", 432], ["Brave New World", "Aldous Huxley", 176 ],
  ["The Call of the Wild", "Jack London", 133], ["Crime and Punishment", "Fyodor Dostoyevsky", 442],
  ["Dracula", "Bram Stoker", 354], ["The Grapes of Wrath", "John Steinbeck", 464],
  ["Catch-22", "Joseph Heller", 569], ["The Lord of the Rings", "J.R.R. Tolkien", 407],
  ["The Adventures of Huckleberry Finn", "Mark Twain", 373], ["Alice's Adventures in Wonderland", "Lewis Caroll", 192],
  ["The Iliad", "Homer", 683], ["A Tale of Two Cities", "Charles Dickens", 379],
  ["The Secret Garden", "Frances Hodgson Burnett", 331], ["The Art of War", "Sun-Tzu", 197],
  ["The Time Machine", "H.G. Wells", 149], ["War and Peace", "Leo Tolstoy", 576],
  ["Breakfast of Champions", "Kurt Vonnegut", 320], ["Zen and the Art of Motorcycle Maintenance", "Robert Pirsig", 406],
  ["One Day in the Life Ivan Denisovich", "Alexander Solzhenitsyn", 151], ["The Godfather", "Mario Puzo", 448],
  ["Lost Illusions", "Honore de Balzac",389], ["Of Human Bondage", "Somerset Maugham", 776],
  ["The Outsiders", "S.E. Hinton", 224], ["Charlie and the Chocolate Factory", "Roald Dahl", 192],
  ["The Count of Monte Cristo", "Alexandre Dumas", 1276], ["One Flew Over The Cuckoo's Nest", "Ken Kesey", 311],
]

const empty = document.querySelector(".empty-list");
const cards = document.querySelectorAll(".card");
const choices = document.querySelectorAll(".choice");
const menuItems = document.querySelectorAll(".menu-item");
const gallery = document.querySelector("#gallery");

let library = [];
let randomClassics = [];


// Book Constructor
function Book(title, author="", pages=0, read="unread"){
  this.title = title;
  this.author = author;
  this.pages = pages; // integer
  this.read = read;  // string: read or unread
  this.isbn10 = null;  
  this.isbn13 = null;
  this.processed = null; // UserInput, OLAPI, NYTBAPI, Generated
  this.cover = null;
  this.info = () => { console.log(`"${this.title}" by ${this.author}, ${this.pages} pages and this book is ${this.read}, and it has ${ !this.cover ? "no cover image" : "cover image" }`) }
  this.changeStatus = (stutus) => { this.read = stutus };
  this.updatePages = (newPages) => { this.pages = newPages };
  this.process = (type) => { this.processed = type};
}


// Generator to get a random item from the collection/array
function* shuffle(array) {
  let i = array.length;

  while (i--) {
      yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
  }
}

const generateRandomPicks = (array, size) => {
  let copy = shuffle(array);
  let temp = [];
  for(let i=0; i<size; i++){
    temp.push( copy.next().value);
  }
  return temp;
}

function generateLibrary() {
  randomClassics.forEach( (arr) => { 
    let book = new Book(arr[0], arr[1], arr[2]);
    book.process("Generated");
    // library.push(book);  
    observedLibrary.push(book); // pushing to library via proxy
  })
}

function displayLibrary(){
  if( library.length === 0 ) return;

  empty.classList.add("hide");

  library.forEach( (book, index, array) => {
    const card = document.createElement("div");
    const ribbon = document.createElement("span");
    const header = document.createElement("div");
    const container = document.createElement("div");
    const cover = document.createElement("div");
    const coverAlt = document.createElement("span");
    const coverImg = document.createElement("img");
    const contents = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const actions = document.createElement("div");
    const trash = document.createElement("div");
    const trashIcon = document.createElement("span");
    const status = document.createElement("div");
    const statusIcon = document.createElement("span");

    card.classList = ["card"];
    card.dataset.libIndex = index;
    ribbon.classList = [`ribbon ${book.read}`];
    ribbon.textContent = book.read;
    header.classList = ["card-header cut-corner"];
    container.classList = ["card-container"];
    cover.classList = ["book-cover"];
  
    if( !book.cover ){
      coverAlt.classList = ["material-symbols-outlined img"]
      coverAlt.textContent = "local_library";
    } else {
      coverImg.classList = ""
      coverImg.src = book.cover;
    }
  
    contents.classList = ["card-contents"];
    title.classList = ["book-title"];
    title.textContent = book.title;
    author.classList = ["book-author"];
    author.textContent = book.author;
    pages.classList = ["book-pages"];
    pages.textContent = book.pages;
    actions.classList = ["card-actions"];
    trash.classList = ["trash"];
    trashIcon.classList = ["material-symbols-outlined md"];
    trashIcon.textContent = "delete";
    status.classList = ["status"];
    statusIcon.classList = ["material-symbols-outlined md"];
    statusIcon.textContent = "visibility";
  
    trash.append(trashIcon);
    status.append(statusIcon);
    actions.append(trash);
    actions.append(status);
    contents.append(title);
    contents.append(author);
    contents.append(pages);
    ( !book.cover ) ? cover.append(coverAlt) : cover.append(coverImg);
    container.append(cover);
    container.append(contents);
    container.append(actions);
    card.append(ribbon);
    card.append(header);
    card.append(container);
    gallery.append(card);
  
    trash.addEventListener("click", (e) => removeItem(e) );
    status.addEventListener("click", (e) => changeStatus(e) );
  } )
}

const removeItem = (e) => {
  e.preventDefault();
  let card = e.target.parentNode.parentNode.parentNode;
  let index = card.dataset.libIndex;
  library.splice(index,1);  
  libraryStats();  
  gallery.querySelectorAll(".card").forEach( (card) => card.remove() );
  displayLibrary();  // redraw library contents
  if( library.length === 0) empty.classList.remove("hide"); // when empty show empty message
}


const changeStatus = (e) => {
  e.preventDefault();
 
  let card = e.target.parentNode.parentNode.parentNode;
  let statusBanner = card.querySelector(".ribbon");
  let index = card.dataset.libIndex;
  
  if(statusBanner.classList.contains("read")){
    statusBanner.classList.replace("read", "unread");
    statusBanner.textContent = "unread";
    library[index].changeStatus("unread");
  } else{
    statusBanner.classList.replace("unread", "read");
    statusBanner.textContent = "read";
    library[index].changeStatus("read");
  }
  libraryStats();
}


const libraryStats = () => {
  let total_books = library.length;
  let total_read = library.filter( ({read}) => read === "read" ).length;
  let total_unread = library.filter( ({read}) => read === "unread" ).length;
  let manual_stats = library.filter( ({processed}) => processed === 'UserInput').length;
  let olapi_stats = library.filter( ({processed}) => processed === 'OLAPI').length;
  let nytapi_stats = library.filter( ({processed}) => processed === 'NYTAPI').length;
  let generated_stats = library.filter( ({processed}) => processed === 'Generated').length;
  const total = document.querySelector(".total-books");
  const read = document.querySelector(".total-read");
  const unread = document.querySelector(".total-unread");
  const manual = document.querySelector(".total-manual");
  const olapi = document.querySelector(".total-olapi");
  const nytapi = document.querySelector(".total-nytapi");
  const genrated = document.querySelector(".total-generated");
  total.textContent = total_books;
  read.textContent = total_read;
  unread.textContent = total_unread;
  manual.textContent = manual_stats;
  olapi.textContent = olapi_stats;
  nytapi.textContent = nytapi_stats;
  genrated.textContent = generated_stats;
}

const libraryObserver = {
  set: function(target, property, value) {
    if (property === 'length') {
    }
    target[property] = value;
    libraryStats();
    return true;
  }
};

const observedLibrary = new Proxy(library, libraryObserver);

//  Book Add via User Input and Book Modal
const addBookBtn = document.querySelector(".add-book");
const bookModal = document.querySelector("#book-form");
const closeBookModal = document.querySelector("#book-form .close");
const bookForm = document.querySelector("#book-form form");

addBookBtn.addEventListener("click", () => { bookModal.showModal() });
closeBookModal.addEventListener("click", () => { bookModal.close() } );
bookForm.addEventListener("submit", (e) => { addNewBook(e) });

const addNewBook = (e) => {
  e.preventDefault();
  const formFields = e.target.elements;
  let title = formFields.title.value;
  let author = formFields.author.value;
  let pages = formFields.pages.value;
  let status = formFields.status.value;
  let book = new Book(title, author, pages, status);

  book.processed = "UserInput";
  // library.push(book);
  observedLibrary.push(book);  // pushing via proxy
  gallery.querySelectorAll(".card").forEach( (card) => card.remove() );
  displayLibrary();  // remove all and redraw
  bookForm.reset();
  bookModal.close(); 
}



randomClassics = generateRandomPicks(classics, 10);
generateLibrary();
displayLibrary();


