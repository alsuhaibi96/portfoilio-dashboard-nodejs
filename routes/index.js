var express = require('express');
var router = express.Router();
const assert = require("assert")
var mongoose = require('mongoose');
var experienceModel = require('../models/experience');
var skillsModel=require('../models/skills');
var qualificationsModel=require('../models/qualifications');


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
qualificationsModel.find().then((result)=>{

  res.render('qualification', { title: 'Qualifications',qualifications:result });
})
});

/* GET dashboard page. */
router.get('/skills', function(req, res, next) {
skillsModel.find().then((result)=>{
  res.render('skills', { title: 'Skills' ,skills:result});

})
});

/* GET edit experience dashboard page. */
router.get("/experience", (req, res, next)=>{
  experienceModel.find().then((result) =>{
    res.render("experience", {title: "Experience", data: result})
  })
})

//##  Experience methods (get,add,delete) ##//


//Add new experience to the view in the data tables section
router.post('/add_experience', function(req, res, next) {
     
    var experienceDetails = new experienceModel({
      experience: req.body.experience,
      year: req.body.year,
      company_name: req.body.company_name,
    });
     
    experienceDetails .save();
          

      res.redirect('/experience');
  
});

//Edit  experience on the view in the data tables section

    router.post('/edit_experience', function(req, res, next){
      var item = {
        experience: req.body.experience,
        year: req.body.year,
        company_name:req.body.company_name
      };
      var id = req.body.id;
      experienceModel.updateOne({"_id": id}, {$set: item}, item, function(err, result){
        assert.equal(null, err);
        console.log("item updated");
      })
      res.redirect('experience');
    });

//Delete experience item

  router.get('/delete_experience/:id',function(req,res,next){
    experienceModel.deleteOne({"_id":req.params.id},function(err,result){
      console.log("item deleted");
    })
  res.redirect('/experience');

  });

//##  Skills methods (get,add,delete) ##//

//Add new skill to the view in the data tables section
router.post('/add_qualification', function(req, res, next) {
     
  var qualificationDetails = new qualificationsModel({
    qualification: req.body.qualification,
    date: req.body.date,
    university: req.body.university,
  });
   
  qualificationDetails.save();
        

    res.redirect('/qualification');

});

//Edit Skill on the view in the data tables section

router.post('/edit_qualification', function(req, res, next){
  var item = {
    qualification: req.body.qualification,
    date: req.body.date,
    university:req.body.university
  };
  var id = req.body.id;
  qualificationsModel.updateOne({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  res.redirect('/qualification');
});

//Delete skill item

router.get('/delete_qualification/:id',function(req,res,next){
  qualificationsModel.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
res.redirect('/qualification');

});
 


//##  Qualifications methods (get,add,delete) ##//

//Add new skill to the view in the data tables section
router.post('/add_skill', function(req, res, next) {
     
  var skillDetails = new skillsModel({
    name: req.body.name,
    description: req.body.description,
    level: req.body.level,
  });
   
  skillDetails.save();
        

    res.redirect('/skills');

});
module.exports = router;
