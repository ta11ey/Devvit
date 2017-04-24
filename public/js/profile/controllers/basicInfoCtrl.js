angular.module('devvit').controller('basicInfoCtrl', function($scope, basicInfoService, $rootScope){
	$scope.editmode = false;
  	$scope.toggleEditMode = function(){
    	$scope.editmode = $scope.editmode === false ? true: false;
    	
  }
  $scope.save = false;
  $scope.toggleView = function() {
  	$scope.save = !$scope.save;
  }

	// $scope.addProfile = function(data){
	// 	basicInfoService.addProfile(data)
	// }
	
	// // once for firebase
	// // $scope.addProfile($rootScope.profile)
	
	$scope.getProfile = function(active_user_id){
		basicInfoService.getProfile(active_user_id).then(
		function(res){
			$scope.first = res.basicInfo.firstName;
			$scope.last = res.basicInfo.lastName;
			$scope.userName = res.basicInfo.userName;
			$scope.email = res.basicInfo.email;
			$scope.password = res.basicInfo.password;
			$scope.profile = res;

			
		}
	)
	}
	($rootScope.profile._id)
	

	$scope.updateProfile = function() {
		var profile = {
			basicInfo: {
			firstName: $scope.first,
			lastName: $scope.last,
			userName: $scope.userName,
			email: $scope.email,
			password: $scope.password,
			_id: $rootScope.profile._id
			}
		}
			
		basicInfoService.updateProfile(profile).then(function(res) {
			console.log('Updated Profile', res);
		})
	}
	// function editProfile($scope) {
	// 	$scope.firstName = $scope.profile.firstName;
	// 	$scope.lastName = $scope.profile.lastName
	// }
});

