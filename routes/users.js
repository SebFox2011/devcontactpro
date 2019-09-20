var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new',(req,res) => {
  res.render('users/new');
});
module.exports = router;
