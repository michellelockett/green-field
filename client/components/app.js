angular.module('BookApp').component('app', {
  templateUrl: "./templates/app.html",
  controller: function() {
    this.$onInit = () => {
      //this will be an API call to our server for the books of the logged in user. For now using fake data
      //need to get all books onInit, then call the bookshelf and wishlist functions
      this.allBooks = window.books;
      this.view = 'list';
      this.sortBy = 'dewey';
      this.sortOptions = ['Dewey Decimal', 'Title'];
      this.wishlist = ['chicken', 'cheesecake'];
      this.bookshelf = window.books;
      this.currentBooks = this.bookshelf;
      this.currentBookType = 'bookshelf';
      this.getBookshelf();
      this.getWishlist();
    };
    
    //allows user to view books based on book covers or in list format
    this.toggleView = () => {
      this.view = this.view === 'cover' ? 'list' : 'cover';
    };
    
    //changes which booktype we are to show
    this.toggleBookType = (selected) => {  
      if (selected !== this.currentBookType) {
        this.currentBookType = selected;    
      }
    };
    
    //when the user chooses a method to sort by, it updates state of parent component.  
    //later, we could add genre, or author, but adding those sort options to this.sortOptions
    //and checking for that selection below
    this.changeSort = (selected) => {
      this.sortBy = selected === 'Title' ? 'title' : 'dewey';
      if (this.sortBy === 'title') {
        this.sortByTitle();
      } else {
        this.sortByDewey();
      }
    };
    
    //change the current book selection to either wishlist or bookshelf
    this.toggleBooks = (selection) => {    
      if (selection === 'wishlist' && this.currentBooks !== this.wishlist) {
        this.currentBooks = this.wishlist;
        console.log('changed to wishlist');
      } else if (selection === 'bookshelf' && this.currentBooks !== this.bookshelf) {
        this.currentBooks = this.bookshelf;
        console.log('changed to bookshelf');
      }  

      this.toggleBookType(selection);    
    };

    //helper function to pass along to see that data bindings are working properly in child components
    this.print = (optional) => {
      console.log('chicken');
      console.log(optional);
    };

    this.sortByDewey = () => {
      //sorts this.books to be ordered by DDN
      //how we implement will depend on format that we store data we get from APIs
    };

    this.sortByTitle = () => {
      //sorts this.books to be ordered by title
      //how we implement will depend on format that we store data we get from APIs
    };
    
    //optional - if we want to break the books into categores (000, 100) before passing them down?
    //or maybe we do that logic in the contentIndex component
    this.sortDeweyIntoCategories = () => {

    };

    //optional - if we want to break the books into categoires (A-C) before passing them down?
    //or maybe we do that logic in the contentIndex component
    this.sortTitleIntoCategories = () => {

    };

    this.getBookshelf = () => {
      //filter this.allBooks to show only books that are owned and assign to this.bookshelf
    };

    this.getWishlist = () => {
      //filter this.allBooks to show only books that are not owned and assign to this.wishlist
    };
  }
});