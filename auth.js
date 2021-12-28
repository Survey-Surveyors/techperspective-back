const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: process.env.JWKS_URI
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        console.error(err);
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

function verifyUser(req, errFirstOrUserCallbackFunction) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token, getKey, {}, errFirstOrUserCallbackFunction);
    } catch (error) {
        errFirstOrUserCallbackFunction('Authorized Personnel Only, bye felicia!');
    }
}

module.exports = verifyUser;