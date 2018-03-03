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
      this.edit = !this.edit;
      this.update(this.userId, this.book.isbn, this.book);
    };

  },


  bindings: {
    book: '<',
    userId: '<',
    update: '<'
  }
});