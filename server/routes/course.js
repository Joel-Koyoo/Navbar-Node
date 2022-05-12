const express = require("express");
const router = express.Router();

// get route
router.get("/course", (req, res) =>{ 
     res.render("copywriting/course")
})

module.exports = router;
