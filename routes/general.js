const express= require("express");

const router= express.Router();


router.get("/",(req,res)=>
{
   res.render("general/home");
});

// router.get("/aboutUs",(req,res)=>
// {
//    res.render("general/aboutUS");
// });

// router.get("/contactUs",(req,res)=>
// {
//    res.render("");
// });

//export the route object

module.exports=router;

