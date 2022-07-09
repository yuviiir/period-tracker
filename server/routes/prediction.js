const express = require('express');
const router = express.Router();

router 
.route("/start")
.get((req, res) => {
    //DB QUERY COMES HERE

    //res.send()
})

router
.route('/end') //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
.get((req, res) => {
     //DB QUERY COMES HERE
     
    //res.send()
})

router
.route('/average')
.get((req,res) => {
     //DB QUERY COMES HERE
     
    //res.send()
})

router
.route('length')
.get((req,res) => {
    //DB QUERY COMES HERE
     
    //res.send()
})

module.exports = router;