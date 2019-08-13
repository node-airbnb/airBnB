const express= require("express");
const roomSchema = require("../models/room");
const mongoose = require("mongoose");
const router= express.Router();

const hasAccess = require("../middleware/auth");

//This creates a model in our application called room. A model is a representation of a collection
const Room = mongoose.model('Rooms', roomSchema);

//This displays the rooms form
// router.get("/viewrooms",(req,res)=>
// { 
//    res.render("room/viewRoom");
// });

//This displays the Add Task form
router.get("/addroom",(req,res)=>
{ 
   res.render("room/addRoom");
});


//This processes the data after the task form has been submitted
router.post("/addroom",(req,res)=>
{ 


   const errors= [];

    //validate


   if(req.body.title==="")
   {
   errors.push("You must enter a title");
   }

   if(req.body.address==="")
   {
   errors.push("You must home address");
   }

   if(req.body.description==="")
   {
   errors.push("You must enter a description");
   }

   if(req.body.image==="")
   {
   errors.push("You must enter a image link");
   }
   
   //THERE IS ERROR(S)
   if(errors.length > 0)
   {

         res.render("room/addRoom",{
            errors:errors,
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
            image: req.body.image
         });
   }

// NO ERRORS
else
{


      const roomData=
      {
         title: req.body.title,
         address1: req.body.address1,
         city: req.body.city,
         price: req.body.price,
         owner: req.body.owner,
         amenities1: req.body.amenities1,
         amenities2: req.body.amenities2,
         amenities3: req.body.amenities3,
         amenities4: req.body.amenities4,
         amenities5: req.body.amenities5,
         address: req.body.address,
         description: req.body.description,
         image: req.body.image,
         // roomid: req.session.userInfo._id
      }

   
      
      new Room(roomData)
      .save()
      .then( ()=>
      {
         res.redirect("/room/viewrooms");
      })
      .catch( (err)=>
      {
         console.log(`Error ${err}`)
      });

   }


});



//This navigates the user to the Task DashBoard
router.get("/viewrooms",(req,res)=>
{
   //Anytime you want to pull data from the DB, specifically a collection, you must called the find() method on the variable that re the Model
   // Room.find({userid:req.session.userInfo._id})
   Room.find()
   .then((rooms)=>
   {
      // console.log(searchInput);
      res.render("room/viewRoom",{
         allRoom:rooms
      })

   })
});

router.get("/viewroomdetails/:id",(req,res)=>
{
   Room.findOne({ _id:req.params.id})
   .then((rm)=>
   {
      res.render("room/roomDetails",{
         rm:rm
      })
   })
});

//This processes the data after the task form has been submitted
router.post("/viewSingleRoom",(req,res)=>
{ 


});

//This navigates the user to the Task Edit form with populated data
router.get("/edit/:id",(req,res)=>
{ 
   Room.findOne({ _id:req.params.id})
   .then((room)=>
   {
      res.render("room/editRoom",{
         room:room
      })
   })
});

router.put("/edit/:id",(req,res)=>
{ 

      Room.findOne({_id:req.params.id})
      .then(task=>
      {
         task.title=req.body.title;
         task.address=req.body.address;
         task.description = req.body.description;
         task.image=req.body.image;

         task.save()
         .then(room=>{
            res.redirect("/room/viewrooms");
         })
      })
});


router.delete("/delete/:id",(req,res)=>{

      Room.remove({_id:req.params.id})
      .then(()=>{
      res.redirect("/room/viewrooms");
      });

})



module.exports=router;