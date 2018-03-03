angular.module('BookApp').component('bookDetail', {
  templateUrl: './templates/bookDetail.html',
  controller: function(conan) {

    this.$onChanges = (changes) => {
      this.book = changes.book.currentValue;
      if (changes.book.previousValue === undefined) {
        this.originalState = angular.copy(changes.book.currentValue);
        console.log('original', this.originalState);
      }
    };

    this.$onInit = () => {
    };


    this.toggleEdit = () => {
      console.log('sss');
      this.edit = !this.edit;
    };

    this.cancelEdit = () => {
      this.book = this.originalState;
      this.edit = !this.edit;
    };

    this.saveEdits = () => {
      conan.updateBook(this.userId, this.book.isbn, this.book);
      console.log(this.book);
      this.edit = !this.edit;
    };

  },


  bindings: {
    book: '<',
    userId: '<'
  }
});