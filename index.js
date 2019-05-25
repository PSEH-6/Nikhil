
const express = require('express')
const processor = require('./service/weatherApiProcessor')
const app = express()
var convert = require('xml-js');
var request = require('request');
const port = process.env.PORT

var router = express.Router();

/* GET users listing. */
app.get('/api/v1/weather/predict', function(req, res) {

    request({
        uri: "https://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
      }, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var result = convert.xml2json(body, {compact: true, spaces: 4});
            json_response = new Object()
            let message = predictWeather(body) ;

            // Populate API response based on climate prediction
            if(message == "WARM"){
                console.log('WARM');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ code: 200, status :'Success',message : "Use sunscreen lotion" }));
            }
            else if(predicatWeather(body) == "COLD") 
            {
                console.log('COLD');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ code: 200, status :'Success',message : "Carry umbrella" }));
            }

          } else {
            res.status(500);
            return next(err);
          }
      });
});

// analyse data from API response and populate message
function predictWeather(body){
    console.log('ReachedpredictWeather');
    return "WARM";

}


app.listen(8080, () => console.log(`Example app listening on port ${port}!`))


module.exports = {
    app
};
