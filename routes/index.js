var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var experienceModel = require('../models/experience');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Abdulrahman Alsuhaibi' });
});
/* GET dashboard page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Dashboard' });
});

/* GET experience dashboard page. */
// router.get('/experience', function(req, res, next) {
//   res.render('experience', { title: 'Experience' });
// });

/* GET courses dashboard page. */
router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Courses' });
});

/* GET qualification dashboard page. */
router.get('/qualification', function(req, res, next) {
  res.render('qualification', { title: 'Qualifications' });
});

/* GET dashboard page. */
router.get('/skills', function(req, res, next) {
  res.render('skills', { title: 'Skills' });
});

/* GET edit experience dashboard page. */
router.get('/experience-details', function(req, res, next) {
  res.render('experience-details', { title: 'Edit experience' });
});

router.post('/add_experience', function(req, res, next) {
     
  //No errors were found.  Passed Validation!
       
   
    var experienceDetails = new experienceModel({
      experience: req.body.experience,
      year: req.body.year,
      company_name: req.body.company_name,
    });
     
    experienceDetails .save();
          
 
         
      // res.render('experience', { 
      //     title: 'Experience',
      //     experience: req.body.experience,
      //     year: req.body.year,
      //     company_name: req.body.company_name,
      // })
      res.redirect('/experience');
  
});
router.get('/experience', (req, res) => {

  experienceModel.find((err, docs) => {
    if (!err) {
        res.render("experience", {
            data: docs
        });
    } else {
        console.log('Failed to retrieve the  List: ' + err);
    }
});

});


router.get('/experience/:id', (req, res) => {
  const id = req.params.id;
  experienceModel.findById(id)
    .then(result => {
      res.render('experience-details', { exp: result, title: 'experience' });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/experience', (req, res) => {

  experienceModel.find((err, docs) => {
    if (!err) {
        res.render("experience", {
            data: docs
        });
    } else {
        console.log('Failed to retrieve the  List: ' + err);
    }
});

});

router.delete('/experience/:id', (req, res) => {
  const id = req.params.id;
  
  experienceModel.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/experience' });
    })
    .catch(err => {
      console.log(err);
    });
});

// var objectID = require('mongodb').ObjectID;

// router.get('/edit/:id', (req, res) => {    
//   var id = req.params.id;
//   var o_id = new objectID(id);
//   experienceModel.find({_id:o_id}).toArray((err, result) => {
//      if (err) return console.log(err)
//      console.log(result);
//      res.render('edit-experience',{experiences: result});  
//   });
//   console.log(req.params.id);
//   });
  
//   router.post('/edit',(req, res) => {
//     experienceModel.update ({ _id: objectID(req.body._id) }, {$set: {
//     experience: req.body.experience,
//       year: req.body.year
//    }
//    }, function (err, result) {
//         if (err) {
//         console.log(err);
//       } else {
//        console.log("Post Updated successfully");
//        res.render('edit-experience');
//    }
//   });});
  

module.exports = router;
