app.controller('topbarCtrl', function($scope, $rootScope, $location, $stateParams) {

  $rootScope.$on('userStorer', function(event, user){
    $scope.user = user
  })

  $scope.userDirectory = (userId) => {
    $location.path('/directory' + userId);
  }
})
