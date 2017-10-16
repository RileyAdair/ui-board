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

  // Boards array
  $scope.boards = [];
  const boardsArr = $scope.boards;

  // Get user and boards
  directorySrvc.getUser($stateParams).then(response => {
    $scope.user = response.data[0];
  })

  directorySrvc.getBoards($stateParams).then(response => {
    console.log(response);
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
  $scope.createBoard = (board) => {
    if(!board) {
      console.log('Please enter name');
    }
    else {
      board.id = $stateParams.id;
      directorySrvc.createNewBoard(board);
    }
  };

  // Hide / Show - Modal
  $scope.hideModal = () => {
    $scope.showModal = false;
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
