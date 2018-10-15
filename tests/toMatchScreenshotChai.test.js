const execa = require('execa');
const {runTest} = require('./toMatchScreenshot.driver.js');

describe('EYES', () => {
  jest.setTimeout(30000);
  describe('Log', () => {
    runTest(
      'should log after eyes success',
      async () => {
        const browserWSEndpoint = global.browser.wsEndpoint();
        const res = await execa('node', [
          require.resolve('mocha/bin/mocha'),
          require.resolve('./__fixtures__/test.mocha'),
          require.resolve('../lib/chai'),
          browserWSEndpoint,
        ]);
        expect(res.stdout).toContain(
          'eyes comparison succeed for test "should work with chai v1.0.0"',
        );
      },
      process.env.EYES_API_KEY,
    );
  });
});
