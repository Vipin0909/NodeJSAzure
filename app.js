//------------------ Initialization of parameters-------------------------------------------
var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var user = require("./users");
//var abtpages = require("./AboutYouSchema");


//---------------------- Mongo DB connection settings--------------------------------------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require("constants");
//const AboutYouSchema = require("./AboutYouSchema");

// Connection URL
//const url = 'mongodb://localhost:27017';
const url = ' mongodb+srv://yelpbdd:yelpadd@cluster0.4qboj.mongodb.net/myproject?retryWrites=true&w=majority';
// Database Name
const dbName = 'myproject';

// mongoose.connect('mongodb://localhost/myproject', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(' mongodb+srv://yelpbdd:yelpbdd@cluster0.4qboj.mongodb.net/myproject?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//"mongodb+srv://yelpbdd:yelpadd@cluster0.4qboj.mongodb.net/myproject?retryWrites=true&w=majority"

//----------------Passport Authentication settings------------------------------------------
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//----------------Cookie Session Authentication------------------------------------------

const session = require("client-sessions");

app.use(session({
cookieName:"session",
secret:"YelpSecretVIPcode",
duration: 1*60*1000, // 10 min

}));

// About You page schema to store this page data
var AboutYouSchema = new mongoose.Schema({

  firstname:String,
  lastname:String,
  email:String,
  address1:String,
  address2:String,
  specialNotes:String

});

var abtpage = mongoose.model("abtpage",AboutYouSchema)

// //Route 1  - GET
// app.get("/",function(req,res){
//   res.render("login");
//   //console.log("Request made to landing page..");
//   //res.send("Hi there..");
//   //res.render("landing");
// });


// -----------------------Registration ROUTE - handling user sign up for new user-----------------------
app.get("/Register",function(req,res){
  //res.json({"message":"Hey New User Register..."});
  res.render("Register")
  
})


//----------------------------------------------------------------------------------------------------

app.post("/Register", function(req,res){
  req.body.username;
  req.body.password;
  
  

   user.register(new user({username:req.body.username}),req.body.password,function(err,user){
    
    console.log(req.body.username);

    // uncomment belwo if stmt for when running API
      // if(res.statusCode==200)
      // {
         
      //   res.redirect("/login")
      //    console.log("there you are !")
      // }
         
     if(err){
       console.log(err);
       return res.render('Register');
     }
     else
     {
      res.redirect("/login") 
      if(res.statusCode==200)
       {
        res.status(200).json({
          status: 'OK',
          error: 'Success',
        })
        
        //console.log("there you are !")
       }
      }


     passport.authenticate("local")(req,res,function(){
      
       res.redirect("/login")
      // res.json({"message":"Hey New User Register..."});
     })
  })
 })

// -----------------------Login ROUTE - handling user login-----------------------
app.get("/login",function(req,res){
    res.render("login");
    console.log("User Register Successfuly..");
    console.log("Request made to login page..");
    

});

//login logic - very that user is exist or not 
//middleware
app.post("/login", passport.authenticate("local",{
    
  
  successRedirect: "/AboutYou",
  failureRedirect: "/login"

}),function(req,res){
  req.session.userId=user._id;
  res.redirect("/login")
})


//---------------Logout logic----------------------------
app.get("/logout",function(req,res){
  req.logOut();
  res.redirect("/login");
})

//-------------check user is actually logged in or not and then logout ----------------
function isLoggedIn(req,res,next)
{
  if(req.isAuthenticated())
  {
    return next();
    console.log("user authenticated..")
  }
  res.redirect("/login"); 
}
//-------------------ROUTE - About You Page - -----------
app.get("/AboutYou",function(req,res){
  console.log(req.user); 
  res.render("AboutYou");
  console.log("Request made to AboutYou page..");
   
});


app.get("/login/:firstname",function(req,res){
  abtpage.findById(req.param.firstname,function(err,foundID){
  if(err){
    console.log("ID not Found")
    res.redirect("/AboutYou")
  }else{
    console.log("ID Found by POSTMAN")
  }

  })
  
});
//RESTFUL ROUTS
app.post("/AboutYou",function(req,res){
  app.post("/AboutYou", passport.authenticate("local",
  {
    successRedirect: "/AboutYou",
    failureRedirect: "/AboutYou"
  }));

   abtpage.create(req.body.AboutYou,function(err,abtyou){
    if(err){
      res.render("AboutYou")
    }else{
      res.redirect("/AboutYou")
    }
   
  }) // end of function
}) // end of post

 
//-------------------SAMPLE ROUTE Search by Achilles ID from Buyer - GET NOT IN USE------------
app.get("/Search/:BuyerName/",function(req,res){
  var Buyer = req.params.BuyerName;
  res.send("Welcome to " + Buyer.toUpperCase() + " Page !");
  console.log(Buyer)
  console.log("Request made to Search page..");
	//res.render("landing");
});

// -----------------Initializing the server port at 3000----------------------
// app.listen(3000, function() { 
//   console.log('Server listening on port 3000'); 
// });

// -----------------Initializing the server port for Heroku Deployment----------------------
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
  console.log("Testing Jenkins GIT and Heroku.TEST TWO...!");
});