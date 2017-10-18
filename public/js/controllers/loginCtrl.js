app.controller('loginCtrl', function($scope, $location, loginSrvc, Upload) {

  // Checking user state. Each controller!!!
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
    })

  angular.element(document).ready(function(){})

  /*============================================================================
    Login steps
  ============================================================================*/
  setTimeout(function(){
    $('#login-email-input').focus();
  }, 100);

  // Step one forward
  $scope.loginNext = (email) => {
    if(!email) {
      // Add error class
      $('#login-email-container').addClass('error')
    }
    else {
      $('#login-step-one').css('margin-left','-100%');
      $('#login-step-one').css('margin-right','-100%');
      $('#login-step-two').css('margin-left','100%');
      $('#login-step-two').css('margin-right','100%');

      setTimeout(function(){
        $('#login-step-one').css('display','none');
        $('#login-step-two').css('display','block');
      }, 400);

      setTimeout(function(){
        $('#login-step-two').css('margin-left','0');
        $('#login-step-two').css('margin-right','0');

      }, 420);

      setTimeout(function(){
        $('#login-password-input').focus();
      }, 800);
    }
  }

  // Step two back
  $scope.loginBack = () => {
    $('#login-password-container').removeClass('error')
    $('#login-step-two').css('margin-left','100%');
    $('#login-step-two').css('margin-right','100%');
    $('#login-step-one').css('margin-left','-100%');
    $('#login-step-one').css('margin-right','-100%');

    setTimeout(function(){
      $('#login-step-two').css('display','none');
      $('#login-step-one').css('display','block');
    }, 400);

    setTimeout(function(){
      $('#login-step-one').css('margin-left','0');
      $('#login-step-one').css('margin-right','0');

    }, 520);

    setTimeout(function(){
      $('#login-email-input').focus();
    }, 800);
  }

  // Login, Sign up, Sign out
  $scope.login = (user) => {
    if(!user.password) {
      // Add error class
      $('#login-password-container').addClass('error')
    }
    else{
      loginSrvc.login(user)
    }
  }

  // Remove error class
  $scope.emailFocus = () => {
    $('#login-email-input').keypress(function(event){
      $('#login-email-container').removeClass('error')
    });
  }
  $scope.passwordFocus = () => {
    $('#login-password-input').keypress(function(event){
      $('#login-password-container').removeClass('error')
    });
  }

  /*============================================================================
    Sign up steps
  ============================================================================*/
  // Step one forward
  $scope.signupNextOne = (name) => {
    if(!name) {
      // Add error class
      $('#signup-name-container').addClass('error')
    }
    else {
      $('#signup-step-one').css('margin-left','-100%');
      $('#signup-step-one').css('margin-right','-100%');
      $('#signup-step-two').css('margin-left','100%');
      $('#signup-step-two').css('margin-right','100%');

      setTimeout(function(){
        $('#signup-step-one').css('display','none');
        $('#signup-step-two').css('display','block');
      }, 400);

      setTimeout(function(){
        $('#signup-step-two').css('margin-left','0');
        $('#signup-step-two').css('margin-right','0');

      }, 420);

      setTimeout(function(){
        $('#signup-email-input').focus();
      }, 800);
    }
  }

  // Step one back
  $scope.signupBackOne = () => {
    $('#signup-email-container').removeClass('error')
    $('#signup-step-two').css('margin-left','100%');
    $('#signup-step-two').css('margin-right','100%');
    $('#signup-step-one').css('margin-left','-100%');
    $('#signup-step-one').css('margin-right','-100%');

    setTimeout(function(){
      $('#signup-step-two').css('display','none');
      $('#signup-step-one').css('display','block');
    }, 400);

    setTimeout(function(){
      $('#signup-step-one').css('margin-left','0');
      $('#signup-step-one').css('margin-right','0');

    }, 420);

    setTimeout(function(){
      $('#signup-name-input').focus();
    }, 800);
  }

  // Step two forward
  $scope.signupNextTwo = (email) => {
    if(!email) {
      // Add error class
      $('#signup-email-container').addClass('error')
    }
    else {
      $('#signup-step-two').css('margin-left','-100%');
      $('#signup-step-two').css('margin-right','-100%');
      $('#signup-step-three').css('margin-left','100%');
      $('#signup-step-three').css('margin-right','100%');

      setTimeout(function(){
        $('#signup-step-two').css('display','none');
        $('#signup-step-three').css('display','block');
      }, 400);

      setTimeout(function(){
        $('#signup-step-three').css('margin-left','0');
        $('#signup-step-three').css('margin-right','0');

      }, 420);

      setTimeout(function(){
        $('#signup-password-input').focus();
      }, 800);
    }
  }

  // Step two back
  $scope.signupBackTwo = () => {
    $('#signup-password-container').removeClass('error')
    $('#signup-step-three').css('margin-left','100%');
    $('#signup-step-three').css('margin-right','100%');
    $('#signup-step-two').css('margin-left','-100%');
    $('#signup-step-two').css('margin-right','-100%');

    setTimeout(function(){
      $('#signup-step-three').css('display','none');
      $('#signup-step-two').css('display','block');
    }, 400);

    setTimeout(function(){
      $('#signup-step-two').css('margin-left','0');
      $('#signup-step-two').css('margin-right','0');

    }, 420);

    setTimeout(function(){
      $('#signup-email-input').focus();
    }, 800);
  }

  // password at least 6 characters, html attributes
  $scope.createUser = (name, email, password) => {
    if(!password) {
      $('#signup-password-container').addClass('error')
    }
    else {
      console.log(name, email, password);
      loginSrvc.createNewUser(name, email, password)
    }
  }

  // Remove error class
  $scope.signupNameFocus = () => {
    $('#signup-name-input').keypress(function(event){
      $('#signup-name-container').removeClass('error')
    });
  }
  $scope.signupEmailFocus = () => {
    $('#signup-email-input').keypress(function(event){
      $('#signup-email-container').removeClass('error')
    });
  }
  $scope.signupPasswordFocus = () => {
    $('#signup-password-input').keypress(function(event){
      $('#signup-password-container').removeClass('error')
    });
  }

  // Hide / Show - Login & Sign up
  $scope.showSignup = false;
  $scope.showLogin = true;

  $scope.hideSignUp = function() {
    $scope.showSignup = false;
    $scope.showLogin = true;
    setTimeout(function(){
      $('#login-email-input').focus();
    }, 100);
  }
  $scope.hideLogin = function() {
    $scope.showSignup = true;
    $scope.showLogin = false;
    setTimeout(function(){
      $('#signup-name-input').focus();
    }, 100);
  }

});
