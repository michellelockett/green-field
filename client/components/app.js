angular.module('BookApp').component('app', {
  templateUrl: "./templates/app.html",
  controller: function(conan) {
    this.$onInit = () => {
   
      this.allBooks = window.formattedBooks;
      this.view = 'list';
      this.sortBy = 'dewey';
      this.sortOptions = ['Dewey Decimal', 'Title', 'Author'];
      this.loggedIn = localStorage.sessionId;
      this.userData = {};
      this.wishlist = [];
      this.bookshelf = [];
      this.currentBooks = this.wishlist;
      this.currentBookType = 'wishlist';
      this.toggleBooks('bookshelf');
      this.postBook = conan.postBook;

      //on init, check to see if there is a stored session id, and if so retrieve books for the logged in user

      if (this.loggedIn) {
        conan.getAllBooksForUser(localStorage.getItem('userId'))
             .then((books) => {
              this.allBooks = books;
              this.getBookshelf();
              this.getWishlist();
              this.currentBooks = this.bookshelf;
             })
             .catch(err => console.log(err));
      }
      // this.allBooks.forEach(book => conan.postBook(2, book.isbn, conan.getAllBooksForUser));
    };

    this.setUsernamePassword = (username, password) => {
      this.userData.username = username;
      this.userData.password = password;
      this.login();
    };

    this.signup = (firstName, lastName, username, password) => {
      conan.signup(firstName, lastName, username, password)
           .then((response) => {
              if (response.registered) {
                this.setUsernamePassword(username, password);
              } else {
                alert(response.message);
              }
           });
    };

    this.login = () => {
      conan.login(this.userData.username, this.userData.password)
      .then((response) => {

        console.log(response);
        if (response.authenticated) {
          this.loggedIn = true;
          this.userData.userId = response.userId;
          localStorage.setItem('sessionId', response.sessionId);
          localStorage.setItem('userId', response.userId);
          //this.allBooks.forEach(book => conan.postBook(this.userData.userId, book.isbn, conan.getAllBooksForUser, true));
          conan.getAllBooksForUser(this.userData.userId)
          .then((books) => {
            console.log("RETRIEVED BOOKS SUCCESSFULLY", books);
            this.allBooks = books;
            this.getBookshelf();
            this.getWishlist();
            this.currentBooks = this.bookshelf;
          });
        } else {
          this.loggedIn = false;
          this.userData.userId = null;
          console.log("LOGIN UNSUCCESSFUL", response);
        }
      });
    };

    this.logout = () => {
      console.log("LOGGING OUT");
      conan.logout()
           .then(() => {
             localStorage.clear();
             this.loggedIn = null;
             this.userData = {};
           });
    };

    this.addBook = () => {
      this.postBook();
    };

    this.updateBook = (id, isbn, book) => {
      conan.updateBook(id, isbn, book)
      .then(() => {
        conan.getAllBooksForUser(this.userData.userId)
        .then((books) => {
          this.allBooks = books;
          this.getBookshelf();
          this.getWishlist();
          this.currentBooks = this.bookshelf;
          this.view = 'list';
        })
        .catch(err => console.log(err));
      });
    };

    //allows user to view books by format (list vs. cover)
    this.toggleView = () => {
      this.view = this.view === 'cover' ? 'list' : 'cover';
    };

    this.setView = (view, book) => {
      this.view = view;
      this.selectedBook = book ? book: null;
    };

    //changes which booktype we are to show (bookshelf vs. wishlist)
    this.toggleBookType = (selected) => {
      if (selected !== this.currentBookType) {
        this.currentBookType = selected;
      }

      this.currentBooks = selected === 'bookshelf' ? this.bookshelf : this.wishlist;
    };

    //when the user chooses a method to sort by, it updates state of parent component.
    //later, we could add genre, or author, but adding those sort options to this.sortOptions
    //and checking for that selection below
    this.changeSort = (selected) => {
      console.log(selected, "SELECTED");
      if (selected === 'Title') {
        this.sortBy = 'title';
        this.sortByTitle();
      } else if (selected === 'Author') {
        this.sortBy = 'author';
        this.sortByAuthor();
      } else if (selected === 'Dewey Decimal') {
        this.sortBy = 'dewey';
        this.sortByDewey();
      }
      console.log(this.sortBy, 'SORT BY ');
    };

    //change the current book selection to either wishlist or bookshelf
    this.toggleBooks = (selection) => {
      if (this.view === 'detail') {
        this.view = 'list';
      }
      if (selection === 'wishlist' && this.currentBooks !== this.wishlist) {
        this.currentBooks = this.wishlist;
        console.log('changed to wishlist');
      } else if (selection === 'bookshelf' && this.currentBooks !== this.bookshelf) {
        this.currentBooks = this.bookshelf;
        console.log('changed to bookshelf');
      }

      if (this.sortBy === 'dewey') {
        this.sortByDewey();
      } else {
        this.sortByTitle();
      }

      this.toggleBookType(selection);
    };

    //helper function to pass along to see that data bindings are working properly in child components
    this.print = (optional) => {
      console.log('chicken');
      console.log(optional);
    };

    //sorts this.currentBooks to be ordered by DDN

    this.sortByDewey = () => {
      this.currentBooks = this.currentBooks.sort((a, b) => {
        if (a.dewey === null) {
          return 2;
        }
        if (a.dewey < b.dewey) {
          return -1;
        }
        if (a.dewey > b.dewey){
          return 1;
        }

        return 0;
      });
    };

    //sorts this.currentBooks to be ordered by title

    this.sortByTitle = () => {
      this.currentBooks = this.currentBooks.sort( (a, b) => {
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

    this.sortByAuthor = () => {
      this.currentBooks = this.currentBooks.sort( (a, b) => {

        if (a.authors.length === 0 || a.authors[0].lastName === null) {
          return 2;
        }

        let lastNameA = a.authors[0].lastName.split(' ');
        let lastNameB = b.authors[0].lastName.split(' ');
        lastNameA = lastNameA[lastNameA.length - 1];
        lastNameB = lastNameB[lastNameA.length - 1];

        console.log(lastNameA, lastNameB);


        // if (lastNameA.toUpperCase()[0] < lastNameB.toUpperCase()[0]) {
        //   return -1;
        // }
        // if (lastNameA.toUpperCase()[0] > lastNameB.toUpperCase()[0]) {
        //   return 1;
        // }
        // return 0;
      });
    };

     //filter this.allBooks to show only books that are owned and assign to this.bookshelf
    this.getBookshelf = () => {
      // this.bookshelf = this.allBooks;
      this.bookshelf = this.allBooks.filter(book => book.bookUser.owned === true);
    };

    //filter this.allBooks to show only books that are not owned and assign to this.wishlist
    this.getWishlist = () => {
      // this.bookshelf = this.allBooks;
      this.wishlist = this.allBooks.filter(book => book.bookUser.owned === false || book.bookUser.owned === null);
    };

    //optional - if we want to break the books into categores (000, 100) before passing them down?
    //or maybe we do that logic in the contentIndex component
    this.sortByCategory = (deweyOrAlpha) => {
      const alpha = ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWXYZ"];
      const listType = this.currentBookType === 'bookshelf' ? this.bookshelf : this.wishlist;

      if (this.sortBy === 'dewey') {
        this.currentBooks = listType.filter(book => Math.floor(parseInt(book.dewey)/100)*100 === deweyOrAlpha);

        if (deweyOrAlpha === 'all') {
          this.currentBooks = listType;
          this.sortByDewey();
        }
        this.sortByDewey();
      } else if (deweyOrAlpha === "all") {
        this.currentBooks = listType;
        this.sortByTitle();
      } else {
        for (var i = 0; i < alpha.length; i++) {
          if (alpha[i].includes(deweyOrAlpha)) {
            this.currentBooks = listType.filter(book => (book.title && alpha[i].includes(book.title[0].toUpperCase())));
            this.sortByTitle();
          }
        }
      }
    };
  }
});