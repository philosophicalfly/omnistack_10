const {
  Router
} = require('express');
const axios = require('axios');
const moment = require('moment');
const Dev = require('./models/Dev');

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
routes.post('/devs', (req, res) => {
  const {
    gitUser,
    techs,
    latitude,
    longitude
  } = req.body;
  dbg(`Received user ${gitUser}.`);
  dbg('Getting GitHub user data...');
  getGithubUserData(gitUser).then(gitUserData => {
    const {
      name = login, avatar, avatar_url, bio
    } = gitUserData.data;
    techsList = techs.split(',').map(tech => tech.trim());
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };
    const userObj = {
      name,
      gitUser,
      bio,
      avatarUrl: avatar_url,
      techs: techsList,
      location
    }
    dbg('Got GitHub user data.');
    dbg(userObj);
    saveUserToDatabase(userObj).then(savedDev => {
      return res.json({
        dev: savedDev
      });
    });
  }).catch(err => {
    return res.json({
      error: err
    });
  });
});

function getGithubUserData(gitUser) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${gitUser}`).then(gitUserData => {
      return resolve(gitUserData);
    }).catch(err => {
      return reject(err);
    });
  });
}

function saveUserToDatabase(userObj) {
  return new Promise((resolve, reject) => {
    Dev.create(userObj).then(response => {
      return resolve(response);
    }).catch(err => {
      return reject(err);
    });
  });
}

function dbg(data) {
  const dateTime = moment().format('MM/DD/YYYY H:mm:ss');
  console.log(dateTime + ' DEBUG: ' + JSON.stringify(data));
}

module.exports = routes;
