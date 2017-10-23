app.controller('topbarCtrl', function($scope, $rootScope, $location, $stateParams, loginSrvc) {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        $scope.user = user
        $scope.hide = false
    }
    else {
      $scope.hide = true
    }
  })

  $rootScope.$on('userStorer', function(event, user){
    $scope.user = user
  })

  $scope.userDirectory = (userId) => {
    $location.path('/directory' + userId);
  }

  $scope.signOut = loginSrvc.signOut;
})
