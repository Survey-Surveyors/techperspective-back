'use strict';

const verifyUser = require('../auth');

function handleGetUser(req, res, callbackFn) {
  console.log('entered handleGetUser');
  console.log('handle req and res check: ', req, res);
  verifyUser(req, (err, user) => {
    console.log(user);
    if (err) {
      res.send('Invalid Token');
    } else {
      callbackFn(req, res);
    }
  });
}

module.exports = handleGetUser;
