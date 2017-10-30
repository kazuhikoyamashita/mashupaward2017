var express = require('express');
var router = express.Router();
var emotion = require('../app/emotion');

/* GET home page. */
var imgUrl = 'https://cdn.liginc.co.jp/wp-content/uploads/2015/12/18ffe47ae091488567f5b7bacfbe9db710.jpg';

emotion.getEmotion(imgUrl)
    .then(function (value) {
        router.get('/', function(req, res, next) {
            res.render('index', {
                title: 'Express',
                emotionRespons: value
            });
        });
    });

module.exports = router;
