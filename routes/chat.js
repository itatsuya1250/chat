var express = require('express');
var router = express.Router();

let count = 0;

/* GET chat listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  count++;
  res.json({
    user : 'user' + count
  });
});

module.exports = router;
