angular.module('BookApp').component('app', {
  templateUrl: "./templates/app.html",
  controller: function() {
    this.$onInit = () => {
      this.books = window.books;
      this.view = 'list';
    }
  }
});