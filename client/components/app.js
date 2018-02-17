angular.module('BookApp').component('app', {
  templateUrl: "./templates/app.html",
  controller: function() {
    this.$onInit = () => {
      this.books = window.books;
      this.view = 'list';
      this.sortBy = 'dewey';
      this.sortOptions = ['Dewey Decimal', 'Title'];
    };
    
    //allows user to view books based on book covers or in list format
    this.toggleView = () => {
      this.view = this.view === 'cover' ? 'list' : 'cover';
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
    this.sortDeweyIntoCategories = () => {

    };

    //optional - if we want to break the books into categoires (A-C) before passing them down?
    this.sortTitleIntoCategories = () => {

    };
  }
});