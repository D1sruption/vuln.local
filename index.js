apiKey = "XKI4ukjQJQjb50UTWEvDChN7SFh1phCc"
authCode = "SatAWlSIWX0xscuVVHDDSY6PtmhQlLfkp4PfbIEOGIAoH" //refresh token
//https://api.ecobee.com/token?grant_type=refresh_token&code=SatAWlSIWX0xscuVVHDDSY6PtmhQlLfkp4PfbIEOGIAoH&client_id=XKI4ukjQJQjb50UTWEvDChN7SFh1phCc
var url = "https://api.ecobee.com/token?"
var data = "grant_type=refresh_token&code=".concat(authCode).concat("&client_id=").concat(apiKey);

var request = require('request')

console.log("Attempting Request To: " + url + data)

// Get Access Token & Refresh Token
request.post(
    url+data,
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        else {
            console.log(body)
        }
    }
)

