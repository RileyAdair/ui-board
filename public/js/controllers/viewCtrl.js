app.controller('viewCtrl', function($scope, $stateParams, viewSrvc, $rootScope, $state) {

  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })

  const viewId = $stateParams.view;
  console.log(viewId);

  angular.element(document).ready(function(){
    // View title
    $('body').find('.view-title').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.view-title').on('blur', function() {
      const title = $(this).text()
      if(title) {
        viewSrvc.updateViewTitle(title, viewId);
      }
    })
    $('body').find('.view-title').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const title = $(this).text()
        if(title) {
          viewSrvc.updateViewTitle(title, viewId);
        }
      }

    });
    // View description
    $('body').find('.view-description').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.view-description').on('blur', function() {
      const description = $(this).text()
      if(description) {
        viewSrvc.updateViewDescription(description, viewId);
      }
    })
    $('body').find('.view-description').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const description = $(this).text()
        if(description) {
          viewSrvc.updateViewDescription(description, viewId);
        }
      }

    });
    // View description
    $('body').find('.view-reference-url').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.view-reference-url').on('blur', function() {
      const reference = $(this).text()
      if(reference) {
        viewSrvc.updateViewReference(reference, viewId);
      }
    })
    $('body').find('.view-reference-url').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const reference = $(this).text()
        if(reference) {
          viewSrvc.updateViewReference(reference, viewId);
        }
      }

    });
  })


  $rootScope.id = viewId;
  $rootScope.$state = $state;

  viewSrvc.getViewInfo(viewId)
  .then(response => {
    console.log(response.data);
    $scope.viewInfo = response.data[0];
  })

});
