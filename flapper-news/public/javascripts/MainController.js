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