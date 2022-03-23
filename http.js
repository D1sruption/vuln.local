var express = require('express');
var app = express();
const fs = require('fs');

const { nextTick } = require('process');

app.route('/').get(function(req, res)
{
    // Set Headers
    //res.setHeader('Content-Type', 'Application/JSON')

    res.write("RootAbusers Web-Dev")

    return;
});

app.route('/xss').get(function(req, res)
{
    // Set Headers
    //res.setHeader('Content-Type', 'Application/JSON')

    // Parse params
    var mode = req.query.mode;
    console.log("Called Mode!: " + mode)

    res.write("Received XSS request! Param: " + mode)


    res.end();
});

var server = app.listen(3000, function() {
    console.log('Server is live!\n');
});