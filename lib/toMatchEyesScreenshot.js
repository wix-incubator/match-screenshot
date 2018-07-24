const {Eyes} = require('eyes.images');
const path = require('path');
require('dotenv').config();

module.exports = (options = {}) =>
  async function toMatchScreenshot(instance, {key, version = 'v1.0.0'}) {
    const eyes = new Eyes();
    if (process.env.EYES_API_KEY) {
      console.log('process.platform ', process.platform);
      eyes.setOs(process.platform);
      eyes.setApiKey(process.env.EYES_API_KEY);
    }
    const appName =
      options.appName || require(path.join(process.cwd(), 'package.json')).name;

    await sendToEyes({
      eyes,
      img: instance,
      appName,
      specName: key,
      version,
    });
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
