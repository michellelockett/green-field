angular.module('BookApp').component('bookList', {
  templateUrl: './templates/bookList.html',
  bindings: {
    books: '<',
    type: '<'
  }
});