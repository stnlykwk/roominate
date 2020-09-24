var express = require('express');
var router = express.Router();
const {client} = require('../config/config')

/* GET home page. */
router.get('/', function(req, res, next) {
  var rooms = [];
  var buildingcode = req.query.buildingcode;
  console.log(buildingcode);
  (async () => {
    await client.query("SELECT DISTINCT roomnumber FROM rooms WHERE buildingcode = $1", [buildingcode]).then(data => {
      for (let row of data.rows) {
        console.log(row);
        rooms.push(row.roomnumber);
      }

      // console.log(rooms)
      res.status(200).send(rooms);
    })
    .catch(error => {
      res.status(404).log(error)
    })
    // .then(() => client.end());
  })()

});

module.exports = router;
