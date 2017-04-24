angular.module('devvit').controller('developersCtrl', function($scope, devService, $location, $rootScope){
		
		$scope.isActive = function(route) {
			return route === $location.path();
		};
		
		$scope.members = []
	
		var searchForDev = function(searchQuery) {
			$scope.members = [];
			devService.findUsers(searchQuery).then(function(res){
				res.forEach(function(user){
					$scope.members.push(user)
				})

			})
		};
		
		var search = document.getElementById("search");
		
		search.addEventListener("keydown", function (dev) {
			if (dev.keyCode === 13) {
				searchForDev($scope.developerSearch);
			}
		});

	
		
})