// DB for API Testing
var mongoose = require("mongoose");

var APISchema = new mongoose.Schema({

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
        
    courses: [{ coursename: String, price: Number }]



    
});

//UserSchema.plugin(passportLocalMongoose);

