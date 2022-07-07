const express = require('express');
const router = express.Router();

router 
.route("/start")
.get((req, res) => {
    //DB QUERY COMES HERE

    //res.send()
})

.route('/end') //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
.get((req, res) => {
     //DB QUERY COMES HERE
     
    //res.send()
})

.route('/average')
.get('/period/days', (req,res) => {
     //DB QUERY COMES HERE
     
    //res.send()
})
.get('/days/between/periods', (req,res) => {
    //DB QUERY COMES HERE
     
    //res.send()
})
module.exports = router;