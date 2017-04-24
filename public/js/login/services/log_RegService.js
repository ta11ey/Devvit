angular.module('devvit').service('log_RegService', function($http){


  this.login = function(user){
      
  }

  this.createNewUser = function(newUser){
    var User = {
          basicInfo:{
              firstName: newUser.firstname,
              lastName: newUser.lastname,
              userName: newUser.username,
              email: newUser.email,
              password: newUser.password
            }
    }

    return $http ({
      method: 'POST',
      url: '/user',
      data: User
    }).then(function(res) {
      console.log('Success');
    })
  }
})
