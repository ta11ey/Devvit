angular.module('devvit').service('devService', function($http){

	this.findUsers = function(search){
		return $http({
			method: 'GET',
			url: '/getusers/' + search
		}).then(function(res) {
			return res.data;
		})
	}
	
	
	
})