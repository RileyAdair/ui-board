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
      console.log('please enter site');
    }
    else {
      console.log(boardId);
      boardSrvc.addSite(site, boardId)
      .then(response => {

        imagesArr.push(response);
        console.log(response);
        // $scope.images = response;
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

        imagesArr.push(response);
        // $scope.images = response;
        console.log(response);
      }, 0)
    })
  }
  
});
