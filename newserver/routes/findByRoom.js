var express = require('express');
var router = express.Router();
const {client} = require('../config/config');


router.get('/', function(req, res, next) {
  var buildingcode = req.query.buildingcode;
  var roomnumber = req.query.roomnumber;
  console.log(buildingcode, roomnumber);

  (async () => {
    await client.query("SELECT * FROM roomavailability WHERE buildingcode = $1 AND roomnumber = $2;", [buildingcode, roomnumber]).then(data => {

      // console.log(data.query())
      res.status(200).json(data.rows)
    })
    .catch(error => {
        res.status(404).send(error)
    })
    // .then(() => client.end());
  })()
});

module.exports = router;