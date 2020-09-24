var express = require('express');
var router = express.Router();
const {client} = require('../config/config');
const { restart } = require('nodemon');

/* GET home page. */
router.get('/', function(req, res, next) {
  var buildings = [];
  (async () => {
    await client.query('SELECT DISTINCT buildingcode FROM rooms').then(results => {
      // console.log(results)\
      for (let row of results.rows) {
        //console.log(JSON.stringify(row));
        console.log(row);
        if (row.buildingcode !== 'SRYE') {
          buildings.push(row.buildingcode);
        }
      }
      // res.status(200).json(buildings)

      // sort the building codes
      buildings.sort(function (a, b) { return a.localeCompare(b); })
      console.log(buildings);
      res.send(buildings);

    })
    .catch(error => {
      // restart.sta
      res.sendStatus(404);
    })
    // .then(() => client.end());
  })()
  
});

module.exports = router;
