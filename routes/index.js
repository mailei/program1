var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send(console.log('helowWorld'));
});

router.post('/', function(req, res) {
  var sendJson={
    'name':'HellowWorld'
  };
  res.send(sendJson);
});



module.exports = router;
