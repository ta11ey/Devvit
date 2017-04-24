app.directive('applyModal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    controller: function($scope) {
      $scope.modalShown = false;
      $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
      } 
    },
    replace: true,
    transclude: true, 
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.modalShow = false;
      };
    },
    templateUrl: 'templates/modalView.html'
  };
});