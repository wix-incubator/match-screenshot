const {Eyes} = require('eyes.images');
const MatchScreenshotEyes = require('./matchScreenshotEyes');
const path = require('path');
require('dotenv').config();

module.exports = (options = {}) =>
  async function toMatchScreenshot(
    instance,
    {key, version = 'v1.0.0', matchScreenshotEyes},
  ) {
    const appName =
      options.appName || require(path.join(process.cwd(), 'package.json')).name;

    if (!matchScreenshotEyes) {
      matchScreenshotEyes = new MatchScreenshotEyes();
      await matchScreenshotEyes.open({
        batchName: `${appName} toMatchScreenshot ${key} version: ${version}`,
      });
      await matchScreenshotEyes.checkImage({
        instance,
        key: `${key} ${version}`,
      });
      await matchScreenshotEyes.close(`toMatchScreenshot`);
    } else {
      matchScreenshotEyes.appName = appName;
      await matchScreenshotEyes.checkImage({
        instance,
        key: `${key} ${version}`,
      });
    }
  };

const sendToEyes = async ({eyes, img, appName, specName, version}) => {
  try {
    await eyes.open(
      appName,
      `${appName} toMatchScreenshot ${specName} version: ${version}`,
    );
    await eyes.checkImage(img, `${specName} ${version}`);
  } catch (e) {
    await eyes.abortIfNotClosed();
    throw e;
  }
  await eyes.close();
  console.log(`eyes comparison succeed for test "${specName} ${version}"`);
};
