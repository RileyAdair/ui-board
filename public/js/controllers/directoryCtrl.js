app.controller('directoryCtrl', function($scope, $location, $stateParams, directorySrvc) {

  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })

  angular.element(document).ready(function(){

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

  // Boards array
  $scope.boards = [];
  const boardsArr = $scope.boards;

  // Get user and boards
  directorySrvc.getUser($stateParams).then(response => {
    $scope.user = response.data[0];
  })

  directorySrvc.getBoards($stateParams).then(response => {
    response.forEach(i => {
      boardsArr.push(i);
    })
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
      // console.log(board);
      // board.id = $stateParams.id;
      directorySrvc.createNewBoard(board);
    }
  };

  // Remove error class
  $scope.boardNameFocus = () => {
    $('#create-board-input').keypress(function(event){
      console.log('typing');
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
  }

});
