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
  return res.redirect('/');
  // res.sendFile((path.join(__dirname, '../views', 'index.ejs')));
}

// GET all architectures
router.get('/architectures', isLoggedIn, function(req, res, next) {
    Architecture.find((err, architectures) => {//~
      handleErr(err);
      res.json(architectures);
    }).sort({ name: 'asc' });
  });

// GET one architectures with given id
router.get('/architectures/:id', isLoggedIn, function(req, res, next) {
  Architecture.find({ _id: req.params.id }, (err, architecture) => {
    handleErr(err);
    res.json(architecture);
  });
});

// GET one architect with given id
router.get('/architects/:id', isLoggedIn, function(req, res, next) {
  Architect.find({ _id: req.params.id }, (err, architect) => {
    handleErr(err);
    res.json(architect);
  });
});

// GET all architects
router.get('/architects', isLoggedIn, function(req, res, next) {
  Architect.find((err, architects) => {
    handleErr(err);
    res.json(architects);
  }).sort({ first_name: 'asc' });
});

// GET all architectures by an architect
router.get('/architects/:id/architectures', isLoggedIn, function(req, res, next) {
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