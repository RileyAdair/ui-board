app.controller('topbarCtrl', function($scope, $rootScope, $location, $stateParams, loginSrvc) {

  firebase.auth().onAuthStateChanged(user => {
        if(!user) {
          // console.log('test');
          // $('#user-name').remove()
        }
        else if (user) {
            this.user = user
            // Append this on sign in
            // $('.username-container').append('<p id="user-name" class="user-item"><span class="username">{{ user.name }}</span><span class="username-hiphen">—</span>Signout</p>')
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })

  $rootScope.$on('userStorer', function(event, user){
    $scope.user = user
  })

  $scope.userDirectory = (userId) => {
    $location.path('/directory' + userId);
  }

  $scope.signOut = loginSrvc.signOut;
})
