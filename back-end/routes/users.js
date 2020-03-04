var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// get user id
router.get("/getUserId", (req, res) => {
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({ user: req.user._id });
  }
});

// POST saving an architecture piece as a favorite
router.post('/:id/add/architecture/:archId', function(req, res, next) {
  // retrieve all saved architectures (array)
  let allSavedArchs = [];
  User.findOne({ _id: req.params.id }, (err, user) => {
    handleErr(err);
    allSavedArchs = user.saved_archs;

    console.log(allSavedArchs);
    
    if (allSavedArchs === null) allSavedArchs = [];
    allSavedArchs.push(req.params.archId);
    
    console.log(allSavedArchs);
      
    // add saved_archs
    let updateQuery = User.findOneAndUpdate({ _id: req.params.id },
        { saved_archs: allSavedArchs });
        updateQuery.exec((err, response) => {
          handleErr(err);
          console.log('added arch to favoutites list');
        });
    });
});

module.exports = router;
