const mongoose = require("mongoose");
const app = require("../app");

const Sechema =mongoose.Schema; 
// create an schema
var experienceSchema = new Sechema({
    experience: {
                type:String,
                required:true
            },
            year:{
                type:Number,
                required:true,
            },
            company_name:{
                type:String,
                required:true,
            }
            
        });
 
var experienceModel=mongoose.model('experience',experienceSchema);
 
module.exports = experienceModel;