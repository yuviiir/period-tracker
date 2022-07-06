const express = require('express');
const router = express.Router();

router 
.route("/:id")
.get((req, res) => {
    let person_id = req.params.id;
    let result = 'THIS PERSON IS HMMM' + person_id;
    //DB QUERY COMES HERE
    res.send(result)
})

module.exports = router;