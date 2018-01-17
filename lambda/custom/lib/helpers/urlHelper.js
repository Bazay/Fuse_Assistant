const constants = require('./../constants.js');

const urlHelper = function() {
  return {
    currentUserUrl: function() {
      return userUrlBuilder();
    },
    notificationsUrl: function() {
      return notificationsUrlBuilder();
    }
  };
}();

module.exports = urlHelper;

function urlBuilder(path) {
  return 'https://fuse.fuseuniversal.com/api/' + constants.api_version + path
};
function userUrlBuilder() {
  user_path = '/users/me'
  return urlBuilder(user_path);
};
function notificationsUrlBuilder() {
  notifications_path = '/notifications'
  return urlBuilder(notifications_path);
}
