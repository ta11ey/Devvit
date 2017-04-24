angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
		var user1 = {
			//Antonio
			_id: "56456621652466734cf661ea"
		};

		//Jacob
		var user2 = {
			_id: "5645662b652466734cf661eb"
		};

		//Billy
		var user3 = {
			_id: "56456638652466734cf661ed"
		};
		
		var user4 = {
			_id: "56456645652466734cf661ee"
		};


	$rootScope.profile = user4;



 
	(function updateUser (who){
		pseudoService.getProfile(who).then(function(res){
			$rootScope.profile = res;
			console.log(res)
			$rootScope.profile.username = res.basicInfo.userName; 

		})
		})($rootScope.profile._id)


})

.service('pseudoService', function ($http){
	this.getProfile = function(active_user_id){
		return $http({
				method: 'GET',
				url: '/active/' + active_user_id 
			}).then(function(res){
				return res.data
			})
	};
})


