angular.module('devvit').service('pendingAppService', function($http){
	
	this.getPending = function(active_user){
		return $http({
			method:'GET',
			url: '/active/' + active_user	
		}).then(function(res){
			return res.data;
		})
	}
	
	this.getProjects = function(proj){
		return $http({
			method:'GET',
			url: '/project/' + proj	
		}).then(function(res){
			return res;
		})
	}
	
})