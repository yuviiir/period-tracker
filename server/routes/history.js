const express = require('express');
const router = express.Router();

router 
.route("/:date")
.get((req, res) => {
    let calendarDate = req.params.date;
    //DB QUERY COMES HERE
})

router
.route("/start")
.patch((req, res) => {

})

router
.route("/end")
.patch((req, res) => {

})

router
.route("/remove")
.put((req, res) => {

})

module.exports = router;