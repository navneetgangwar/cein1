var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search');
});


router.post('/id',function(req,res,next){
	console.log(req.body);
});


module.exports = router;
