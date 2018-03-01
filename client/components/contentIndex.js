angular.module('BookApp').component('contentIndex', {
  templateUrl: './templates/contentIndex.html',
  bindings: {
    sort: '<',
    category: '<',
    print: '<'
  }
});