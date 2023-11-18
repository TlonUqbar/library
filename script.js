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


/******************************************************************|
/             Core Library Functions                               |
*******************************************************************/

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
  this.info = () => { console.log(`"${this.title}" by ${this.author}, ${this.pages} pages and status is ${this.read}, and has ${!this.cover ? "no cover image" : "cover image"}`)};
  this.changeStatus = (stutus) => { this.read = stutus };
  this.updatePages = (newPages) => { this.pages = newPages };
  this.process = (type) => { this.processed = type};
  this.updateCover = (newCover) => { this.cover = newCover};
}

// Generator to get a random item from the collection/array
function* shuffle(array) {
  let i = array.length;

  while (i--) {
      yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
  }
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
    let bookPages = ( book.pages ) ? book.pages + " pages" : null;
    pages.textContent = bookPages;
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
  })
}

function refresh(){
  libraryStats();  // update stats
  gallery.querySelectorAll(".card").forEach( (card) => card.remove() ); // remove all
  displayLibrary();  // redraw library contents
}

const removeItem = (e) => {
  e.preventDefault();
  let card = e.target.parentNode.parentNode.parentNode;
  let index = card.dataset.libIndex;
  library.splice(index,1);  
  refresh();
  if( library.length === 0) empty.classList.remove("hide"); // show empty library message
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
  document.querySelector(".total-books").textContent = total_books;;
  document.querySelector(".total-read").textContent = total_read;
  document.querySelector(".total-unread").textContent = total_unread;
  document.querySelector(".total-manual").textContent = manual_stats;
  document.querySelector(".total-olapi").textContent = olapi_stats;
  document.querySelector(".total-nytapi").textContent = nytapi_stats;
  document.querySelector(".total-generated").textContent = generated_stats;
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


/******************************************************************|
/       Auto Generate Library  ( Auto Generate Modal)              |
*******************************************************************/



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

// randomClassics = generateRandomPicks(classics, 10);
// generateLibrary();

const generateBtn = document.querySelector(".generate");
const choiceGenerate = document.querySelector(".choice-generate");
const generateModal = document.querySelector("#auto-generate");
const closeGenModal = document.querySelector("#auto-generate .close");
const emptyLib = document.querySelector("#gen1");
const notEmptyLib = document.querySelector("#gen2");
const newLibrary = document.querySelector("#new-library");

generateBtn.addEventListener("click", () => { generatorCheck() });
choiceGenerate.addEventListener("click", () => { generatorCheck() });
closeGenModal.addEventListener("click", () => { 
  generateModal.close();
  emptyLib.classList = ["dialog-card"];
  notEmptyLib.classList = ["dialog-card hide"];
});

const generatorCheck = () => {
  if( library.length !== 0 ){
    emptyLib.classList = ["dialog-card hide"];
    notEmptyLib.classList = ["dialog-card"];
  } 
  generateModal.showModal();
}

const userGenerated = (e) => {
  e.preventDefault();
  let value = e.target.elements.gen.value;
  randomClassics = generateRandomPicks(classics, value);
  newLibrary.reset();
  generateLibrary();
  refresh();
  generateModal.close();
}

newLibrary.addEventListener("submit", (e) => userGenerated(e) );

/******************************************************************|
/   Add New Book via User Input using Modal (Add Book Modal)       |
*******************************************************************/

const addBookBtn = document.querySelector(".add-book");
const choiceAdd = document.querySelector(".choice-add");
const bookModal = document.querySelector("#book-form");
const closeBookModal = document.querySelector("#book-form .close");
const bookForm = document.querySelector("#book-form form");

addBookBtn.addEventListener("click", () => { bookModal.showModal() });
choiceAdd.addEventListener("click", () => { bookModal.showModal() });
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
  book.process("UserInput");
  // library.push(book);
  observedLibrary.push(book);  // pushing via proxy
  refresh();
  bookForm.reset();
  bookModal.close(); 
}

/******************************************************************|
/ NYTimes Booklist API and related functions and Suggestions Modal |
*******************************************************************/

let NYTimesBooks = JSON.parse(localStorage.getItem("NYTBooks"));
let listURL = "https://api.nytimes.com/svc/books/v3/lists/overview.json"
let key = "?api-key=pHsIBLoI7Z6nek1XOKNkQljEnuQHRDmJ"
let listResults = '';
let listNames = [];
let formattedResults = [];
let suggestedBooks = [];
let randomSuggestions = [];
const listKeys = ["list_name", "books"];
const bookKeys = ["author", "book_image", "primary_isbn13", "primary_isbn10", "publisher", "rank", "title", "list_name", "pages"]

const suggestBtn = document.querySelector(".suggest");
const choiceSuggest = document.querySelector(".choice-suggest");
const suggestDialog = document.querySelector("#suggestions");
const closeSuggestModal  = document.querySelector("#suggestions .close");

const clearSuggestions = () => {
  const dialog = document.querySelector("#suggestions > .dialog > .dialog-content");
  dialog.innerHTML = '';
  randomSuggestions = [];
  NYTimesBooks = JSON.parse(localStorage.getItem("NYTBooks"));
}

suggestBtn.addEventListener("click", () => { populateSuggestions(); suggestDialog.showModal(); } );
choiceSuggest.addEventListener("click", () => { populateSuggestions(); suggestDialog.showModal(); } );
closeSuggestModal.addEventListener("click", () => { suggestDialog.close(); clearSuggestions(); });


function fetchBooks(){
  // If list exists in localStorage skip API call
  if( NYTimesBooks )  return; 
  
  fetch(`${listURL}${key}`, {method: "GET", mode: 'cors', headers: [
      ["Content-Type", "application/json"], ["Content-Type", "text/plain"] ] })
      .then( (response) => response.json() )
      .then( (json) => { listResults = json; console.log("results",json); })
      .then( () => { listResults.results.lists.forEach(elem => listNames.push(elem)) })
      .then( () => { listNames.forEach(obj => formattedResults.push(extract(obj, ...listKeys)))})
      .then( () => extractBooks() )
      .then( () => getRandomBooks(suggestedBooks, 10))
      .then( () => localStorage.setItem("NYTBooks", JSON.stringify(suggestedBooks)) )
      .catch( error => console.log('Request failed', error));
}

const extractBooks = () => {
  formattedResults.forEach( (list) => {
  let listname = list.list_name;
    list.books.forEach( (book) => {
      suggestedBooks.push(extract( book, listname,...bookKeys));
    })
  })
};

const extract = (obj, name="", ...keys) => {
  const newObject = Object.assign({});
  Object.keys(obj).forEach((key) => {
    if( name ){
      newObject["list_name"] = name;
      newObject["pages"] = 0;
    }
    if(keys.includes(key)){
        newObject[key] = obj[key];
        delete obj[key];
     };
  });
  return newObject;
};

const getRandomBooks = (array, size) => {
  let smallSet = shuffle(array);
  for(let i=0; i<size; i++){
    randomSuggestions.push( smallSet.next().value);
  }
  return randomSuggestions;
}

function populateSuggestions(){
  if( NYTimesBooks == null ){
    fetchBooks(); // this call should only be made once
  } else {
    getRandomBooks(NYTimesBooks, 10); // generate list every time
  }

  const dialog = document.querySelector("#suggestions > .dialog > .dialog-content");
  const heading = document.createElement("div");

  heading.classList = ["heading"];
  heading.textContent = "NYTimes Suggestions";
  dialog.append(heading);

  randomSuggestions.forEach( (book, index, array ) => {
    const card = document.createElement("div");
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const button = document.createElement("a");
    const check = document.createElement("div");

    check.classList = ["checkmark"];
    check.innerHTML = "<span class=\"material-symbols-outlined checked\">check</span>";
    button.dataset.index = index;
    img.src = book.book_image;
    title.textContent = book.title;
    author.textContent = book.author;
    imgDiv.append(img);
    imgDiv.classList = ["sbook-img"];
    title.classList = ["sbook-title"];
    author.classList = ["sbook-author"];
    button.classList = ["add"];
    button.textContent = "Add";
    button.dataset.index = index;
    card.classList = (index%2 === 0) ?  ["dialog-card even"] : ["dialog-card odd"]; 
    card.append(imgDiv);
    card.append(title);
    card.append(author);
    card.append(button);
    dialog.append(card);

    button.addEventListener("click", (e) => { 
      addSuggestedBook(e, button.dataset.index);
      button.remove();
      card.append(check);
    });
  })
}

const addSuggestedBook = (e, index) => {
  e.preventDefault();
  let title = randomSuggestions[index].title;
  let author = randomSuggestions[index].author;
  let cover = randomSuggestions[index].book_image;
  let isbn13 = randomSuggestions[index].primary_isbn13;
  let isbn10 = randomSuggestions[index].primary_isbn10;
  let book = new Book(title, author);
  book.cover = cover;
  book.isbn10 = isbn10;
  book.isbn13 = isbn13;
  book.process("NYTAPI");
  let isbn = ( !isbn13) ? isbn10 : isbn13;
  updatePages(book, isbn);
  observedLibrary.push(book);
}

function updatePages(book, isbn){
  const url = `https://openlibrary.org/search.json?q=${isbn}&fields=number_of_pages_median&availability&limit=1`;
  let isbnResults = '';

  fetch(`${url}`, {method: "GET", mode: "cors", headers: [] })
  .then( (response) => response.json() )
  .then( (json) => { isbnResults = json; })
  .then( () => book.updatePages(isbnResults.docs[0].number_of_pages_median))
  .then( () => refresh() )
  .catch( error => console.log('Request failed', error));
}


/******************************************************************|
/  Open Library API Search and related functions and Search Modal  |
*******************************************************************/
let searchResults = '';
let extractedBooks = [];

const findBook = document.querySelector(".find-book");
const choiceSearch = document.querySelector(".choice-search");
const searchForm = document.querySelector("#search-book");
const addResult = document.querySelectorAll(".results-add");
const searchDialog = document.querySelector("#search");
const closeFind = document.querySelector("#search .close");
const returnedResults = document.querySelector(".dialog-results");


closeFind.addEventListener("click", (e) => closeSearch(e) );
findBook.addEventListener("click", (e) => searchDialog.showModal() );
choiceSearch.addEventListener("click", (e) => searchDialog.showModal() );
searchForm.addEventListener("submit", (e) => { processQueryAndSearch(e) });

const closeSearch = () => { 
  searchDialog.close();  
  searchDialog.classList = [""];
  searchDialog.querySelector(".dialog-content").style = "";
  searchDialog.querySelector(".dialog-results").style = "display:none;";
  searchForm.reset();
  clearSearchResults();
}

const processQueryAndSearch = (e) => {
  e.preventDefault();
  let userQuery = e.target.elements.query.value;
  if ( !userQuery ) { closeSearch(); return;}
  const baseURL = "https://openlibrary.org/search.json";
  const query = `?title=${userQuery}`;
  const fields = "&fields=title,author_name,isbn,cover_edition_key,number_of_pages_median&sort=editions&limit=10";
  
  console.log(userQuery);

  fetch(`${baseURL}${query}${fields}`, {method: "GET", mode: "cors", headers: [] })
    .then( (response) => response.json() )
    .then( (json) => { searchResults = json;  /* console.log("results", json); */})
    .then( () => { searchResults.docs.forEach( elem => extractedBooks.push(elem) ) })
    .then( () => displayReturnedResults())
    .catch( error => console.log('Request failed', error));
}

function clearSearchResults(){
  returnedResults.querySelectorAll(".results-card").forEach( (el) => { el.remove()});
  extractedBooks = [];
}

function displayReturnedResults(){
  extractedBooks.forEach( (item, index, array) => {
    const card = document.createElement("div");
    const cover = document.createElement("div");
    const coverImg = document.createElement("img");
    const add = document.createElement("div");
    const addIcon = document.createElement("span");
    const check = document.createElement("div");
    const checkIcon = document.createElement("span");
    const details = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const status = document.createElement("div");
    const text = document.createElement("p");
    const yes = document.createElement("a");
    const no = document.createElement("a");
    const localIndex = (index%2 === 0) ? "even" : "odd";
    let author_name; 
    const hasAuthor = (item) => { item.hasOwnProperty("author_name"); }

    try{
      hasAuthor(item);
      author_name = ( Array.isArray(item.author_name)) ? item.author_name[0] : item.author_name;
    } catch (e) {
      console.log(e)
    } 

    text.textContent = "Have you read it?";
    yes.textContent = "Yes";
    yes.classList = ["yes"];
    no.textContent = "No"
    no.classList = ["no"];
    status.classList = ["results-status"];
    pages.classList = ["results-pages"];
    let bookPages = ( item.number_of_pages_median ) ? item.number_of_pages_median + " pages" : null;
    pages.textContent = bookPages;
    author.classList = ["results-author"];
    author.textContent= author_name;
    title.classList = ["results-title"];
    title.textContent = item.title;
    details.classList = ["results-details"];
    details.dataset.index = index;
    addIcon.classList = ["material-symbols-outlined checked"];
    addIcon.textContent = "add";
    checkIcon.classList = ["material-symbols-outlined checked"];
    checkIcon.textContent = "check"
    add.classList = ["results-add"];
    check.classList = ["checkmark"];
    check.style = "display:none";
    coverImg.src = `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`;
    cover.classList = ["results-cover"];
    card.classList = [`results-card ${localIndex}`];

    status.append(text);
    status.append(yes);
    status.append(no);
    add.append(addIcon);
    check.append(checkIcon);
    cover.append(coverImg);
    cover.append(add);
    cover.append(check);
    details.append(title);
    details.append(author);
    details.append(pages);
    details.append(status);
    details.append(cover);
    card.append(cover);
    card.append(details);
    returnedResults.append(card);

    const common = (index, readStatus) => { 
      add.remove();
      check.style = "display:block";
      card.classList.add("indicator");
      status.style = "display:none;";
      addOnlineBook(index, readStatus);
    }

    add.addEventListener("click", (e) => { status.style = "display:block";});
    yes.addEventListener("click", (e) => common(details.dataset.index, "read") );
    no.addEventListener("click", (e) => common(details.dataset.index, "unread") );

  })

  searchForm.reset();
  searchDialog.classList = ["results"];
  searchDialog.querySelector(".dialog-content").style = "display:none;";
  searchDialog.querySelector(".dialog-results").style = ""; 
}




function addOnlineBook(index, status){
  // console.log(index, status);
  
  let book = extractedBooks[index];
  // console.log(book);

  let title =  book.title;
  let author = ( Array.isArray(book.author_name)) ? book.author_name[0] : book.author_name;
  let pages = book.number_of_pages_median;
  let isbn = ( Array.isArray(book.isbn) ) ? book.isbn[0] : book.isbn; 
  let readStatus = status;
  let cover = book.cover_edition_key;
  let coverURL = ( !cover ) ? null : `https://covers.openlibrary.org/b/olid/${cover}-M.jpg`;

  newBook = new Book(title, author, pages, readStatus);
  isbn.length === 13 ? book.isbn13 = isbn : book.isbn10 = isbn;
  newBook.updateCover(coverURL);
  newBook.process("OLAPI");
  console.log(newBook);

  // myLibrary.push(book);
  observedLibrary.push(newBook);
  refresh()
  
}



// Make call to get NYTimes Books on load, they'll be saved to localStorage
fetchBooks();


displayLibrary();

