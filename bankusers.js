// DB for API Testing
var mongoose = require("mongoose");

var APISchema = new mongoose.Schema({
 
bank: {
  _id:false, 
  bankname: String,
    price:  Number 
  },
branch: {
  _id:false,
   branchname: String,
   state:  String 
  },

  useraccount: [
    {
      _id:false,
      accountname: String,
      upid:  String,
      amount: Number 
  }
  ]
  


 
});

//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("bankdata",APISchema)