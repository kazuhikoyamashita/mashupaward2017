require('dotenv').config();
const apiKey = process.env.KEY_ONSEN_API;
const apiUrl = process.env.KEY_ONSEN_URL;
const request = require('request');
const qs = require('querystring');

const getSpa = function() {
    var query = { key: apiKey, l_area: '010300', count: '1', xml_ptn: '1' };
    var url = apiUrl + '?' + qs.stringify(query);

    console.log(apiKey);
    console.log(url);
    var options = {
        url: url,
        method: 'GET',
        json: true
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            console.log(url);
            resolve(body);
        });
    });
};

exports.getSpa = getSpa;