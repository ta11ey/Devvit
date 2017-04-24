angular.module('devvit').controller('mobileViewCtrl', function($scope, projectService, $location, $rootScope){
		
		$scope.isActive = function(route) {
			return route === $location.path();
		};
	
		$scope.mobileProjects = [];
		projectService.getProjects('mobile').then(function(res) {
		$scope.mobileProjects = res;

    })
	
		$scope.applyMobile = function(projectID, submittedMessage) {
		$scope.applyMobileInfo = {
			project_id: projectID,
			active_user_id: $rootScope.profile._id,
			message: submittedMessage
		}
		projectService.applyToProject($scope.applyMobileInfo).then(function(res){
			console.log("Success Mobile");
		})
	}
	
})