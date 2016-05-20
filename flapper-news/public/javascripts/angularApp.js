var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        posts: function(postFactory){
        return postFactory.getAll();
        }
      }
    })

    .state('posts',{
      url:'/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: function($stateParams,postFactory){
          return postFactory.getPost($stateParams.id); //$stateparams.id takes reference of the url parameter
        } 
      } 
    });

  $urlRouterProvider.otherwise('home');
}]);











