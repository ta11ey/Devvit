angular.module('devvit').service('profileService', function($http){
	var url = 'https://devvit.firebaseio.com'
	
	this.getProfile = function(active_user_id){
			return $http({
				method: 'GET',
				url: '/active/' + active_user_id 
			}).then(function(response){
				console.log(response, 'active user data')
			})
	};
})