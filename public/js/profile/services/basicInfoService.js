angular.module('devvit').service('basicInfoService', function($http){
	var url = 'https://devvit.firebaseio.com';
	
	this.getProfile = function(active_user_id){
		return $http({
				method: 'GET',
				url: '/active/' + active_user_id 
			}).then(function(res){
				return res.data
			})
	};

	this.updateProfile = function(profile) {
		return $http({
			method: 'PUT',
			url: '/user',
			data: profile
		})
	}
	
	
})