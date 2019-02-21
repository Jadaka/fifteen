const path = require('path');

// jest.config.js
// documentation @url https://jestjs.io/docs/en/configuration
module.exports = {
  // The root directory that Jest should scan for tests and modules within.
  // If you put your Jest config inside your package.json and want the root
  // directory to be the root of your repo, the value for this config param will
  // default to the directory of the package.json.
  // @url https://jestjs.io/docs/en/configuration#rootdir-string
  rootDir: path.resolve(__dirname, './'),
};
