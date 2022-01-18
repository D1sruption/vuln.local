const { jq } = require('jquery');
var request = require('request');
const readline = require('readline');

var apiKey = "oKLeQ0eKISrflU14Vc0myaWW61bQD1Rn"
var auth_code = "yJ5ndBi-iyRuMpZ4Vc0dgMTx"
var ecobeePin = "SFKT-MDZS"

var at = ""
var rt = "eX59by_r2ytYm09pl5sfMAyYX60TrGdLRsM428dpv7umU"
//https://api.ecobee.com/token?grant_type=refresh_token&code=SatAWlSIWX0xscuVVHDDSY6PtmhQlLfkp4PfbIEOGIAoH&client_id=XKI4ukjQJQjb50UTWEvDChN7SFh1phCc

var auth_obj = {}
var code = ""
var pin = ""

var thermostat_obj = {}

async function get_pin(api_key) {
    var url_auth = "https://api.ecobee.com/authorize?response_type=ecobeePin&client_id=".concat(apiKey).concat("&scope=smartWrite")

    // Get PIN
    request.get(
        url_auth,
        function(error, response, body) {
            console.log(body)
            auth_obj = JSON.parse(body);
            code = auth_obj.code
            pin = auth_obj.ecobeePin
            console.log("Received PIN: " + pin)
            console.log("Received CODE: " + code)
            console.log("Attempting Request To: " + url_auth)
        }
    );

    return new Promise(resolve => {
        setTimeout(() => {
            // resolve(get_at(code, pin, apiKey));
            //console.log(code, pin)
        }, 20000);
    });
}

async function get_at(refresh_token, api_key) {
    var url_token = "https://api.ecobee.com/token?grant_type=refresh_token&code=".concat(refresh_token).concat("&client_id=").concat(api_key)

    var token_obj = {}
    //Get Access Token & Refresh Token
    request.post(
        url_token,
        function(error, response, body) {
            //console.log(body)
            console.log("Attempting Request To: " + url_token)

            token_obj = JSON.parse(body)
        }
    );

    return new Promise(resolve => {
        setTimeout(() => {
            // resolve(get_at(code, pin, apiKey));
            get_thermostat(token_obj);
        }, 2000);
    });
}

async function get_thermostat(token_obj) {
    // console.log("\nACCESS_TOKEN: "+token_obj.access_token)
    // console.log("\nREFRESH_TOKEN: "+token_obj.refresh_token)
    var url_thermostat = 'https://api.ecobee.com/1/thermostat?format=json&body={"selection":{"selectionType":"registered","selectionMatch":"","includeRuntime":true, "includeSettings": true}}'
    var options = {
        url: url_thermostat,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_obj.access_token
        }
    }

    request.get(url_thermostat, options, 
        function(error, response, body){
            //console.log(body)
            thermostat_obj = JSON.parse(body)
        }
    );

    return new Promise(resolve => {
        setTimeout(() => {
            // resolve(get_at(code, pin, apiKey));
            parse_thermostat(thermostat_obj);
        }, 2000);
    });
}

async function parse_thermostat(thermostat_obj) {
    console.log("\n[+] Thermostat Object:")
    // console.log(thermostat_obj.thermostatList[0])
    var root_obj = thermostat_obj.thermostatList[0];
    var settings = root_obj.settings;
    var runtime = root_obj.runtime
    console.log("   [-] Name: " + root_obj.name)
    console.log("   [-] Mode: " + settings.hvacMode)
    console.log("   [-] Current Temp: " + runtime.actualTemperature)
    console.log("   [-] Requested HEAT: " + runtime.desiredHeat)
    console.log("   [-] Requested COOL: " + runtime.desiredCool)
}

//get_pin(apiKey);
get_at(rt, apiKey)