angular.module('devvit').controller('pendingCtrl', function($scope, pendingAppService, $rootScope){
	
	$scope.pendingArr = [];
	
	pendingAppService.getPending($rootScope.profile._id).then(function(res) {
		res.pendingApprovals.forEach(function(proj) {
			pendingAppService.getProjects(proj).then(function(res) {
				$scope.pendingArr.push(res);
			})
		})
	})
})