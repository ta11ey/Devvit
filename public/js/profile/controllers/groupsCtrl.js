angular.module('devvit').controller('groupsCtrl', function($scope, groupsService, $state, $rootScope){
	
	(function getGroups(){
		$scope.groups = []
		groupsService.getGroups($rootScope.profile._id).then(function(res){
			for (var group in res){
				console.log(res[group])
				$scope.groups.push(res[group])
			}		
		})
	})();
	
	$scope.getGroupswithInfo = function(group){
		$scope.groupsInfo = $scope.groups[group];
	}
	
	$scope.goToGroup = function(group){
		group.admins.forEach(function(admin){
			if ($rootScope.profile._id === admin){
				$state.go('devvit.groupdisplayAdmin', {
					group: group._id
				})
			}
			else {
				$state.go('devvit.groupdisplay', {
					group: group._id
				})
			}
			
		})
		
	}
	
	

})