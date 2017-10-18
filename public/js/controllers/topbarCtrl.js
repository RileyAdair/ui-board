app.controller('topbarCtrl', function($scope, $rootScope, $location, $stateParams, loginSrvc) {

  $rootScope.$on('userStorer', function(event, user){
    $scope.user = user
  })

  $scope.userDirectory = (userId) => {
    $location.path('/directory' + userId);
  }

  $scope.signOut = loginSrvc.signOut;
})
