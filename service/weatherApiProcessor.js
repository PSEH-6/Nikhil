var Request = require("request");
var weatherApiProcessor = {

    Request.get("http://httpbin.org/ip", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
    });

 };
 
 module.exports = weatherApiProcessor;