require('dotenv').config();
const apiKey = process.env.EMOTION_API_KEY;
const apiUrl = process.env.EMOTION_API_URL;
const request = require('request');
const headers = {
    'Content-Type':'application/octet-stream',
    'Ocp-Apim-Subscription-Key' : apiKey
};




let check = function(obj) {
    let strongEmotion = "";
    let score = 0;

    let d = obj[0].scores;


    Object.keys(d).forEach(function(key) {

        let value = d[key];
        
        if (value > score) {
            score = value;
            strongEmotion = key;
        }
    });

    return strongEmotion;
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
            resolve(check(JSON.parse(body)));
        });
    });
};

exports.getEmotion = getEmotion;
