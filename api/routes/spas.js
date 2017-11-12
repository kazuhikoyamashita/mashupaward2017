var express = require('express');
var router = express.Router();
var spa = require('../app/spa');

router.get('/', function(req, res) {
    spa.getSpa().then(function (value) {
        res.header('Content-Type', 'application/xml; charset=utf-8');
        res.send(value);
    });
});

module.exports = router;
