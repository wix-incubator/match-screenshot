const {Eyes} = require('eyes.images');
const path = require('path');
require('dotenv').config();

async function toMatchScreenshot(instance, {description, version = 'v1.0.0'}) {
  const eyes = new Eyes();
  if (process.env.EYES_API_KEY) {
    eyes.setOs(process.platform);
    eyes.setApiKey(process.env.EYES_API_KEY);
  }
  const appName = require(path.join(process.cwd(), 'package.json')).name;

  await sendToEyes({
    eyes,
    img: instance,
    appName,
    specName: description,
    version,
  });
}

const sendToEyes = async ({eyes, img, appName, specName, version}) => {
  await eyes.open(
    appName,
    `${appName} toMatchScreenshot ${specName} version: ${version}`,
  );
  await eyes.checkImage(img, `${specName} ${version}`);
  await eyes.close();
  console.log(`eyes comparison succeed for test "${specName} ${version}"`);
};

module.exports = toMatchScreenshot;
