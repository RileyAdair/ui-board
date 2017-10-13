app.service('viewSrvc',function($http, $sce){

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.user = user
        return user
        console.log(user);
    }
    else {
      this.noUser = true;
    }
  })

  /*
  Get requests on load =========================================================
  */
  this.getViewInfo = (viewId) => {
    // Endpoint - get board name
    return $http.post('/user/getViewInfo', [ viewId ]);
  }

  /*
  View Updates =================================================================
  */
  this.updateViewTitle = (name, viewId) => {
    // Endpoint - update view title
    return $http.post('/user/updateViewTitle', [ name, viewId ])
  }

  this.updateViewDescription = (description, viewId) => {
    // Endpoint - update view description
    return $http.post('/user/updateViewDescription', [ description, viewId ])
  }

  this.updateViewReference = (reference, viewId) => {
    // Endpoint - update view description
    return $http.post('/user/updateViewReference', [ reference, viewId ])
  }

})
