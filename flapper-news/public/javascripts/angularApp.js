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
        },
      
        comments: function($stateParams,commentFactory){
          return commentFactory.getComments($stateParams.id);
        } 
      } 
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
      comments:[]
    });
  	$scope.title='';
  	$scope.link='';
    } 
  };
  $scope.incrementUpvote= function(post){
  	postFactory.upvote(post);
  }
}]);



app.factory('postFactory', ['$http', function($http){ // model

  var obj= {                                          // value-object layer
    postList:[]
  };

  obj.getAll= function(){                             // service layer & data access layer rolled into one
    return $http.get('/posts').success(function(data){
      angular.copy(data, obj.postList);
    });
  };

  obj.getPost= function(id){
    return $http.get('/posts/' + id).then(function(response){
      return response.data;
    });
  };

  obj.create= function(data){
    return $http.post('/posts', data).then(function(post){
      obj.postList.push(post.data);
    }, function(post){
      console.log('Failure to create' + '&nbsp' + post.data);
    });
  };

  obj.upvote= function(post){
    return $http.put('/posts/' + post._id + '/upvote').success(function(result){
       post.upvotes+=1; 
      });
    };
  
  return obj;
}]);



app.factory('commentFactory',['$http', function($http){

  var obj= {
    commentList:[]
  };

  obj.getComments= function(postId){
    return $http.get('/posts/' + postId + '/comments').then(function(response){
      angular.copy(response.data, obj.commentList);
    },
    function(response){
      console.log('Can\'t retrieve comments : ' + response.data);      
    });
  };

  return obj;
}]);



app.controller('PostsCtrl',[
  '$scope',
  'postFactory', 
  'post',   
  'commentFactory',    
  function($scope,postFactory,post,commentFactory)
{
  $scope.post= post;
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