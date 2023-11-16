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
const menuItems = document.querySelectorAll(".menu-item");




let library = [];
let randomClassics = [];

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
    library.push(book);
  })
}

randomClassics = generateRandomPicks(classics, 10);
generateLibrary();

