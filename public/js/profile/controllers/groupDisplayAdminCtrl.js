angular.module('devvit').controller('groupDisplayAdminCtrl', function($scope, groupInfo, groupsService, $rootScope){
	$scope.group = groupInfo;
	$scope.groupMessages = groupInfo.messages;
	$scope.pendingApp = [];
	$scope.inGroupMembers = [];
	var inGroupMembers =function (arr){
		arr.forEach(function(member){
			if (!member.application.pending){
				$scope.inGroupMembers.push(member)
			}
		})
	} 
	inGroupMembers($scope.group.members)
	
	
	groupInfo.members.forEach(function(member){
		if (member.application.pending){
			$scope.pendingApp.push(member)
		}
	})
		console.log($scope.pendingApp)
	
	$scope.sendGroupMessage = function(message){
		var data = {
			message:message,
			active_user_id:$rootScope.profile._id,
			project_id: groupInfo._id
		}
		groupsService.sendGroupMessage(data).then(function(res){
			$scope.groupMessages = res
			console.log(res)
			console.log($scope.groupMessages)
		})
	}
	$scope.acceptUser = function(applied){
		console.log()
		var data = {
			project_id: $scope.group._id,
			user_id: applied.member._id
		}
		groupsService.acceptApplied(data).then(function(res){			
			removeFromArr(applied.member._id, $scope.pendingApp)
			$scope.group.members = res
			inGroupMembers(res)
		})
	}
	$scope.denyUser = function(applied){
		var data = {
			project_id: $scope.group._id,
			user_id: applied.member._id
		}

		groupsService.denyApplied(data).then(function(res){
			removeFromArr(applied.member._id, $scope.pendingApp)
			$scope.group.members = res
			inGroupMembers(res)
		})
	}
	
	function removeFromArr(item, arr){
		for (var thing in arr){
			if (arr[thing].member._id === item){
				arr.splice(thing, 1)
			}
		}

	}
})