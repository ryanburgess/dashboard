module.exports = (obj) => {
  'use stict';

  // update local storage value
  Object.keys(obj).forEach(function(key) {
    localStorage.setItem(key, obj[key]);
  });
};