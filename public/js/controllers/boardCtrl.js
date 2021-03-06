app.controller('boardCtrl', function($scope, $timeout, $location, $stateParams, $sce, boardSrvc, directorySrvc, $state) {

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
        $scope.user = user
        $scope.hide = false

        // Board name header
        $('body').find('#board-name-header').on('click', function() {
          $(this).prop('contentEditable', true)
          let text = $(this).text()

          $('body').find('#board-name-header').on('blur', function() {
            const name = $(this).text()
            if(name) {
                boardSrvc.updateBoardName(name, boardId);
            }
            else {
              $('#board-name-header').html(text);
            }
          })
        })
        $('body').find('#board-name-header').keypress(function(event){
          if(event.keyCode == 13){
            $(this).prop('contentEditable', false)
            const name = $(this).text()
            if(name) {
              boardSrvc.updateBoardName(name, boardId);
            }
          }
        });
      }
      else {
        $scope.hide = true
        $('.editable-content').prop('contentEditable', false)
      }
    })

  const boardId = $stateParams.board_id;

  angular.element(document).ready(function(){

    $scope.removeClass = () => {
      $('body').find('.board-thumbnail-container.selected').removeClass('move')
    }

    // Show / Hide - Modal
    $scope.showModal = () => {
      $('#create-board-modal-container').css('display','block');

      setTimeout(function(){
        $('#create-board-modal-container').css('opacity','1');
        $('#create-board-input').focus();
      }, 100);
    }

    $scope.hideModal = () => {
      $('#create-board-modal-container').css('opacity','0');
      setTimeout(function(){
        $('#create-board-modal-container').css('display','none');
        $('#create-board-input').val('')
      }, 300);
    }
  })

  $scope.images = [];
  const imagesArr = $scope.images;

  $scope.checkLength = () => {
    if(imagesArr.length > 0){
      $('#start-message').css('display','none')
    }
    else {
      $scope.startMessage = true;
      $('#start-message').css('display','block')
    }
  }

  // Get Board Name & Board Images / Sites
  boardSrvc.getBoardName(boardId).then(response => {
    $scope.boardName = response.data[0].name;
  })

  boardSrvc.getBoardImages($stateParams).then(response => {
    response.forEach(i => {
      imagesArr.push(i);
    })
    $scope.checkLength();
  })

  $scope.deleteImage = (image) => {
    let imageProp = 'image_id'
    let imageId = image.image_id;
    let i = imagesArr.length;

    while(i--){
       if( imagesArr[i]
           && imagesArr[i].hasOwnProperty(imageProp)
           && (arguments.length > 2 && imagesArr[i][imageProp] === imageId ) ){
           imagesArr.splice(i,1);
       }
    }
    boardSrvc.deleteImage(imageId, boardId)
    $scope.checkLength();
  }

  // Add site
  $scope.addSite = (site) => {
    if(!site){
      setTimeout(function(){
        $('#create-board-container').addClass('error')

      }, 50);
      setTimeout(function(){
        alert('Please enter a URL.')
      }, 70);

    }
    if(site) {
      boardSrvc.addSite(site, boardId)
      .then(response => {

        imagesArr.push(response);



        $('#create-board-modal-container').css('opacity','0');
        setTimeout(function(){
          $('#create-board-modal-container').css('display','none');
          $('#create-board-input').val('')
          $('#create-board-container').removeClass('error')
          $scope.checkLength();
          $scope.site = ''
        }, 300);
      })
    }
  }

  // Remove error class
  $scope.boardNameFocus = () => {
    $('#create-board-container').removeClass('error')
    $('#create-board-input').keypress(function(event){
      $('#create-board-container').removeClass('error')
    });
  }

  /*
    Upload image to Firebase ===================================================
    Add image_url to database
    Update $scope.images
  */

  $scope.upload = (file) => {
    file.id = boardId;
    boardSrvc.upload(file)
    .then(response => {
      $timeout(function(){
        imagesArr.push(response);
      }, 0)



      $('#create-board-modal-container').css('opacity','0');

      setTimeout(function(){
        $('#create-board-modal-container').css('display','none');
        $('#create-board-input').val('')
        $scope.checkLength();
      }, 300);
    })
  }

  // Close save modal
  $scope.hideModal = () => {
    $scope.bool = false;
  }

  // Invoke directorySrvc.getUser to set userId and userName on $rootScope
  // on topBarCtrl
  directorySrvc.getUser($stateParams)
});
