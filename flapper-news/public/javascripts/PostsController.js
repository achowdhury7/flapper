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