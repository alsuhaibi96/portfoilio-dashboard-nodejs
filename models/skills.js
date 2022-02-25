const mongoose = require("mongoose");

const schemaa =mongoose.Schema; 
// create a schema for skills
var skillsSchema = new schemaa({
    name:{ 
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true,
            },
            level:{
                type:String,
                required:true,
            },
        },
            {
                timestamps:true}
        
);
 
var skillsModel=mongoose.model('skills',skillsSchema);
 
module.exports = skillsModel;