var express = require('express');
var app = express();
const fs = require('fs');

const stuff = require('./ecobee.js')
var config = require('./config.json');
const { nextTick } = require('process');
var new_config = JSON.stringify(config)

app.route('/').get(function(req, res)
{
    // Set Headers
    res.setHeader('Content-Type', 'Application/JSON')

    res.write("RootAbusers Web-Dev")

    return;
});

app.route('/ecobee').get(function(req, res)
{
    // Set Headers
    res.setHeader('Content-Type', 'Application/JSON')

    // Parse params
    var mode = req.query.mode;
    var heatTemp = req.query.heat;
    var coolTemp = req.query.cool;

    config.mode = mode;
    config.desiredHeat = heatTemp;
    config.desiredCool = coolTemp;

    res.write("Ecobee-Automations\n");
    res.write("Requested Mode: " + mode + "\n");
    res.write("Requested HEAT: " + heatTemp + "\n");
    res.write("Requested COOL: " + coolTemp + "\n");

    console.log("Ecobee-Automations");
    console.log("Requested Mode: " + mode);
    console.log("Requested HEAT: " + heatTemp);
    console.log("Requested COOL: " + coolTemp);

    console.log("Debug heat: " + new_config)
    new_config = JSON.stringify(config);
    fs.readFile('config.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile('config.json', new_config, 'utf8', function(error) {
                if(error) {
                    console.log(error);
                } else {
                    console.log("\nUpdate config.json sucess!\n")
                }
            });
        }
    })

    console.log('Attempting to call index.js....')
    stuff.get_initial();

    next();
});

var server = app.listen(3000, function() {
    console.log('Server is live!\n');
    //console.log(new_config)
});