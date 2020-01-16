const axios = require('axios');
const Dev = require('../models/Dev');
const {
  dbg
} = require('../debug/Debug');
const parseStringArray = require('../utils/parseStringArray');
//Controller should have only 5 functions
//  index - list all
//  show    list one
//  store   adds one
//  update  modify one
//  destroy delete one

function index(req, res) {
  dbg("Listing users...")
  Dev.find().then(result => {
    return res.json(result);
  }).catch(err => {
    return res.json(err)
  });
}

function store(req, res) {
  dbg(`Received user ${req.body.gitUser}.`);
  const {
    gitUser,
    techs,
    latitude,
    longitude
  } = req.body;
  isDoubleDev(gitUser).then(double => {
    if (!double) {
      getGithubUserData(gitUser).then(gitUserData => {
        const {
          name = login, avatar, avatar_url, bio
        } = gitUserData.data;
        techsList = parseStringArray(techs);
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
        saveUserToDatabase(userObj).then(savedDev => {
          return res.json(savedDev);
        });
      }).catch(err => {
        return res.json(err);
      });
    } else {
      return res.json({
        error: "User already exists"
      });
    }
  }).catch(err => {
    return res.json(err);
  });
}

//------------------------------------------------------------------------------
//------------------------------------UTILS-------------------------------------
//--------------------------Should be in another file---------------------------
//------------------------------------------------------------------------------

function getGithubUserData(gitUser) {
  dbg("Getting GitHub user data...");
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${gitUser}`).then(gitUserData => {
      dbg("Got GitHub user data.");
      return resolve(gitUserData);
    }).catch(err => {
      return reject(err);
    });
  });
}

function saveUserToDatabase(userObj) {
  dbg("Saving user to database...");
  return new Promise((resolve, reject) => {
    Dev.create(userObj).then(response => {
      dbg("Saved user to database.");
      return resolve(response);
    }).catch(err => {
      return reject(err);
    });
  });
}

function isDoubleDev(gitUser) {
  dbg("Checking for duplicated entry...");
  return new Promise((resolve, reject) => {
    Dev.findOne({
      gitUser
    }).then(response => {
      const decision = response !== null ? true : false;
      dbg("Got decision.");
      return resolve(decision);
    }).catch(err => {
      return reject(err);
    });
  });
}

module.exports = {
  store,
  index,
  getGithubUserData,
  saveUserToDatabase,
  isDoubleDev
};
