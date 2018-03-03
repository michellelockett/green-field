angular.module('BookApp').component('login', {
  templateUrl: './templates/login.html',
  bindings: {
    submit: '<',
    signup: '<'
  },
  controller: function($scope) {
    $scope.username = '';
    $scope.password = '';
    $scope.newFirstName = '';
    $scope.newLastName = '';
    $scope.newUsername = '';
    $scope.newPassword = '';

    this.handleSubmit = () => {      
      this.submit($scope.username, $scope.password);  
      $scope.username = '';
      $scope.password = ''; 
    };

    this.handleNewUser = () => {
      this.signup($scope.newFirstName, $scope.newLastName, $scope.newUsername, $scope.newPassword);
      $scope.newFirstName = '';
      $scope.newLastName = '';
      $scope.newUsername = '';
      $scope.newPassword = '';
    };
  }
});

