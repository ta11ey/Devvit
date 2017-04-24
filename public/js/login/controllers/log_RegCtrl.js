angular.module('devvit').controller('log_RegCtrl', function($scope, log_RegService){

  $scope.login = function(user){
    log_RegService.login(user)

  }

  $scope.createNewUser = function (newUser){
    log_RegService.createNewUser(newUser)
  }

})
