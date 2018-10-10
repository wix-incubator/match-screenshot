const MatchScreenshotEyes = require('./matchScreenshotEyes');
const path = require('path');
require('dotenv').config();

module.exports = (options = {}) =>
  async function toMatchScreenshot(instance, {key, version = 'v1.0.0'}) {
    const matchScreenshotEyes = new MatchScreenshotEyes();

    const appName =
      options.appName || require(path.join(process.cwd(), 'package.json')).name;
    const testName = `${appName} toMatchScreenshot ${key} version: ${version}`;
    try {
      await matchScreenshotEyes.open({appName, testName});
      await matchScreenshotEyes.checkImage({
        img: instance,
        title: `${key} ${version}`,
      });
      await matchScreenshotEyes.close();
      console.log(`eyes comparison succeed for test "${key} ${version}"`);
    } catch (e) {
      await matchScreenshotEyes.abortIfNotClosed();
      throw e;
    }
  };
