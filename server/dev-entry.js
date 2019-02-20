require('@babel/register')({
  extensions: ['.js', '.ts'],
});
require('@babel/polyfill');

require('./index.ts');
