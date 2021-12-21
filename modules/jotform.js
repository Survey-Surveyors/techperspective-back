'use strict';
//pulled from https://github.com/jotform/jotform-api-nodejs/blob/master/jotform-api.js
//need to see how to integrate into our code
var defaults = {
    url: "https://api.jotform.com",
    apiKey: undefined,
    version: "latest",
    debug: false,
    timeout: 10000 // 10 seconds
}

var _url = defaults.url
    , _apiKey = defaults.apiKey
    , _version = defaults.version
    , _debug = defaults.debug
    , request = require('request')
    , Q = require('q');

function sendRequest(deferred, url, verb, postData) {
    if (_debug) {
        console.log(verb.toUpperCase() + " to URL:", url);
    }

    if (typeof _apiKey === "undefined") {
        deferred.reject(new Error("API Key is undefined"));
    }

    else {

        var options = {
            url: url,
            method: verb,
            json: true
        }
        if (verb === 'post') {
            options.body = typeof postData !== "undefined" ? require('querystring').stringify(postData) : ""
        }
        request(options, function (err, response, body) {
            if (!err && response.statusCode == 200 && body.responseCode == 200) {
                deferred.resolve(body.content);
            }
            if (response.statusCode != 200) {
                deferred.reject(new Error(body.message));
            }
            if (err) {
                deferred.reject(new Error("Error while request, reason unknown"));
            }
        });
    }
}

exports.getFormSubmissions = function (formID) {
    var deferred = Q.defer();
    if (formID === undefined) {
        deferred.reject(new Error("Form ID is undefined"));
    }
    var endPoint = "/form"
        , requestUrl = _url + (_version === "latest" ? "" : "/v" + _version) + endPoint + "/" + formID + "/submissions" + "?apiKey=" + _apiKey
        , requestVerb = "get";
    sendRequest(deferred, requestUrl, requestVerb);
    return deferred.promise;
}