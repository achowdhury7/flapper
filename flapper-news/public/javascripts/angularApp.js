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
      controller: 'PostsCtrl'  
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', ['$scope','posts', 'postFactory',
function($scope, posts, postFactory){ 
  $scope.posts =postFactory.postList; // binding the service to a 'scope' variable, therefore enabling 2-way binding
  $scope.addPost=function(){
  	if ($scope.title && $scope.title != '') {
  	postFactory.create({
      title: $scope.title, 
      link: $scope.link, 
      upvotes: 0,
      comments:{}

    });
  	$scope.title='';
  	$scope.link='';
    } 
  };
  $scope.incrementUpvote= function(post){
  	postFactory.upvote(post);
  }
}]);



app.factory('postFactory', ['$http', function($http){

  var obj= {
    postList:[]
  };

  obj.getAll= function(){
    return $http.get('/posts').success(function(data){
      angular.copy(data, obj.postList);
    });
  };

  obj.create= function(){
    return $http.post('/posts').success(function(data){
      obj.postList.push(data);
    });
  };

  obj.upvote= function(post){
    return $http.put('/posts/' + post.id + '/upvote').success(function(data){
       post.upvotes+=1; 
      });
    };
  
  return obj;
}]);



app.factory('commentFactory',function(){

  var obj= {
    commentList:[]
  };
  return obj;
});



app.controller('PostsCtrl',[
  '$scope',
  'postFactory',  
  'commentFactory',
  '$stateParams',
  function($scope,postFactory,commentFactory,$stateParams)
{
  $scope.post= postFactory.postList[$stateParams.id];
  $scope.post.comments= commentFactory.commentList;
  $scope.addComment = function(){
    if ($scope.body && $scope.body != '') {
      $scope.post.comments.push({
        author: $scope.author,
        body: $scope.body,
        upvotes: 0
      });

      $scope.author='';
      $scope.body= '';
    }
  };

}]);