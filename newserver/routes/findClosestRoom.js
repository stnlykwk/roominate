var express = require('express');
var router = express.Router();
const {client} = require('../config/config');
const { resolve } = require('path');


/* GET home page. */

router.get('/', function(req, res, next) {
  var buildingcode = req.query.buildingcode
  var roomnumber = req.query.roomnumber
  var weekdayQuery = req.query.weekday
  var userStartTime = req.query.start // Example: 13:00
  var userEndTime = req.query.end



  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python', ['./pythonScripts/nearestRooms.py', buildingcode,roomnumber,userStartTime,userEndTime,weekdayQuery]);

        
  pythonProcess.stdout.on('data', (data) => {

    var string = data.toString()
    string = string.replace(/\'/g, '"')

    const tupleToArray = JSON.parse(string);

    console.log(tupleToArray)

    res.send(tupleToArray)
  })
});

module.exports = router;
