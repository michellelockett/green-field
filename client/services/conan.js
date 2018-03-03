angular.module('BookApp', [])
.factory('conan', ['$http', function($http) {
  return {

    login(username, password) {
      const data = {
        username: username,
        password: password
      };
      
      const encoded = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');

      const url = 'http://localhost:3000/login?' + encoded;
      // username=cdog3&password=insecurepassword';
      console.log(url);

      return $http({
        method: 'POST',       
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        return response.data;
      });
    },

    logout() {
      return $http({
        method: 'GET',
        url: `http://localhost:3000/logout`
      });
    },

    signup(firstName, lastName, username, password) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      };
      
      const encoded = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');

      const url = 'http://localhost:3000/signup';

      return $http({
        method: 'POST',       
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: encoded
      })
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        return response.data;
      });
    },

    getAllBooks() {
      return $http({
        method: 'GET',
        url: `http://localhost:3000/books/`
      })
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
    },

    getAllBooksForUser(id) {
      console.log(id, "IN CONAN GET ALL BOOKS FOR USER");
      return $http({
        method: 'GET',
        url: `/users/${id}`
      })
      .then(function successCallback(response) {
        console.log(response);
        return response.data.books;
      }, function errorCallback(response) {
        console.log(response);
      });
    },

    postBook(userId, ISBN, callback, isOwned) {
      return $http({
        method: 'POST',
        url: `/users/${userId}/books/isbn/${ISBN}/${isOwned}`
      })
      .then(function successCallback(response) {
        callback(userId);
        console.log(response.data);
      });
    },

    updateBook(userId, isbn, book) {
      let url = `/users/${userId}/books/${isbn}`;
      
      return $http.put(url, book)
      .then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
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