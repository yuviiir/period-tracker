const express = require('express');
const router = express.Router();

router 
.route("/day")
.get((req, res) => {
    let calendarDay = req.body.calendarDay;
    let calendarMonth = req.body.calendarMonth;
    let calendarYear = req.body.calendarYear;
    //DB QUERY COMES HERE

    //res.send()
})

.route('/month') //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
.get((req, res) => {
    let calendarDays = req.body.calendarDays;
    let calendarMonth = req.body.calendarMonth;
    let calendarYear = req.body.calendarYear;
     //DB QUERY COMES HERE
     
    //res.send()
})

module.exports = router;