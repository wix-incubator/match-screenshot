const execa = require('execa');
const dargs = require('dargs');

const conditionalTest = (title, testLambda, condition) => {
  condition ? test(title, testLambda) : test.skip(title);
};

const getStdout = async () => {
  const options = {
    config: require.resolve('./__fixtures__/jest-default/conf.json'),
  };

  const res = await execa('node', [
    require.resolve('jest/bin/jest'),
    require.resolve('./__fixtures__/jest-default/test.jest'),
    dargs(options),
  ]);
  return res.stdout;
};

module.exports = {
  conditionalTest,
  getStdout,
};
