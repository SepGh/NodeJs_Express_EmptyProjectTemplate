var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    res.send('Hello World 1 !');
});

module.exports = router;