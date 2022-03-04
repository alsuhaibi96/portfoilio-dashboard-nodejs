var express = require('express');
var router = express.Router();
const assert = require("assert");


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var experienceModel = require('../models/experience');
var skillsModel=require('../models/skills');
var qualificationsModel=require('../models/qualifications');
var coursesModel=require('../models/courses');

  
const app = express();


/* GET home page. */
router.get('/',forwardAuthenticated,function(req, res, next) {
  res.render('index', { title: 'Abdulrahman Alsuhaibi' });
});
/* GET dashboard page. */
router.get('/home',ensureAuthenticated ,function(req, res, next) {
  res.render('home', { title: 'Dashboard'});
});

/* GET courses dashboard page. */
router.get('/courses', ensureAuthenticated,function(req, res, next) {
coursesModel.find().then((result)=>{
  res.render('courses', { title: 'Courses',courses:result, message:req.flash("course-message"),messageEdit:req.flash("course-message-edit"),messageDelete:req.flash("course-message-delete")});

})

});

/* GET qualification dashboard page. */
router.get('/qualification', ensureAuthenticated,function(req, res, next) {
qualificationsModel.find().then((result)=>{

  res.render('qualification', { title: 'Qualifications',qualifications:result ,message:req.flash("qualification-message"),messageEdit:req.flash("qualification-message-edit"),messageDelete:req.flash("qualification-message-delete")});
})
});

/* GET dashboard page. */
router.get('/skills',ensureAuthenticated ,function(req, res, next) {
skillsModel.find().then((result)=>{
  res.render('skills', { title: 'Skills' ,skills:result,message:req.flash("skill-message"),messageEdit:req.flash("skill-message-edit"),messageDelete:req.flash("skill-message-delete")});

})
});

/* GET edit experience dashboard page. */
router.get("/experience",ensureAuthenticated ,(req, res, next)=>{
  experienceModel.find().then((result) =>{
    res.render("experience", {title: "Experience", data: result,message:req.flash("experience-message"),messageEdit:req.flash("experience-message-edit"),messageDelete:req.flash("experience-message-delete")})
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
          
    req.flash('experience-message', 'تم الاضافة بنجاح!');
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
      req.flash('experience-message-edit', 'تم التعديل بنجاح!');
      res.redirect('experience');
    });

//Delete experience item

  router.get('/delete_experience/:id',function(req,res,next){
    experienceModel.deleteOne({"_id":req.params.id},function(err,result){
      console.log("item deleted");
    })
    req.flash('experience-message-delete', 'تم الحذف!');
  res.redirect('/experience');

  });

//##  Qualifications methods (get,add,delete) ##//

//Add new qualification to the view in the data tables section
router.post('/add_qualification', function(req, res, next) {
     
  var qualificationDetails = new qualificationsModel({
    qualification: req.body.qualification,
    date: req.body.date,
    university: req.body.university,
  });
   
  qualificationDetails.save();
    req.flash('qualification-message', 'تم الاضافة بنجاح!');
        

    res.redirect('/qualification');

});

//Edit qualification on the view in the data tables section

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
  req.flash('qualification-message-edit', 'تم التعديل بنجاح!');

  res.redirect('/qualification');
});

//Delete qualification item

router.get('/delete_qualification/:id',function(req,res,next){
  qualificationsModel.deleteOne({"_id":req.params.id},
  function(err,result){
    console.log("item deleted");
  })
  req.flash('qualification-message-delete', 'تم الحذف!');

res.redirect('/qualification');

});
 




//##  Skills methods (get,add,delete) ##//

//Add new skill to the view in the data tables section
router.post('/add_skill', function(req, res, next) {
     
  var skillDetails = new skillsModel({
    name: req.body.name,
    description: req.body.description,
    level: req.body.level,
  });
   
  skillDetails.save();
        
  req.flash('skill-message', 'تم الاضافة بنجاح!');
    res.redirect('/skills');

});
module.exports = router;

//Edit a skill  in the data tables section
router.post('/edit_skill', function(req, res, next){
  var item = {
    name: req.body.name,
    description: req.body.description,
level:req.body.level
  };
  var id = req.body.id;
  skillsModel.updateOne({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  req.flash('skill-message-edit', 'تم التعديل بنجاح!');
  res.redirect('/skills');
});



//Delete a skill from the skills in the data tables section

router.get('/delete_skill/:id',function(req,res,next)

{
  skillsModel.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
  req.flash('skill-message-delete', 'تم الحذف!');

  res.redirect('/skills');
});


//##  Courses methods (get,add,delete) ##//

//Add new  Course to the view in the data tables section
router.post('/add_course', function(req, res, next) {
     
  var courseDetails = new coursesModel({
    course_name: req.body.course_name,
    course_average: req.body.course_average,
    course_center_name: req.body.course_center_name,
    course_date:req.body.course_date
  });
   
  courseDetails.save();
  req.flash('course-message', 'تم الاضافة بنجاح!');

    res.redirect('/courses');

});

//Edit a course in the data tables section
router.post('/edit_course', function(req, res, next){
  var item = {
    course_name: req.body.course_name,
    course_average: req.body.course_average,
course_center_name:req.body.course_center_name,
course_date:req.body.course_date
  };
  var id = req.body.id;
  coursesModel.updateOne({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  req.flash('course-message-edit', 'تم التعديل بنجاح!');

  res.redirect('/courses');
});

//Delete a single course 
router.get('/delete_course/:id',function(req,res,next){
  coursesModel.deleteOne({"_id":req.params.id},function(err,result){
console.log("item deleted");
  })
  req.flash('course-message-delete', 'تم الحذف!');

  res.redirect('/courses');
})

module.exports = router;