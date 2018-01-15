const request = require('request');

const config = require('./../configuration');
const constants = require('./../constants');
const logHelper = require('./logHelper');
const urlHelper = require('./urlHelper');

const apiHelper = function() {
  return {
    getCurrentUser: function(accessToken, callback) {
      console.log('url', urlHelper.currentUserUrl());
      request({
        url: urlHelper.currentUserUrl(accessToken),
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(accessToken)
        }
      }, function (error, response) {
        callback(error, response);
      });
    }
  }
}();

module.exports = apiHelper;
