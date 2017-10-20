app.controller('viewCtrl', function($scope, $stateParams, viewSrvc, $rootScope, $state, $location) {

  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })
  const userId = $stateParams.id
  const boardId = $stateParams.board_id
  const viewId = $stateParams.view;

  console.log($stateParams);

  $scope.showSidebar = false
  let toggle = false

  $scope.sidebarToggle = () => {
    console.log(toggle);
    if(toggle == false) {
      console.log('clicked');
      $('body').find('.right-arrow-icon').css('opacity','0')
      $('body').find('#item-details-container').css('transform','translate3d(100%,0,0)')
      toggle = true
      $scope.showSidebar = true
    }
    else {
      $('body').find('.right-arrow-icon').css('opacity','1')
      $('body').find('#item-details-container').css('transform','translate3d(0,0,0)')
      toggle = false
      $scope.showSidebar = false
    }

  }
  // Document.ready
  angular.element(document).ready(function(){





    setTimeout(function(){
      $('body').find('.preview-container').css('opacity', '1')
    }, 10);

    // $scope.closePreview = () => {
    //   setTimeout(function(){
    //     $('body').find('.view-container').css('opacity', '0')
    //   }, 10);
    //
    //   // setTimeout(function(){
    //   //   $('body').find('.board-thumbnail-container.selected').css('transition', 'position 2s')
    //   //   $('body').find('.board-thumbnail-container.selected').css('position', 'relative')
    //   // }, 20);
    //
    //   setTimeout(function(){
    //     $state.go('board');
    //   }, 300);
    // }


    // View title
    $('body').find('.preview-title').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.preview-title').on('blur', function() {
      const title = $(this).text()
      if(title) {
        viewSrvc.updateViewTitle(title, viewId);
      }
    })
    $('body').find('.preview-title').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const title = $(this).text()
        if(title) {
          viewSrvc.updateViewTitle(title, viewId);
        }
      }

    });
    // View description
    $('body').find('.preview-description').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.preview-description').on('blur', function() {
      const description = $(this).text()
      if(description) {
        viewSrvc.updateViewDescription(description, viewId);
      }
    })
    $('body').find('.preview-description').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const description = $(this).text()
        if(description) {
          viewSrvc.updateViewDescription(description, viewId);
        }
      }

    });
    // View reference
    $('body').find('.preview-reference-url').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.preview-reference-url').on('blur', function() {
      const reference = $(this).text()
      if(reference) {
        viewSrvc.updateViewReference(reference, viewId);
      }
    })
    $('body').find('.preview-reference-url').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const reference = $(this).text()
        if(reference) {
          viewSrvc.updateViewReference(reference, viewId);
        }
      }

    });

  })

  // $scope.toggle = true
  // $scope.sidebarToggle = () => {
  //   console.log('clicked');
  //   $scope.toggle = false
  // }


  $rootScope.id = viewId;
  $rootScope.$state = $state;

  viewSrvc.getViewInfo(viewId)
  .then(response => {
    console.log(response.data);
    $scope.viewInfo = response.data[0];
  })

});
