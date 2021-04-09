//------------------ Initialization of parameters-------------------------------------------
const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const mongoose    = require("mongoose");
const bankdata = require("./bankusers");
const apiuser = require("./apiusers");
const passport = require('passport');
const LocalStrategy = require('passport-local');
//const user = require("./users");

app.use(bodyParser.json());

//---------------------- Mongo DB connection settings--------------------------------------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require("constants");
//const AboutYouSchema = require("./AboutYouSchema");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const APIdb = 'APIDatabase';

mongoose.connect('mongodb://localhost/myproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);

// Database Name
const dbName = 'myFEBProject';



// -----------------------MIddleware-----------------------

// app.use(passport.initialize);
// app.use(passport.session);
// passport.use(new LocalStrategy(user.authenticate));
// passport.serializeUser(user.serializeUser);
// passport.deserializeUser(user.deserializeUser);

// -----------------------Create Routes-----------------------

// Gets back all the posts in databases
app.get('/posts',async(req,res)=>{
  try {
    
      const getusers =  await apiuser.find();
      res.send(getusers);

  } catch (error) {
    res.json({message:error})
  }
})

// POST Submit the data to the database 
app.post('/posts',async function(req,res){
  
//find an existing user
let user = await apiuser.findOne({ email: req.body.email });
//if (user) return res.status(400).json({status:"User already registered."});

  const createapiuser = new apiuser({
      status:req.body.status,
      username:req.body.username,
      password:req.body.password,
      email:req.body.email
  });
      
  createapiuser.save()
  .then(data=> {
    
    return res.json(data);
   
   
  })
  // .catch(err => {
  //  // res.json({ message : "this is a message"})
    
  // });
})

//Get Specific user data

app.get('/posts/:postId',async (req,res)=>{
  try {
       const createapiuser =  await apiuser.findById(req.params.postId);
       return res.json(createapiuser);
       //return res.json({message:"here we got the details by passing id"});
 } catch (error) {
     res.json({message:error})
   }
 })


// Delete a POST or delete a specific user data

app.post("/posts/postId",async (req,res)=>{
  try {
    
    const deleteuser =  await apiuser.deleteOne({ _id: req.body.postId});
    //return res.json(deleteuser);
    return res.json({message:"User Deleted"});
 } catch (err) {
     res.json({message:err})
   }
 });

// -----------------add new course for POJO class test----------------------

 // POST Submit the data to the database 
app.post('/posts/courses',async function(req,res)
{
   
  const coursedetails = new apiuser
  ({
      
    url:req.body.url,
    //services:req.body.services,
    experties:req.body.experties,
    instructor:req.body.instructor,
    linkedin:req.body.linkedin,
    //courses:req.body.courses
    mobile:req.body.mobile,
    webautomation:req.body.webautomation
    
  });
   
   coursedetails.save()

  .then(data=> {
    if(!req.body.services) {
      return res.json({ message : "service is required Vipin !!"});
    } 
   return res.json(data);
  })
  
  // .catch(err => {
  //  // res.json({ message : "this is a message"})
    
  // });
     
  });
  

  // GET the course details
  app.get('/posts/getcourses/:courseid',async (req,res)=>
  {
        const getcourses =  await apiuser.findById(req.params.courseid);
        return res.json(getcourses);
  })


  // Put the course details
  app.put('/put/updatecourse/:courseid',async(req,res)=>{
    const putcourses =  await apiuser.findById(req.params.courseid);
    return res.json({message:"update successful !!"})

  });
    

 // -----------------Serializaed Testing- Laptop requests---------------------
app.post('/posts/seri/laptop',async function(req,res){
  try {
    
    const seri = new apiuser({
    
      laptopcountry:req.body.laptopcountry,
     // language:req.body.language,
      location:req.body.location,
      laptop:req.body.laptop
      
  });
  seri.save()
  .then(data=> {
    return res.json(data);
  })

  } catch (error) {
    res.json({message:error})
  }

});

// Get Laptop request
app.get('/posts/getsiridata/:id',async (req,res)=>{
  try {
       const siridata =  await apiuser.findById(req.params.id);
       return res.json(siridata);
       
 } catch (error) {
     res.json({message:error})
   }
 })

// Delete laptop request

app.delete("/laptopdata/:id",async (req,res)=>{
  try {
    
    const deletelaptopdata =  await apiuser.deleteOne({_id: req.params.id});
    //return res.json(deletelaptopdata);
    //res.json({message:"Laptop data Deleted"});
    return res.statusCode=202;
    
 } catch (err) {
     res.json({message:err})
   }
 });



 // Bank user data
 // POST Submit the data to the database 
app.post('/post/bankusers',async function(req,res){
  
  //find an existing user
  //let user = await bankuser.findOne({ email: req.body.email });
  //if (user) return res.status(400).json({status:"User already registered."});
  
    const createbankuser = new bankdata({
        useraccount:req.body.useraccount,
        bank:req.body.bank,
        branch:req.body.branch
    });
        
    createbankuser.save()
    .then(data=> {
      
      return res.json(data);
    
     
    })
    // .catch(err => {
    //  // res.json({ message : "this is a message"})
      
    // });
  })


 // -----------------Employee data---------------------
 app.post('/posts/addemployee',async function(req,res){
  try {
    
    const employee = new apiuser({
    
      Employee:req.body.Employee
      //employee_id:req.body.employee_id
      
  });
  employee.save()
  .then(data=> {
    return res.json(data);
  })

  } catch (error) {
    res.json({message:error})
  }

});



// -----------------Initializing the server port at 3000----------------------
app.listen(3000, function() { 
  console.log('Server listening on port 3000 for API testing...'); 
});
