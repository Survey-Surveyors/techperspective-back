'use strict';

const verifyUser = require('../auth');

function handleGetUser(req, res, callbackFn) {
    console.log('entered handleGetUser');
    verifyUser(req, (err, user) => {
        if (err) {
            res.send("Invalid Token");
        } else {
            callbackFn(req, res);
        }
    });
}

module.exports = handleGetUser;