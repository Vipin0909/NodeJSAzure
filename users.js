var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

    email:{

        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        require:true
        },
    password:{
        type:String,
        require:true
        }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",UserSchema)

