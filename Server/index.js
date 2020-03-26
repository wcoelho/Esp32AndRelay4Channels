var express = require('express');
var relays = express.Router();

relays.get('/', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'https://myServer');
  res.set('Access-Control-Allow-Credentials', 'true');

  let message = "{ \"relay1\": " + process.env.relay1 +
   ", \"relay2\": " + process.env.relay2 + 
   ", \"relay3\": " + process.env.relay3 + 
   ", \"relay4\": " + process.env.relay4 + "}" 
  res.status(200).send(message);
});

relays.get('/ip', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'https://myServer');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.status(200).send(process.env.ip);
});

relays.post('/ip', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'https://myServer');
  res.set('Access-Control-Allow-Credentials', 'true');
  process.env.ip = req.query.ip;
  res.status(200).send(process.env.ip);
});

relays.post('/', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'https://myServer');
  res.set('Access-Control-Allow-Credentials', 'true');
  
  process.env.relay1 = req.query.relay1 || process.env.relay1;
  process.env.relay2 = req.query.relay2 || process.env.relay2;
  process.env.relay3 = req.query.relay3 || process.env.relay3;
  process.env.relay4 = req.query.relay4 || process.env.relay4;

  let message = "{ \"relay1\": " + process.env.relay1 +
   ", \"relay2\": " + process.env.relay2 + 
   ", \"relay3\": " + process.env.relay3 + 
   ", \"relay4\": " + process.env.relay4 + "}" 

  res.status(200).send(message);
});

module.exports.relays = relays;

