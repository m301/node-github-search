var url = require('url');
var express = require('express');
var router = express.Router();
var request = require("request");
router.get('/', function (req, res) {
    res.render('index', {title: 'Github User Search'});
});


//TODO:
// Cache expiry - store cache data as object with time
//Only pull content if time is greater than expiry time.
var CACHE = {};
//this can be moved to another file.
router.get("/search", function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    //if blank or username is more than 39 ignore
    if(query.length===0 || query.length>39)
        res.send({});

    if (CACHE[query.query])
        return res.send(CACHE[query.query]);
    request.get({
        url: "https://api.github.com/users/" + query.query,
        headers: {Accept: " application/vnd.github.preview", "User-Agent": "test-ws"}
    }, function (error, response, body) {
        res.send((CACHE[query.query] = JSON.parse(body)));
    });
});
module.exports = router;