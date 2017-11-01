const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: '_tmp'});
const express = require('express');
const router = express.Router();
const emotion = require('../app/emotion');


/* GET home page. */

router.post('/', upload.single('file'), function(req, res, next) {
    fs.readFile(req.file.path, function (err, data) {
        if (err) {
            throw err;
        }

        emotion.getEmotion(data).then(function (value) {
            res.send(value);
            fs.unlinkSync(req.file.path);
        });
    });
});


module.exports = router;
