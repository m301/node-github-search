var url = require('url');
var express = require('express');
var router = express.Router();
var request = require("request");
router.get('/', function (req, res) {
    res.render('index', {title: 'Github User Search'});
});

//this can be moved to another file.
router.get("/search", function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    request.get({
        url: "https://api.github.com/users/" + query.query,
        headers: {Accept: " application/vnd.github.preview","User-Agent":"test-ws"}
    }, function (error, response, body) {
        res.send(JSON.parse(body))
    });
});
module.exports = router;