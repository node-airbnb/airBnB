const express = require('express');
const router = express.Router();

router.get("/viewRoom", (req, res) => {
    res.render("room/viewRoom");
});

router.post("/viewRoom", (req, res) => {
    res.render("room/viewRoom");
});

module.exports=router;