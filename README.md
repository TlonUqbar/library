# Library

The Odin Project: Project - Library. Create a small Library app. I guess I missed the "small" part. I got too excited again and it got away from me. I added 2 APIs - Open Libray and NYTimes Bestsellers Lists - when I didn't need to, as a result I had a lot of scope creep. It took a while, I struggled a lot and learned a lot. Check it out.

## Overview
This "SMALL APP" is a simulation of a library app.  The actual requirements only called for adding a book to the library via User Input (Form), but I tend to get bored and went "TOO BIG".  I added the following extra features.  Auto generate a library when your library is empty.  Get book suggestions from the New York Times Bestsellers Book Lists.  And finally an online book search using the Open Library API.  You can search by Title or ISBN. The books that are added usign the APIs including additional data, like cover images.  I'm also using localStorage, why, to cache the results to the NYTimes API, the lists change weekly so there is no need to hammer their service everytime a user asks for suggestions.  And lastly I added some live statistics that are updated in real time.  Needless to say, I over did it, but I had a lot of fun doing it.  Enjoy!   


## Requirements:

#### Setup
- [x] Set up your project with skeleton HTML/CSS and JS files.
- [x] Manually add a few books to your array so you can see the display.

#### Needed
- [x] Add a simple array for collecting the book objects, the library.
- [x] Add a function that takes user's input to create a new book and saves it to the library.
- [x] Add a function that iterates through the library and displays each book on the page.
- [x] Display the books ~either in a table or~ using cards.
- [x] Add a button to add a new book.
- [x] Add a form to take user's input.
- [x] You might want to explore dialogs and modal using the `<dialog>` tag.
	- [x] The form should have at least these fields: Title, Author, Number of Pages, and Reading status - read/unread.
	- [x] Feel free to add anything else you want.
	- [x] You'll have to use `event.preventDefault()`, read the documentation.
- [x] Add a button on each book’s display to remove the book from the library.
	- [x] You will need to associate your DOM elements with the actual book objects in some way.
	- [x] One easy solution is giving them a data-attribute that corresponds to the index of the library array.
- [x] Add a button on each book’s display to change its read status.
	- [x] To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

## Extras I added because, well I wanted them:
- [x] Use localStorage to cache the NYTimes query results.
- [x] Add the Open Library API to find books and add books from those queries.
- [x] Add the NYTimes Bestsellers Book API to generate random suggestions and add to library.
- [x] Add a static list of books to generate a random starting library.
- [X] Add Library Statistics that update in real-time.

