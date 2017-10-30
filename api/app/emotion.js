require('dotenv').config();
var apiKey = process.env.EMOTION_API_KEY;
var apiUrl = process.env.EMOTION_API_URL;
var request = require('request');

var headers = {
    'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key' : apiKey
};


var getEmotion = function(imgUrl) {
    var options = {
        url: apiUrl,
        method: 'POST',
        headers: headers,
        body: '{ "url" : "' + imgUrl +'"}'
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            resolve(body);
        });
    });
};


exports.getEmotion = getEmotion;
