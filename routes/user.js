const express= require("express");
const userSchema = require("../models/user");
const mongoose = require("mongoose");
const router= express.Router();


router.get("/login",(req,res)=>
{
   res.render("user/login");
});

router.post("/login",(req,res)=>
{
  
});

router.get("/register",(req,res)=>
{
   res.render("user/register");
});

router.post("/register",(req,res)=>
{
  const errors= [];
  
  //validate

  if(req.body.email==="")
  {
     errors.push("You must enter an email address");
  }

  if(req.body.firstName==="")
  {
     errors.push("You must enter a first name");
  }

  if(req.body.lastName==="")
  {
     errors.push("You must enter a last name");
  }

  if(req.body.username==="")
  {
     errors.push("You must enter a username");
  }

  if(req.body.password==="")
  {
     errors.push("You must enter a password");
  }

  if(req.body.cpassword==="")
  {
     errors.push("You must confirm password");
  }

  if(req.body.password!=="" && req.body.cpassword!=="")
  {
   if(req.body.password!= req.body.cpassword)
   {
      errors.push("passwords don't match"); 
   }
  }

   //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
  if(errors.length > 0)
  {
      res.render("User/register",{
         errors:errors,
         email: req.body.email,
         firstName: req.body.firstName,
         lastName : req.body.lastName,
         username : req.body.username
       });
  }

  //The else represents NO ERROS OCCURED THUS, ENTER DATA IN DATABASE
  else
  {
     //This creates a model in our application called user. A model is a representation of a collection
     const User = mongoose.model('Users', userSchema);


    //object literal must match schema
     const userData=
     {   
        email: req.body.email, 
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
     }
   
     //put document into collection
     new User(userData)
     .save()
     .then( ()=>
     {
      const accountSid = 'AC9e1b0f31f8f9ee244227a6f86ff1368e';
      const authToken = 'd2c21a84b6cd77cf2f332f8065af9533';
      const client = require('twilio')(accountSid, authToken);
      
      client.messages
        .create({
           body: `Welcome ${req.body.firstName} You have now been registered with AirBnb`,
           from: '+16479579767',
           to: '+16472120075'
         })
        .then(message => console.log(message.sid));

         const nodemailer = require('nodemailer');
         const sgTransport = require('nodemailer-sendgrid-transport');
         const options = {
         auth: {
             api_user: 'KaurWeb',
             api_key: 'India@2019'
         }
     }

     const mailer = nodemailer.createTransport(sgTransport(options));

     const email = {
      to: `${req.body.email}`, 
      from: 'Sukhdesigns21@gmail.com',
      subject: 'Registration is successful',
      text: 'Registration Done',
      html: `Hey ${req.body.firstName} You have been successfully registered with AirBnb`
  };
   
  mailer.sendMail(email, function(err, res) {
      if (err) { 
          console.log(err) 
      }
      console.log(res);
  });


       res.redirect("/user/login");
     })
     .catch( (err)=>
     {
       console.log(`Error ${err}`);
     })

}

});

module.exports=router;