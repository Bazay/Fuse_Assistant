const urlHelper = function() {
  return {
    currentUserUrl: function() {
      return userUrlBuilder();
    }
  };
}();

module.exports = urlHelper;

function urlBuilder(path) {
  return 'https://fuse.fuseuniversal.com/api/v3.0' + path
};
function userUrlBuilder() {
  user_path = '/users/me'
  return urlBuilder(user_path);
};
