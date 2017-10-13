app.controller('boardCtrl', function($scope, $timeout, $location, $stateParams, $sce, boardSrvc, $rootScope, $state) {

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
    $('body').find('.board-name-header').on('click', function() {
      $(this).prop('contentEditable', true)
    })
    $('body').find('.board-name-header').on('blur', function() {
      const name = $(this).text()
      if(name) {
          boardSrvc.updateBoardName(name, boardId);
      }
    })
    $('body').find('.board-name-header').keypress(function(event){
      if(event.keyCode == 13){
        $(this).prop('contentEditable', false)
        const name = $(this).text()
        if(name) {
          boardSrvc.updateBoardName(name, boardId);
        }
      }

    });
  })

  // **** For testing updates
  $scope.images;
  // Get Board Name & Board Images / Sites
  boardSrvc.getBoardName(boardId).then(response => {
    $scope.boardName = response.data[0].name;
  })
  boardSrvc.getBoardImages($stateParams).then(response => {
    console.log(response);
    $scope.images = response;
  })

  // Delete image
  $scope.deleteImage = (image) => {
    const imageId = image.image_id;
    console.log(boardId);
    boardSrvc.deleteImage(imageId, boardId).then(response => {
      $scope.images = response;
    })
  }

  // Add site
  $scope.addSite = (site) => {
    if(!site){
      console.log('please enter site');
    }
    else {
      console.log(boardId);
      boardSrvc.addSite(site, boardId)
      .then(response => {
        console.log(response);
        $scope.images = response;
      })
    }
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
        $scope.images = response;
        console.log(response);
      }, 0)
    })
  }

});
