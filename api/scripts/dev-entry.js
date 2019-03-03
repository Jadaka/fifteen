const path = require('path');

require('@babel/register')({
  extensions: ['.js', '.ts'],
});
require('@babel/polyfill');

if (!process.argv[2]) {
  throw Error(`An argument for the path to load is required. Example: node dev-entry.js server/index.ts`);
}

require(path.resolve(__dirname, '../', process.argv[2]));
