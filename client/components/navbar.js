angular.module('BookApp').component('navbar', {
  templateUrl: './templates/navbar.html',
  bindings: {
    toggle: '<',
    print: '<',
    logout: '<',
    logged: '<'
  }
});