var express = require('express');
var router = express.Router();
var spa = require('../app/spa');

router.get('/', function(req, res) {
    var emotion = 'happiness';
    spa.getSpa(emotion).then(function (value) {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(value);
    });
});

module.exports = router;
