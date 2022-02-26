const mongoose = require("mongoose");

const Sechema =mongoose.Schema; 
// create an schema
var coursesSchema = new Sechema({
    course_name: {
                type:String,
                required:true
            },
            course_average:{
                type:String,
                required:true,
            },
            course_center_name:{
                type:String,
                required:true,
            },

            course_date:{
                type:String,
           required:true,
            },
        },
        {
            timestamps:true
        }
        
        );
 
var coursesModel=mongoose.model('courses',coursesSchema);
 
module.exports = coursesModel;