angular.module('BookApp').component('app', {
  templateUrl: "./templates/app.html",
  controller: function() {
    this.$onInit = () => {
      this.books = window.books;
      this.view = 'list';
      this.sortBy = 'dewey';
      this.sortOptions = ['Dewey Decimal', 'Title'];
    };

    this.toggleView = () => {
      this.view = this.view === 'cover' ? 'list' : 'cover';
    };

    this.changeSort = (selected) => {
      this.sortBy = selected === 'Title' ? 'title' : 'dewey';
    };

    this.print = (optional) => {

      console.log('chicken');
      console.log(optional);
    };
  }
});