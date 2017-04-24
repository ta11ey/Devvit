angular.module('devvit').controller('groupDisplayCtrl', function($scope, $rootScope, groupsService,groupInfo){
	$scope.group = groupInfo;
	$scope.groupMessages = groupInfo.messages;
	
	$scope.sendGroupMessage = function(message){
		var data = {
			message:message,
			active_user_id:$rootScope.profile._id,
			project_id: groupInfo._id
		}
		groupsService.sendGroupMessage(data).then(function(res){
			$scope.groupMessages = res

			console.log($scope.groupMessages)
		})
	}
})