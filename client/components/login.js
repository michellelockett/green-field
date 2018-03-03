angular.module('BookApp').component('login', {
  templateUrl: './templates/login.html',
  bindings: {
    submit: '<'
  },
  controller: function($scope) {
    $scope.username = '';
    $scope.password = '';

    this.handleSubmit = () => {      
      this.submit($scope.username, $scope.password);  
      $scope.username = '';
      $scope.password = ''; 
    };
  }
});

