app.controller('viewCtrl', function($scope, $stateParams, viewSrvc, $rootScope, $state, $location) {

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
        $scope.user = user
        $scope.hide = false

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
      }
      else {
        $scope.hide = true
        $('.editable-content').prop('contentEditable', false)
      }
  })

  const userId = $stateParams.id
  const boardId = $stateParams.board_id
  const viewId = $stateParams.view;

  // Document.ready
  angular.element(document).ready(function(){



    $scope.copyURL = () => {
      // event.preventDefault();
      let url = window.location.href

      var $temp = $("<input>");
       $("body").append($temp);
       $temp.val(url).select();
       document.execCommand("copy");
       $temp.remove();

       setTimeout(function(){
         $('#copy-link-message').css('display', 'block')
         $('#copy-background').css('transform', 'translateY(100%)')
         $('#copy-message').css('opacity', '0')
       }, 10);

       setTimeout(function(){
         $('#copy-message').css('opacity', '1')
         $('#copy-background').css('transform', 'translateY(0)')

         setTimeout(function(){
           $('#copy-message').css('opacity', '0')
           $('#copy-background').css('transform', 'translateY(100%)')
         }, 2500);

         setTimeout(function(){
           $('#copy-link-message').css('display', 'block')
         }, 2800);

       }, 100);
    }

    setTimeout(function(){
      $('body').find('.preview-container').css('opacity', '1')
      $('body').find('.item-actions-container').css('opacity', '1')
      $('body').find('#item-details-container').css('opacity', '1')
    }, 10);

    // Removes left: 50% from .board-thumbnail-container.selected
    $scope.removeClass = () => {
      $('body').find('.board-thumbnail-container.selected').removeClass('move')
      $('body').find('.board-iframe.selected').removeClass('mobile-view')
      $('body').find('.board-thumbnail-container.selected').removeClass('mobile-view')
    }

  })

  $scope.showSidebar = false
  let toggle = false
  $scope.sidebarToggle = () => {
    if(toggle == false) {
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
    if(response.data[0].site_url) {
      $('body').find('.preview-reference-url').css('display','none')
    }
  })

});
