var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var AboutYouSchema = new mongoose.Schema({

    firstname:String,
    lastname:String
});

AboutYouSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("abtpage",AboutYouSchema)
//var Blog = mongoose.model("abtpage",AboutYouSchema)