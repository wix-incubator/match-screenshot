const execa = require('execa');
const dargs = require('dargs');

const conditionalTest = (title, testLambda, condition) => {
  condition ? test(title, testLambda) : test.skip(title);
};

const executeTest = async ({fixture}) => {
  const options = {
    config: require.resolve(`./__fixtures__/${fixture}/conf.json`),
  };

  const res = await execa('node', [
    require.resolve('jest/bin/jest'),
    require.resolve(`./__fixtures__/${fixture}/test.jest`),
    dargs(options),
  ]);
  return res.stdout;
};

module.exports = {
  conditionalTest,
  executeTest,
};
