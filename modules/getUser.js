'use strict';

const verifyUser = require('../auth');

function handleGetUser(req, res) {
    verifyUser(req, (err, user) => {
        if (err) {
            res.send("Invalid Token");
        } else {
            res.send(user);
        }
    });
}

module.export = handleGetUser;