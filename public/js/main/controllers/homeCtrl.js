angular.module('devvit').controller('homeCtrl', function($scope, $location){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	$("#groupSubMenu").hide();
	
	$scope.slideInGroups = function(elem){
		$("#groupSubMenu").slideToggle('fast');
	}
// 	$(window).scroll(function () {
//     if ($(window).scrollTop() > 50) {
//         $('#scroller').css('top', $(window).scrollTop());
//     }
// }
// )
})