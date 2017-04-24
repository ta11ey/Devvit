angular.module('devvit').controller('messageCurrentCtrl', function($scope, $rootScope, messageService, $state, currentIndex, fromId){ 
	
	console.log('current', currentIndex)
	console.log('fromId', fromId)
	$scope.messages = currentIndex;
	console.log('$scope.messages', $scope.messages)
	
	
	$scope.checkingIfMine = function(index) {
		if($scope.messages[index].from == $rootScope.profile._id) {
			return false;
		} else {
			return true; //true changes color to gray
		}
	}
	
	$scope.replyToUser = function(msg) {
			$scope.replyObj = {
				active_user_id: $rootScope.profile._id,
				message: msg,
				toUser: fromId
			}
			console.log('replyObj', $scope.replyObj)
			messageService.addMessage($scope.replyObj).then(function(res) {
				console.log(res)
			})
			messageService.getMessages($rootScope.profile._id).then(function(res) {
				$scope.messages = res.messages[$scope.currentIndex].messages;
			})
			$scope.msg = "";
		}
		
		
		$(document).ready(function(){
			// var $cont = $('#messages-container');
			// $cont.scrollTop = $cont.scrollHeight;
			
			// $('#messages-container').scrollTop($('#messages-container')[0].scrollHeight);
			
			// $('#messageReply').keypress(function(e){
			// 	if(e.keyCode==13)
			// 	$('#submitReply').click();
			// });
			
			var $cont = $('#messages-container');
			// $cont[0].scrollTop = $cont[0].scrollHeight;
			// $cont.scrollTop($cont[0].scrollHeight - $cont[0].clientHeight);
			// $("#messages-container").animate({ scrollTop: $("##messages-container")[0].scrollHeight }, 1000);
			// window.onload=function () {
			// 	var objDiv = document.getElementById("messages-container");
			// 	objDiv.scrollTop = objDiv.scrollHeight;
			// }
			console.log($cont[0].scrollHeight)
			
			$('#messageReply').keyup(function(e) {
				if (e.keyCode == 13) {
					$('#submitReply').click();
					$cont[0].scrollTop = $cont[0].scrollHeight;
				}
			})
		});
})