angular.module('devvit').controller('profileCtrl', function($scope, $location, $rootScope, profileService){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	
	 $(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() - 50;
			 if ($(window).scrollTop() > navHeight) {
				 $('nav').addClass('fixed');
			 }
			 else {
				 $('nav').removeClass('fixed');
			 }
		});
	});
	
		
	
})