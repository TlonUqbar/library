# Library

The Odin Project: Project - Library. Create a small Library app. I guess I missed the "small" part. I got too excited again and it got away from me. I added 2 APIs - Open Libray and NYTimes Bestsellers Lists - when I didn't need to, as a result I had a lot of scope creep. It took a while, I struggled a lot and learned a lot. Check it out.


## Requirements:

#### Setup
- [x] Set up your project with skeleton HTML/CSS and JS files.
- [x] Manually add a few books to your array so you can see the display.

#### Needed
- [x] Add a simple array for collecting the book objects, the library.
- [ ] Add a function that takes user's input to create a new book and saves it to the library.
- [x] Add a function that iterates through the library and displays each book on the page.
- [x] Display the books ~either in a table or~ using cards.
- [ ] Add a button to add a new book.
- [ ] Add a form to take user's input.
- [ ] You might want to explore dialogs and modal using the `<dialog>` tag.
	- [ ] The form should have at least these fields: Title, Author, Number of Pages, and Reading status - read/unread.
	- [ ] Feel free to add anything else you want.
	- [ ] You'll have to use `event.preventDefault()`, read the documentation.
- [ ] Add a button on each book’s display to remove the book from the library.
	- [ ] You will need to associate your DOM elements with the actual book objects in some way.
	- [ ] One easy solution is giving them a data-attribute that corresponds to the index of the library array.
- [ ] Add a button on each book’s display to change its read status.
	- [ ] To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

## Extras I added because, well I wanted them:
- [ ] Use localStorage
- [ ] Add the Open Library API to find a book and add it to the library.
- [ ] Add the NYTimes Bestsellers Book API to generate random suggestions and add to library.
- [x] Add a static list of books to generate a random starting library.
- [X] Extract Library Statistics and update in real-time.

