angular.module('BookApp').component('bookList', {
  templateUrl: './templates/bookDetail.html',
  bindings: {
    book: '<',
  }
});