var express = require('express');
var router = express.Router();
var emotion = require('../app/emotion');

/* GET home page. */
var imgUrl = 'https://cdn.liginc.co.jp/wp-content/uploads/2015/11/b0bc307347cc4ced1f66d0f567f672531-210x210.jpg';

emotion.getEmotion(imgUrl)
    .then(function (value) {
        router.get('/', function(req, res, next) {
            res.render('index', {
                title: 'はつしのきもち',
                emotionRespons: value
            });
        });
    });


module.exports = router;
