var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/results', function(req, res){
  var url = process.env.MONGO_URL;

  const weekdayQuery = { days: req.body.weekday };

  // Convert the start time to a Number to use for comparison
  var userStartTime = req.body.start
  userStartTime = userStartTime.replace(":", "")
  userStartTime = Number(userStartTime)

  // Convert the end time to a Number to use for comparison
  var userEndTime = req.body.end
  userEndTime = userEndTime.replace(":", "")
  userEndTime = Number(userEndTime)

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.db);
      dbo.collection("roomavailability").find(weekdayQuery).toArray(function(err, result) {
          if (err) throw err;

          var availableRooms = []

          for(i=0; i<result.length; i++) {
              // Convert each result's start time and end time to Numbers for comparison
              var startTime = result[i]['startTime']
              startTime = startTime.replace(":", "")
              startTime = Number(startTime)
              result[i]['startTime'] = startTime

              var endTime = result[i]['endTime']
              endTime = endTime.replace(":", "")
              endTime = Number(endTime)
              result[i]['endTime'] = endTime

              if (userEndTime < startTime || userStartTime > endTime) {
                  var isAvailable = false
                  for(j=0; j<availableRooms.length; j++) {
                      if (availableRooms[j]['building'] == result[i]['building'] && availableRooms[j]['roomNumber'] == result[i]['roomNumber']) {
                          console.log(availableRooms[j]['building'])
                          isAvailable = true
                      }
                  }
                  if (!isAvailable) {
                      availableRooms.push(result[i])
                  }
              }
          }


          res.render('results', { data: availableRooms.slice(0,5) });
          db.close();
      });
  });
});

module.exports = router;
