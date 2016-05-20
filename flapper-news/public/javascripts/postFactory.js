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
