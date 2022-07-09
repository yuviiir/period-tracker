const express = require('express');
const router = express.Router();

router 
.route("/:date")
.get((req, res) => {
    let calendarDate = req.params.date;
    //DB QUERY COMES HERE
})
.patch("/start", (req, res) => {

})
.patch("/end", (req, res) => {

})
.put("/remove", (req, res) => {

})

module.exports = router;