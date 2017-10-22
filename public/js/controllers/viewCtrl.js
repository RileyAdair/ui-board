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

  // Document.ready
  angular.element(document).ready(function(){

    $scope.copyURL = () => {
      // event.preventDefault();
      let url = window.location.href
      console.log(url);

      var $temp = $("<input>");
       $("body").append($temp);
       $temp.val(url).select();
       document.execCommand("copy");
       $temp.remove();
    }

    setTimeout(function(){
      $('body').find('.preview-container').css('opacity', '1')
      $('body').find('.item-actions-container').css('opacity', '1')
      $('body').find('#item-details-container').css('opacity', '1')
    }, 10);

    // Removes left: 50% from .board-thumbnail-container.selected
    $scope.removeClass = () => {
      console.log('removed');
      $('body').find('.board-thumbnail-container.selected').removeClass('move')
      $('body').find('.board-iframe.selected').removeClass('mobile-view')
      $('body').find('.board-thumbnail-container.selected').removeClass('mobile-view')
    }

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
      let text = $(this).text()

      $('body').find('.preview-title').on('blur', function() {
        const title = $(this).text()
        if(title) {
          $scope.title = title
          viewSrvc.updateViewTitle(title, viewId);
        }
        else {
          $('.preview-title').html(text);
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

    })

    // View description
    $('body').find('.preview-description').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.preview-description').on('blur', function() {
      const description = $(this).text()
        viewSrvc.updateViewDescription(description, viewId);
    })
    $('body').find('.preview-description').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const description = $(this).text()
        viewSrvc.updateViewDescription(description, viewId);
      }
    });
    // View reference
    $('body').find('.preview-reference-url').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.preview-reference-url').on('blur', function() {
      const reference = $(this).text()
        viewSrvc.updateViewReference(reference, viewId);
    })
    $('body').find('.preview-reference-url').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const reference = $(this).text()
        viewSrvc.updateViewReference(reference, viewId);
      }
    });

  })

  $scope.showSidebar = false
  let toggle = false
  $scope.sidebarToggle = () => {
    console.log(toggle);
    if(toggle == false) {
      console.log('clicked');
      $('body').find('.right-arrow-icon').css('opacity','0')
      $('body').find('#item-details-container').css('transform','translate3d(100%,0,0)')
      $('body').find('#preview-header').css('opacity','1')
      $('body').find('.board-thumbnail-container.selected').addClass('move')
      toggle = true
      $scope.showSidebar = true


    }
    else {
      $('body').find('.right-arrow-icon').css('opacity','1')
      $('body').find('#item-details-container').css('transform','translate3d(0,0,0)')
      $('body').find('#preview-header').css('opacity','0')
      $('body').find('.board-thumbnail-container.selected').removeClass('move')
      toggle = false
      $scope.showSidebar = false


    }
  }

  $scope.showLaptop = false
  $scope.deviceToggle = () => {
    console.log('clicked');
    if($scope.showLaptop == false) {
      $('body').find('.mobile-icon').css('opacity','0')
      $('body').find('.board-iframe.selected').addClass('mobile-view')
      $('body').find('.board-thumbnail-container.selected').addClass('mobile-view')
      $scope.showLaptop = true
    }
    else {
      $('body').find('.mobile-icon').css('opacity','1')
      $('body').find('.board-iframe.selected').removeClass('mobile-view')
      $('body').find('.board-thumbnail-container.selected').removeClass('mobile-view')
      $scope.showLaptop = false
    }
  }



  $rootScope.id = viewId;
  $rootScope.$state = $state;

  viewSrvc.getViewInfo(viewId)
  .then(response => {
    $scope.title = response.data[0].title
    $scope.viewInfo = response.data[0];
    console.log(response.data[0]);
    if(response.data[0].site_url) {
      $('body').find('.preview-reference-url').css('display','none')
    }
  })

});
