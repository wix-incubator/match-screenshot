const {Eyes} = require('eyes.images');
const path = require('path');
require('dotenv').config();

module.exports = (options = {}) =>
  async function toMatchScreenshot(
    instance,
    {key, version = 'v1.0.0', viewport},
  ) {
    const eyes = new Eyes();
    if (!process.env.EYES_API_KEY) {
      console.log(
        `EYES_API_KEY not found. Eyes comparison skipped for test "${key} ${version}"`,
      );
      return true;
    }
    eyes.setOs(process.platform);
    eyes.setApiKey(process.env.EYES_API_KEY);

    const appName =
      options.appName || require(path.join(process.cwd(), 'package.json')).name;

    await sendToEyes({
      eyes,
      img: instance,
      appName,
      specName: key,
      version,
      viewport,
    });
  };

const sendToEyes = async ({
  eyes,
  img,
  appName,
  specName,
  version,
  viewport,
}) => {
  try {
    await eyes.open(
      appName,
      `${appName} toMatchScreenshot ${specName} version: ${version}`,
      viewport,
    );
    await eyes.checkImage(img, `${specName} ${version}`);
  } catch (e) {
    await eyes.abortIfNotClosed();
    throw e;
  }
  await eyes.close();
  console.log(`eyes comparison succeed for test "${specName} ${version}"`);
};
