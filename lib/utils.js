const path = require('path');
const mkdirp = require('mkdirp');

const ensureDirectoryExists = filePath => {
  try {
    mkdirp.sync(path.join(path.dirname(filePath)), '777');
  } catch (e) {
    // nothing here
  }
};

module.exports = {ensureDirectoryExists};
