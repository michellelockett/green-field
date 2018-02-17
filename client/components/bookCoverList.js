angular.module('BookApp').component('bookCoverList', {
  templateUrl: './templates/bookCoverList.html',
  bindings: {
    books: '<',
    type: '<'
  }
});