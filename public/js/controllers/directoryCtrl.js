app.controller('directoryCtrl', function($scope, $location, $stateParams, directorySrvc, $state) {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        $scope.user = user
        $scope.hide = false
    }
    else {
      $scope.hide = true
    }
  })



  angular.element(document).ready(function(){
    setTimeout(function(){
      $('body').find('.directory-boards-container').css('opacity', '1')
    }, 550);

    function animate(){
      TweenMax.staggerFrom(".animate", .23, {opacity:0, scale:1.3}, 0.2);
    }
    setTimeout(function(){
      animate()
    }, 300);

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

  // Boards array
  $scope.boards = [];
  const boardsArr = $scope.boards;

  $scope.checkLength = () => {
    if(boardsArr.length > 0){
      $('#board-message').css('display','none')
    }
    else {
      $scope.startMessage = true;
      $('#board-message').css('display','block')
    }
  }

  // Get user and boards
  directorySrvc.getUser($stateParams).then(response => {
    $scope.user = response.data[0];
  })

  directorySrvc.getBoards($stateParams).then(response => {
    response.forEach(i => {
      boardsArr.push(i);
    })
    $scope.checkLength();
  })

  // Board route
  $scope.boardRoute = (board) => {
    board.userId = parseInt($stateParams.id);
    directorySrvc.boardRoute(board)
  }

  // Create board
  $scope.createBoard = (boardName) => {
    if(!boardName) {
      console.log('Please enter name');
      $('#create-board-container').addClass('error')
    }
    if(boardName) {
      console.log(boardName);
      const board = {
        name: boardName,
        id: $stateParams.id
      }
      directorySrvc.createNewBoard(board);
    }
  };

  // Remove error class
  $scope.boardNameFocus = () => {
    $('#create-board-input').keypress(function(event){
      $('#create-board-container').removeClass('error')
    });
  }

  // Delete Board
  $scope.deleteBoard = (board) => {
    let boardProp = 'board_id'
    let boardId = board;
    let i = boardsArr.length;
    while(i--){
       if( boardsArr[i]
           && boardsArr[i].hasOwnProperty(boardProp)
           && (arguments.length > 2 && boardsArr[i][boardProp] === boardId ) ){

           boardsArr.splice(i,1);

       }
    }
    const userId = parseInt($stateParams.id);
    directorySrvc.deleteBoard(board, userId)
    setTimeout(function(){
      $scope.checkLength();
    }, 500)
  }

});
