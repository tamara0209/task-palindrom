var express = require('express');
var task = express();
var bodyParser = require('body-parser');
task.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })

task.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "frontend.html");
})

task.post('/palindrome', urlencodedParser, function (req, res) {
    let string = req.body.string;
    var respData = {'status':false};
    
    if (isPalindrome(string))
        respData.status = true;

    res.contentType('json');
    res.send(JSON.stringify(respData));

})

function isPalindrome(string) {
    string = string.toLowerCase();
    string = string.replace(/\W/g, '');
    let len = string.length;
    if (len==0) return false;
    for (let i = 0; i < len; i++) {
        if (string[i] != string[len-1-i]) return false;
    };
    return true;
}

var server = task.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listen Server at http://%s:%s", host, port)
})
