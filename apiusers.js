// DB for API Testing
var mongoose = require("mongoose");

var APISchema = new mongoose.Schema({
        mobile: [{
            _id:false,
            mobilename: String,
            price:  Number 
            
          }],
        webautomation: [ {
            _id:false,
            coursename: String,
            price:  Number 
        }],
        api: {
            _id:false,
            coursename: String,
            price:  Number 
          },
    
          // end of course    
    
        url: {
            type:String,
            require:true
        },
        services: {
            type:String,
            require:false,
            
        },
        experties: {
            type:String,
            require:true
        },
        instructor:{
            type:String,
            require:true
        },
        linkedin:{
            type:String,
            require:true
        },
    
       status:{
         type:String,
         require:true
        },
        username:{
        type:String,
        require:true
        },
        password:{
        type:String,
        require:true
        },
        email:{
        type:String,
        require:true
        
        },

        laptopcountry:{
        type:String,
        require:true
        },
        language:{
        type:String,
        require:true
        },
        location:{
        _id:false,
        state:String,
        city:String
        },
        laptop: [ {
            _id:false,
            laptopname: String,
            price:  Number 
        }],

        Employee: [{
           _id:false,
            employee_id: String,
            first_name:  String,
            last_name:String,
            Email:String,
            Phone_Number:Number,
            Hire_Date:String,
            Job_id:String,
            Salary:Number,
            Manager_id:Number,
            Departemnt_id:Number
                
          }]
        
     
});

//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("apiuser",APISchema)