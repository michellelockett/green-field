angular.module('BookApp').component('addBook', {
  templateUrl: './templates/addBook.html',

  controller: function() {

    this.book = {
      isbn: null,
      owned: true
    };

    this.handleSubmit = () => {
      let bookCopy = angular.copy(this.book);
      this.add(bookCopy);
      this.book = {
        isbn: null,
        owned: true
      };
    };

  },

  bindings: {
    add: '<',
    view: '<'
  }
});