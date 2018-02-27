angular.module('BookApp', [])
.factory('conan', ['$http', function($http) {
  return {
    getAllBooks() {
      return $http({
        method: 'GET',
        url: `http://localhost:3000/books/`
      })
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response);
      })
    },

    getAllBooksForUser(id) {
      return $http({
        method: 'GET',
        url: `/users/${id}/`
      })
      .then(function successCallback(response) {
        return response.data.books;
      }, function errorCallback(response) {
        console.log(response);
      })
    },

    lookupISBN(isbn) {
      $http({
        method: 'GET',
        url: `http://localhost:3000/api/isbn/${isbn}`
      })
      .then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  };
}]);