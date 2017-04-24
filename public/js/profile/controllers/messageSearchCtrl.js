angular.module('devvit').controller('messageSearchCtrl', function($scope, $rootScope, messageService, devService, $state) {

	$scope.members = []
	$scope.chosenName = "";
	$scope.indexChosen = "";
	
		$scope.searchForDev = function(searchQuery) {
			$scope.clickedDev = false;
			$scope.members = [];
			devService.findUsers(searchQuery).then(function(res){
				console.log('res', res);
				res.forEach(function(user){
					$scope.members.push(user)
				})

			})
		};
		
		$scope.newMessageWithUser = function(index) {
			$scope.indexChosen = index;
			console.log($scope.members[index]._id)
			$scope.clickedDev = true;
			$scope.chosenName = $scope.members[index].basicInfo.first;
		}
		
		$scope.sendNewMessage = function(msg) {
			var obj = {
				message: msg,
				active_user_id: $rootScope.profile._id,
				toUser:	$scope.members[$scope.indexChosen]._id
				}
				console.log(obj)
				messageService.newMessage(obj).then(function(res) {
					console.log(res.data);
				})
				$state.go('devvit.messages.current', {id: $scope.members[$scope.indexChosen]._id})
		}
		
		$(document).ready(function(){
			$('#searchUsers').keyup(function(e) {
				if (e.keyCode == 13) {
					$('#searchButton').click();
				}
			})
			
			$('#compose-new').keyup(function(e) {
				if (e.keyCode == 13) {
					$('#send-button').click();
				}
			})
		});
})