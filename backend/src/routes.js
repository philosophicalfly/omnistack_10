const {
  Router
} = require('express');
const axios = require('axios');
const DevController = require('./controllers/DevController');

const routes = Router();

//QUERY PARAMS: Gets the info from URL
//Calling with http://localhost:8080/tests/1?param=value
//Filters, ordering, pagination
routes.get('/tests', (req, res) => {
  console.log(req.query);
  return res.json({
    message: 'Hey, test of get!'
  });
});

//ROUTE PARAMS: Sends encrypted info
//Calling with http://localhost:8080/tests/1
//Identify resource while updating or creating resource
routes.delete('/tests/:param', (req, res) => {
  console.log(req.params);
  return res.json({
    message: 'Hey, test of delete!'
  });
});

//BODY: ?
//Calling with http://localhost:8080/tests
//Creation of resources ()
//app.put('/tests/:param', (req, res) => {
routes.post('/tests', (req, res) => {
  console.log(req.body);
  return res.json({
    message: 'Hey, test of delete!'
  });
});

//Insert New Dev
routes.post('/devs', DevController.store);
//list devs
routes.get('/devs', DevController.index);

module.exports = routes;
