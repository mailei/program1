var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var to_json = require('xmljson').to_json;
var router = express.Router();

//test :  curl -X POST http://localhost:3000/weather -H "Accept: application/json" -H "Content-type: application/json" --data '{"city":"shizuoka"}' -i -v
/* post home page. */
router.post('/', function (req, res) {
  console.log(req.body.city);
  rssGet().then(function (rssJson) {
    res.send(rssJson);
  });
  function rssGet() {
    return new Promise(function (resolve) {
      var cityCode;
      var weatherXml;
      switch (req.body.city) {
        case 'shizuoka':
          cityCode = '5010';
          break;
        case 'tokyo':
          cityCode = '4410';
          break;
        case 'yokohama':
          cityCode = '4610';
          break;
        case 'nagoya':
          cityCode = '5110';
          break;
        case 'osaka':
          cityCode = '6200';
          break;
      }
      request.get('https://rss-weather.yahoo.co.jp/rss/days/' + cityCode + '.xml',function(error, response, body){
          to_json(body, function (err, data) {
            resolve(data.rss.channel.item);
          });
        });
    });
  }
});

// router.post('/', function (req, res) {
//   var sendJson = {
//     'name': 'HellowWorld'
//   };
//   res.send(sendJson);
//   console.log(sendJson);
// });



module.exports = router;
