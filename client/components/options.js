angular.module('BookApp').component('options', {
  templateUrl: './templates/options.html',
  bindings: {
    toggle: '<',
    change: '<',
    items: '<',
    view: '<',
    toggleAdd: '<'
  }
});