const express = require('express');
const router = express.Router();
const hasAccess = require("../middleware/auth");

router.get("/viewRoom",hasAccess, (req, res) => {
    res.render("room/viewRoom");
});

router.post("/viewRoom", (req, res) => {

});

module.exports=router;