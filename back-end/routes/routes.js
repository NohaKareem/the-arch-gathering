var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var Architecture = require('../models/Architecture.js');
var User = require('../models/User.js');

const AUTH_ROUTE = 'api/architectures';

// GET about page
router.get('/about', function(req, res, next) {
  res.sendFile((path.join(__dirname, '../views', 'about.ejs')));
});

  // // GET architectures, redirect to architecture.ejs
  // router.get('/architectures', function(req, res, next) {
  //   Architecture.find((err, architectures) => {
  //     handleErr(err);
  //     // res.json(architectures);
  //     res.render('architectures', { title: 'Architecture', architectures:architectures });
  //   });
  // });

// POST a comment to architecture
router.post('/architecture/:id/new/comment', function(req, res, next) {
  // retrieve all comments (array)
  let allComments = [];
  Architecture.findOne({ _id: req.params.id }, (err, architecture) => {
    handleErr(err);
    console.log('inside query');
    console.log(architecture);
    // console.log(architecture.comments);
    allComments = architecture.comments;
    console.log(allComments);
    if (allComments === null) allComments = [];
    allComments.push({
      comment: req.body.comment, 
      author: req.body.author
    });
    
    console.log(allComments);
      // add comment
    let updateQuery = Architecture.findOneAndUpdate({ _id: req.params.id },
        { comments: allComments });
        updateQuery.exec((err, response) => {
          handleErr(err);
          console.log('added comment');
        });
    });
});

// testing routes
// GET all users 
// router.get('/users', function(req, res, next) {
//   User.find((err, users) => {
//     handleErr(err);
//     res.json(users);
//   });
// });

// authentication routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log In', message: req.flash('message') }); //~login form
});

router.get('/register', function(req, res, next) {
  res.render('register_form', { title: 'Register', message: req.flash('message') });//~register form
});

// router.get('/home', function(req, res, next) {
//   res.send('logged in!');
// });

router.post('/login', passport.authenticate('local'), function(req, res, next) {
	if(!req.user) {
		res.redirect('/');
	}
  // res.redirect(AUTH_ROUTE); //~~
  res.redirect(AUTH_ROUTE); //~~
  return next();//~~~
});

router.post('/register', function(req, res, next) {
	User.register(new User({
		username:req.body.username,
    email:req.body.email 
  }),
		req.body.password,

		function(err, user) {
      if (err) {
        res.render('register_form', {title: 'Register', user:user, message: req.flash('message') });
      }
      
      // automatically logs in any new user
      passport.authenticate('local')(req, res, function() {
        // res.redirect(AUTH_ROUTE);
        return next();
      });
    });
});

// helper method
function handleErr(err) {
  if(err) return next(err);
}

module.exports = router;