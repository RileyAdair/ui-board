app.controller('boardCtrl', function($scope, $timeout, $location, $stateParams, $sce, boardSrvc, directorySrvc, $state) {

  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })

  const boardId = $stateParams.board_id;

  angular.element(document).ready(function(){
    // Board name header
    $('body').find('#board-name-header').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('#board-name-header').on('blur', function() {
      const name = $(this).text()
      if(name) {
          boardSrvc.updateBoardName(name, boardId);
      }
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

    // Show / Hide - Modal
    $scope.showModal = () => {
      $('#create-board-modal-container').css('display','block');

      setTimeout(function(){
        $('#create-board-step').css('transform','translateX(100%)');
      }, 10);

      setTimeout(function(){
        $('#create-board-modal-container').css('opacity','1');
        $('#create-board-step').css('opacity','1');
        $('#create-board-input').focus();
      }, 100);

      setTimeout(function(){
        $('#create-board-step').css('transition','all .4s ease-out');
        $('#create-board-step').css('transform','translateX(0)');
      }, 250);
    }

    $scope.hideModal = () => {
      $('#create-board-modal-container').css('opacity','0');
      $('#create-board-step').css('opacity','0');
      setTimeout(function(){
        $('#create-board-modal-container').css('display','none');
        $('#create-board-input').val('')
      }, 300);
    }
  })

  // **** For testing updates
  $scope.images = [];
  const imagesArr = $scope.images;

  // Get Board Name & Board Images / Sites
  boardSrvc.getBoardName(boardId).then(response => {
    $scope.boardName = response.data[0].name;
  })

  boardSrvc.getBoardImages($stateParams).then(response => {
    response.forEach(i => {
      imagesArr.push(i);
    })
    console.log(imagesArr);
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
    console.log(imagesArr);
    boardSrvc.deleteImage(imageId, boardId)
  }

  // Add site
  $scope.addSite = (site) => {
    if(!site){
      $('#create-board-container').addClass('error')
      console.log('please enter site');
    }
    if(site) {
      console.log(site);
      console.log(boardId);
      boardSrvc.addSite(site, boardId)
      .then(response => {

        imagesArr.push(response);
        console.log(response);

        $scope.site = ""

        $('#create-board-modal-container').css('opacity','0');
        $('#create-board-step').css('opacity','0');
        setTimeout(function(){
          $('#create-board-modal-container').css('display','none');
          $('#create-board-input').val('')
        }, 300);
        // $scope.images = response;
      })
    }
  }

  // Remove error class
  $scope.boardNameFocus = () => {
    $('#create-board-input').keypress(function(event){
      console.log('typing');
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
        console.log(response);



      }, 0)

      $('#create-board-modal-container').css('opacity','0');
      $('#create-board-step').css('opacity','0');
      setTimeout(function(){
        $('#create-board-modal-container').css('display','none');
        $('#create-board-input').val('')
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
