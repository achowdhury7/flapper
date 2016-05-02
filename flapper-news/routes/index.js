var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Post= mongoose.model('Post');
var Comment= mongoose.model('Comment');

/* GET home page. */
router.get('/posts', function(req, res, next) {
	Post.find(function(err,posts){
		if (err) {return next(err);}
		res.json(posts);	

	});
 
});

router.post('/posts',function(req, res, next){

	var post= new Post(req.body);	
	console.log(req.body);
	post.save(function(err, post){
		if (err) {next(err)};

		res.json(post);
	});
});

router.param('post', function(req,res,next,id){
<<<<<<< HEAD
	var query = Post.findBId(id);

	query.exec(function(err, result){
		if (err){return next(err);}
		if (!result) { return next(new Error('Can\'t find post'));}
		req.post= result;
		next();
	});
});

router.get('/post/:posts', function(req, res, next){
	res.json(req.post);
	});

=======
	var query= Post.findById(id);

	query.exec(function(error,result){
		if (error){ next(error);}
		if (!result) {next(new Error('Can\'t find post id'));}

	req.post= result;
	next();	
	});

});

router.get('/posts/:post',function(req,res,next){
	res.json(req.post);
});

router.put('/posts/:post/upvote', function(req, res, next){
	req.post.upvote(function(err, result){
		if (err) {next(err);};

		res.json(result);
	});
});


router.post('/posts/:post/comments', function(req, res, next){
	var comment= new Comment(req.body);

	comment.save(function(err, result){
		if(err){next(err);}
		comment.post= req.post;
		req.post.comments.push(result);
		req.post.save(function(err,result){
			if(err){next(err);}
			res.json(result);
		});

	});
});

router.param('comment', function(req, res, next, id){
	var query = Comment.findById(id);

	query.exec(function(err, result){
		if(err){next(err);}
		req.comment= result;
	});
});
>>>>>>> fb706746babc1aa9cb5cfed424aa81be1753f25b


module.exports = router;
