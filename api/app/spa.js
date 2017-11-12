require('dotenv').config();
const apiKey = process.env.KEY_ONSEN_API;
const apiUrl = process.env.KEY_ONSEN_URL;
const request = require('request');
const qs = require('querystring');
const parseString = require('xml2js').parseString;

const getSpa = function(emotion) {
    var query = {};
    var url = '';
    var l_area = '';
    var options = {};

    l_area = getAreaCode(emotion);
    query = { key: apiKey, l_area: l_area, count: '5', xml_ptn: '0' };
    url = apiUrl + '?' + qs.stringify(query);
    options = {
        url: url,
        method: 'GET',
        json: true
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            parseString(body, function (err, result) {

                resolve(result);
            });

        });
    });
};

// 感情毎にl_areaコードを割り当てる
const getAreaCode = function(emotion) {
    var l_area = '';
    switch (emotion) {
        case 'anger':
            l_area = '136200'; // 銀座・日本橋・東京駅周辺
            break;
        case 'contempt':
            l_area = '136500'; // お茶の水・湯島・九段・後楽園
            break;
        case 'disgust':
            l_area = '137700'; // 池袋・目白・板橋・赤羽
            break;
        case 'contempt':
            l_area = '138900'; // 葛飾・江戸川・江東
            break;
        case 'fear':
            l_area = '139800'; // 伊豆七島・小笠原
            break;
        case 'happiness':
            l_area = '150100'; // 甲府・湯村・昇仙峡
            break;
        case 'neutral':
            l_area = '150500'; // 山中湖・忍野
            break;
        case 'sadness':
            l_area = '161400'; // 軽井沢・佐久・小諸
            break;
        case 'surprise':
            l_area = '163500'; // 斑尾・飯山・信濃町・黒姫
            break;
        default:
            l_area = '163500'; // 斑尾・飯山・信濃町・黒姫
            break;
    }
    return l_area;
};

exports.getSpa = getSpa;
