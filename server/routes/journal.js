const express = require('express');
const router = express.Router();

router 
.route("/:date")
.get((req, res) => { //NEEDS MODIFICATION, THIS IS TO GET A DAYS JOURNAL ENTRY
    let calendarDate = req.params.day;
    
    //DB QUERY COMES HERE
})
.post((req,res) => {
    //POST JOUNRAL ENTRY
})
.put((req,res) => {
    //CHANGE ENTIRE JOURNAL ENTRY
})
.patch((req, res) => {
    //Change a mood or entry
})



module.exports = router;