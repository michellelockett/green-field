angular.module('BookApp').component('app', {
  templateUrl: './templates/app.html',
  controller: function(conan) {
    this.$onInit = () => {
      this.allBooks = window.formattedBooks;
      this.view = 'list';
      this.sortBy = 'dewey';
      this.sortOptions = ['Dewey Decimal', 'Title', 'Author'];
      this.loggedIn = localStorage.sessionId;
      this.userId = localStorage.userId;
      this.userData = {};
      this.wishlist = [];
      this.bookshelf = [];
      this.currentBooks = this.wishlist;
      this.currentBookType = 'bookshelf';
      this.postBook = conan.postBook;
      this.edit = false;
      this.add = false;
      this.sort = 'dewey';
      this.message = '';

      //on init, check to see if there is a stored session id, and if so retrieve books for the logged in user

      if (this.loggedIn) {
        this.fetchBooks();
      }
      //this.allBooks.forEach(book => conan.postBook(this.userId, book.isbn, conan.getAllBooksForUser, true));
    };

    this.fetchBooks = () => {
      return conan
        .getAllBooksForUser(this.userId)
        .then(books => {
          this.allBooks = books;
          this.getBookshelf();
          this.getWishlist();
          this.currentBooks = this.bookshelf;
          this.sortByDewey();
        })
        .catch(err => console.log(err));
    };

    this.setUsernamePassword = (username, password) => {
      this.userData.username = username;
      this.userData.password = password;
      this.login();
    };

    this.signup = (firstName, lastName, username, password) => {
      conan.signup(firstName, lastName, username, password).then(response => {
        if (response.registered) {
          this.setUsernamePassword(username, password);
        } else {
          alert(response.message);
        }
      });
    };

    this.login = () => {
      conan
        .login(this.userData.username, this.userData.password)
        .then(response => {
          if (response.authenticated) {
            this.loggedIn = true;

            localStorage.setItem('sessionId', response.sessionId);
            localStorage.setItem('userId', response.userId);

            this.userId = localStorage.userId;
            this.sessionId = localStorage.sessionId;

            this.fetchBooks();
          } else {
            this.loggedIn = false;
            this.userId = null;
            console.log('LOGIN UNSUCCESSFUL', response);
          }
        });
    };

    this.logout = () => {
      conan.logout().then(() => {
        localStorage.clear();
        this.loggedIn = null;
        this.userData = {};
      });
    };

    this.toggleAdd = () => {
      this.view = this.view === 'add' ? 'list' : 'add';
    };

    this.addBook = book => {
      this.message = `Please wait one moment while we look for that book...`;
      conan
        .postBook(this.userId, book.isbn, conan.getAllBooksForUser, book.owned)
        .then(response => {
          // do nothing with response
          return conan.getAllBooksForUser(this.userId);
        })
        .then(books => {
          this.allBooks = books;
          this.getBookshelf();
          this.getWishlist();
          this.currentBooks = this.bookshelf;
          this.selectedBook = books[books.length - 1];
        })
        .then(() => {
          this.message = '';
          this.view = 'detail';
        })
        .catch(err => {
          this.message = '';
          console.log(err);
        });
    };

    this.updateBook = (id, isbn, book) => {
      conan.updateBook(id, isbn, book).then(() => {
        conan
          .getAllBooksForUser(this.userId)
          .then(books => {
            this.allBooks = books;
            this.getBookshelf();
            this.getWishlist();
            this.currentBooks = this.bookshelf;
            this.view = 'list';
            this.edit = false;
          })
          .catch(err => {
            this.edit = false;
            console.log(err);
          });
      });
    };

    this.deleteBook = recordId => {
      return conan
        .deleteBook(this.userId, recordId)
        .then(() => {
          return this.fetchBooks();
        })
        .then(() => {
          this.view = 'list';
        })
        .catch(err => {});
    };

    //allows user to view books by format (list vs. cover)
    this.toggleView = () => {
      this.view = this.view === 'cover' ? 'list' : 'cover';
    };

    this.setView = (view, book) => {
      this.view = view;
      this.selectedBook = book ? book : null;

      if (this.selectedBook) {
        this.originalBookState = angular.copy(this.selectedBook);
      }
    };

    this.cancelEdit = () => {
      this.edit = false;
    };
    this.startEdit = () => {
      this.edit = true;
    };

    //changes which booktype we are to show (bookshelf vs. wishlist)
    this.toggleBookType = selected => {
      if (selected !== this.currentBookType) {
        this.currentBookType = selected;
      }

      this.currentBooks =
        selected === 'bookshelf' ? this.bookshelf : this.wishlist;
      if (this.sortBy === 'dewey') {
        this.sortByDewey();
      } else if (this.sortBy === 'title') {
        this.sortByTitle();
      } else if (this.sortBy === 'author') {
        this.sortByAuthor();
      }
    };

    //when the user chooses a method to sort by, it updates state of parent component.
    //later, we could add genre, or author, but adding those sort options to this.sortOptions
    //and checking for that selection below
    this.changeSort = selected => {
      this.sortBy = selected === 'Title' ? 'title' : 'dewey';
      if (selected === 'Author') {
        this.sortBy = 'author';
        this.sortByAuthor();
      }
      if (this.sortBy === 'title') {
        this.sortByTitle();
      } else if (this.sortBy === 'dewey') {
        this.sortByDewey();
      }
    };

    //change the current book selection to either wishlist or bookshelf
    this.toggleBooks = selection => {
      if (this.view === 'detail') {
        this.edit = false;
        this.view = 'list';
      }

      if (this.view === 'add') {
        this.view = 'list';
      }
      if (selection === 'wishlist' && this.currentBooks !== this.wishlist) {
        this.currentBooks = this.wishlist;
      } else if (
        selection === 'bookshelf' &&
        this.currentBooks !== this.bookshelf
      ) {
        this.currentBooks = this.bookshelf;
      }

      this.toggleBookType(selection);
    };

    //helper function to pass along to see that data bindings are working properly in child components
    this.print = optional => {
      console.log('chicken');
      console.log(optional);
    };

    // sorts this.currentBooks to be alphabetically ordered by author

    this.sortByAuthor = () => {
      this.sort = 'author';
      this.currentBooks = this.currentBooks.sort((a, b) => {
        let nameA =
          a.authors[0].lastName !== null
            ? a.authors[0].lastName.toUpperCase()
            : null;
        let nameB =
          b.authors[0].lastName !== null
            ? b.authors[0].lastName.toUpperCase()
            : null;
        if (nameA === undefined || nameA === null) {
          return 2;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    };

    //sorts this.currentBooks to be ordered by DDN

    this.sortByDewey = () => {
      this.sort = 'dewey';
      let deweys = this.currentBooks.filter(
        book => typeof book.dewey === 'string'
      );
      let nulls = this.currentBooks.filter(book => book.dewey === null);

      this.currentBooks = deweys
        .sort((a, b) => parseFloat(a.dewey) - parseFloat(b.dewey))
        .concat(nulls);
    };

    //sorts this.currentBooks to be ordered by title

    this.sortByTitle = () => {
      this.sort = 'title';
      this.currentBooks = this.currentBooks.sort((a, b) => {
        if (a.title === undefined) {
          return 2;
        }
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    };

    //filter this.allBooks to show only books that are owned and assign to this.bookshelf
    this.getBookshelf = () => {
      // this.bookshelf = this.allBooks;
      this.bookshelf = this.allBooks.filter(
        book => book.bookUser.owned === true
      );
    };

    //filter this.allBooks to show only books that are not owned and assign to this.wishlist
    this.getWishlist = () => {
      // this.bookshelf = this.allBooks;
      this.wishlist = this.allBooks.filter(
        book => book.bookUser.owned === false || book.bookUser.owned === null
      );
    };

    this.filterByAuthor = (alphaBlock, listType) => {
      if (alphaBlock === 'all') {
        this.currentBooks = listType;
      } else if (alphaBlock === 'unknown') {
        this.currentBooks = listType.filter(book => book.authors[0].lastName === null);
      } else {
        this.currentBooks = listType.filter(
              book => 
                book.authors[0].lastName && alphaBlock.includes(book.authors[0].lastName[0].toUpperCase())
            );
      }

      this.sortByAuthor();
    };

    this.filterByTitle = (alphaBlock, listType) => {
       if (alphaBlock === 'all') {
        this.currentBooks = listType;
      } else if (alphaBlock === 'unknown') {
        this.currentBooks = listType.filter(book => book.title === 'Unknown');
      } else {
        this.currentBooks = listType.filter(
              book => 
                alphaBlock.includes(book.title[0].toUpperCase())
            );
      }

      this.sortByTitle();
    };

    this.filterByDewey = (deweyBlock, listType) => {

      if (deweyBlock === 'all') {
        this.currentBooks = listType
      } else if (deweyBlock === 'null') {
        this.currentBooks = listType.filter(book => book.dewey === null);
      } else {
        this.currentBooks = listType.filter(book => Math.floor(parseInt(book.dewey) / 100) * 100 === deweyBlock);
      }
      
      this.sortByDewey();
    };

    //further filter results with the sidebar using above helper funcitons

    this.sortByCategory = deweyOrAlpha => {
      const alpha = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR', 'STU', 'VWXYZ'];
      const listType =
        this.currentBookType === 'bookshelf' ? this.bookshelf : this.wishlist;

      if (this.sortBy === 'author') {
        this.filterByAuthor(deweyOrAlpha, listType);
      } else if (this.sortBy === 'title') {
        this.filterByTitle(deweyOrAlpha, listType);
      } else if (this.sortBy === 'dewey') {
        this.filterByDewey(deweyOrAlpha, listType);
      }
    };
  }
});
