require('dotenv').config();
const apiKey = process.env.EMOTION_API_KEY;
const apiUrl = process.env.EMOTION_API_URL;
const request = require('request');
const headers = {
    'Content-Type':'application/octet-stream',
    'Ocp-Apim-Subscription-Key' : apiKey
};


let getEmotion = function(imgData) {
    let options = {
        url: apiUrl,
        method: 'POST',
        headers: headers,
        body: imgData
    };


    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            resolve(body);
        });
    });
};

exports.getEmotion = getEmotion;
