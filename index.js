
const express = require('express')
const app = express()
const convert = require('xml-js');
const request = require('request');
const log4js = require('log4js');
const logger = log4js.getLogger();
const port = process.env.PORT

var router = express.Router();

/* GET users listing. */
app.get('/api/v1/weather/predict', function(req, res) {

    logger.info('Inside api method')

    request({
        uri: "https://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
      }, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            logger.info('openweathermap api call is success');
            var result = convert.xml2json(body, {compact: true, spaces: 4});
            json_response = new Object()
            let message = predictWeather(body) ;

            // Populate API response based on climate prediction
            if(message == "HOT"){
                logger.info('Prediction result : HOT')
                console.log('Prediction result : HOT')

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ code: 200, status :'Success',message : "Use sunscreen lotion" }));
            }
            else if(predicatWeather(body) == "COLD") 
            {
                logger.info('Prediction result : HOT')
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ code: 200, status :'Success',message : "Carry umbrella" }));
            }

          } else {
            logger.info('openweathermap api call is failure')
            res.status(500);
            return next(err);
          }
      });
});

// analyse data from API response and populate message
function predictWeather(body){
    console.log('Reached predictWeather function');
    console.log('Data ',body);
    return "HOT";

}


app.listen(8080, () => console.log(`Example app listening on port ${port}!`))


module.exports = {
    app
};
