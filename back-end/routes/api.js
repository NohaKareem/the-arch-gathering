var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Architecture = require('../models/Architecture.js');
var Architect = require('../models/Architect.js');
var User = require('../models/User.js');

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
  // return res.redirect('/');
  res.sendFile((path.join(__dirname, '../views', 'index.ejs')));
}

          // // protect all API routes
          // router.get('*', isLoggedIn, function(req, res, next) {
          //   // console.log(req.user.username);
          //   // console.log(req.user._id);
          //   console.log(req.path)
          //   // res.redirect(req.path);
          //   if (req.path === '/architectures') {
          //     Architecture.find((err, architectures) => {//~
          //       handleErr(err);
          //       res.json(architectures);
          //     }).sort({ name: 'asc' });
          //   }
          //   return next();

          
          //   // res.render('protected', {title:'profile page', name:req.user.username});
          // });

/* GET API routes */
// GET all architectures
router.get('/architectures', function(req, res, next) {
  Architecture.find((err, architectures) => {
    handleErr(err);
    res.json(architectures);
  }).sort({ name: 'asc' });
});

// GET one architectures with given id
router.get('/architectures/:id', function(req, res, next) {
  Architecture.find({ _id: req.params.id }, (err, architecture) => {
    handleErr(err);
    res.json(architecture);
  });
});

// GET one architect with given id
router.get('/architects/:id', function(req, res, next) {
  Architect.find({ _id: req.params.id }, (err, architect) => {
    handleErr(err);
    res.json(architect);
  });
});

// GET all architects
router.get('/architects', function(req, res, next) {
  Architect.find((err, architects) => {
    handleErr(err);
    res.json(architects);
  }).sort({ first_name: 'asc' });
});

// GET all architectures by an architect
router.get('/architects/:id/architectures', function(req, res, next) {
  Architecture.find({ architects: req.params.id }, (err, architectures) => {
    handleErr(err);
    res.json(architectures);
  }).sort({ name: 'asc' });
});

// helper method
function handleErr(err) {
  if(err) return next(err);
}

module.exports = router;