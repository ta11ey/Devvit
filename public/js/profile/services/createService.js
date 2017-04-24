angular.module('devvit').service('createService', function($http){
	// var url = 'https://devvit.firebaseio.com';
	
	this.createProject = function(project){	
		return $http({
			method:'post',
			url: '/projects',
			data: project
		}).then(function(res){console.log(res)})

	}
	

	
})