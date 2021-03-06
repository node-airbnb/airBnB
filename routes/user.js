const express= require("express");
const userSchema = require("../models/user");
const mongoose = require("mongoose");
const router= express.Router();
const bcrypt = require('bcryptjs');

//This creates a model in our application called user. A model is a representation of a collection
const User = mongoose.model('Users', userSchema);

const hasAccess = require("../middleware/auth");


router.get("/login",(req,res)=>
{
res.render("user/login");
});

router.get("/register",(req,res)=>
{
res.render("user/register");
});

router.post("/register",(req,res)=>
{
const errors= [];

//validate

if(req.body.firstName==="")
{
   errors.push("You must enter a first name");
}

if(req.body.lastName==="")
{
   errors.push("You must enter a last name");
}

if(req.body.email==="")
{
   errors.push("You must enter a Email");
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
      firstName: req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email
      });
}

//The else represents NO ERROS OCCURED THUS, ENTER DATA IN DATABASE
else
{

//object literal must match schema
const userData=
{
   firstName : req.body.firstName,
   lastName: req.body.lastName,
   email: req.body.email, 
   password: req.body.password,
}


//The genSalt function is used to generate random Text that will then be added to your password. Then that new, edited password will be hash
bcrypt.genSalt(10, function(err, salt) 
{
   bcrypt.hash(userData.password, salt, function(err, hash) 
   {
   
      userData.password= hash;

      //put document into collection
   new User(userData)
   .save()
   


res.redirect("/user/login");
})
.catch( (err)=>
{
   console.log(`Error ${err}`);
})


   });
});


}

});


router.post("/login",(req,res)=>
{
const errors= [];

//validate

if(req.body.email==="")
{
errors.push("You must enter a email");
}

if(req.body.password==="")
{
errors.push("You must enter a password");
}

//THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
if(errors.length > 0)
{

   res.render("user/login",{
   errors:errors,
   email: req.body.email
   });
}
else
{
      User.findOne({email:req.body.email})
      .then(user=>{

         //user!=null, means that an actual user object was returned 
         if(user!=null)
         {
            // Load hash from your password DB.
            bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
            // res === true

            //if isMatched has a true value, that means that the user's password was matched with the has one stored in the db
            if(isMatched==true)
            {
               req.session.userInfo = user;
               console.log(req.session.userInfo)
               console.log("User is logged in")
               res.redirect("/room/viewrooms")
            }

            //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
            else

            {

               errors.push("You entered the incorrect password");
               res.render("user/login",{
               errors:errors,
               email: req.body.email
               });
            }


         });



         }

         //The else represents that the username was not found in the db
         else
         {
         errors.push("Sorry username does not exists in db");

         res.render("user/login",{
            errors:errors
   
         });

         console.log("no user name")
         


         }

      })

}

});

router.get("/profile", hasAccess, (req,res)=>
{
   res.render("user/profile");
});

//This navigates the user to the Task Edit form with populated data
router.get("/edit/:id",(req,res)=>
{ 
   User.findOne({ _id:req.params.id})
   .then((user)=>
   {
      res.render("user/editUser",{
         user:user,
      })
   })
});

router.put("/editUser/:id",hasAccess,(req,res)=>
{ 
   User.findOne({_id:req.params.id})
   .then(user=>
   {
      user.firstName=req.body.firstName;
      user.lastName=req.body.lastName;
      user.email = req.body.email;

      user.save()
         .then(user => {
         req.session.userInfo = user;
         res.redirect("/user/profile");
      })
   })
});
// router.put("/edit/:id",(req,res)=>
// { 

//       Room.findOne({_id:req.params.id})
//       .then(task=>
//       {
//          task.title=req.body.title;
//          task.address=req.body.address;
//          task.description = req.body.description;
//          task.image=req.body.image;

//          task.save()
//          .then(room=>{
//             res.redirect("/room/viewrooms");
//          })
//       })
// });

router.delete("/delete/:id",hasAccess, (req,res)=>{

      User.remove({_id:req.params.id})
      .then(() => {
         req.session.destroy();
         res.redirect("/");
      });

})

router.get("/logout", hasAccess, (req,res)=>
{

//This kills the session
req.session.destroy();
res.redirect("/user/login");

})



module.exports=router;
