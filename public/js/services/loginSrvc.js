app.service('loginSrvc',function($http, $location){

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.user = user
        return user
    }
  })

  /*
  Login ========================================================================
  */
  this.login = (user) => {
    // Endpoint - login
    return $http.post('/user/login', user)
    .then(response => {
      if(response.data.validUser == 'no user') {
        alert('This email does not exist')
      }
      if(response.data.validUser == 'valid') {

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          console.log(user);
          // Endpoint - get user id
          return $http.post('/user/getUserId', {email: user.email})
          .then(response => {
            $location.path('/directory' + response.data[0].id);
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
          if(err.message == "The password is invalid or the user does not have a password.") {

            setTimeout(function(){
              $('#login-password-container').addClass('error')

            }, 50);
            setTimeout(function(){
              alert("Password is incorrect")
            }, 70);
          }
          if(err.message == "We have blocked all requests from this device due to unusual activity. Try again later.") {
            alert("We have blocked all requests from this device due to unusual activity. Try again later.")
          }
          // Run jQuery here in Id to add html message
          this.error = "Password is incorrect";

        })

      }
    })
  }

  this.redirectUser = (user) => {
    return $http.get(`/user/getUserId/${user.email}`)
    .then(response => {
      $location.path('/directory' + response.data[0].id);
    })
  }

  /*
  Create new user ==============================================================
  */
  this.createNewUser = (name, email, password) => {
    console.log(name, email, password)
    if(!name) {
      console.log('no name')
    }
    if(!email) {
      console.log('no email')
    }
    if(!password) {
      console.log('no password')
    }
    if(name && email && password) {

      function check(name, email, password) {
        const userEmail = {email:email}
        console.log(email);

        // Endpoint - checkUser
        return $http.post('/user/checkUser', userEmail)
        .then(response => {
          if(response.data.validUser == 'username already exists') {
            alert('The email address is already in use by another account.')
          }
          if(response.data.validUser == 'create new user') {
            // console.log('create new user')
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                let userInfo = [user.uid, user.email, name]
                // Endpoint - create user
                return $http.post('/user/createUser', userInfo).then((response) => {
                  $location.path('/directory' + response.data[0].id);
                  console.log(response);
                })
            })
          }
        })
      }
      check(name, email, password);
    }
  }

  /*
  Sign out =====================================================================
  */
  this.signOut = (user) => {
    $location.path('/');
    firebase.auth().signOut().then((user) => {
        console.log(this.user.uid, 'Signed Out');
    })
  }

});
