var app = angular.module('app', ['ui.router', 'ngFileUpload', 'ngAnimate'])
.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })

    .state('directory', {
      url: '/directory:id',
      templateUrl: 'views/directory.html',
      controller: 'directoryCtrl'
    })

    .state('board', {
      url: '/directory:id/board:board_id',
      templateUrl: 'views/board.html',
      controller: 'boardCtrl'
    })

    .state('board.view', {
      url: '/:view',
      templateUrl: 'views/view.html',
      controller: 'viewCtrl'
    })
});
