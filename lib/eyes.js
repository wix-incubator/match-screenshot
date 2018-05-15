require('dotenv').config();

const path = require('path');
const uuid = require('uuid');
const {Eyes} = require('eyes.images');

const application = require(path.join(process.cwd(), 'package.json')).name;

const theEyes = new Eyes();

theEyes.setOs(process.platform);
theEyes.setApiKey(process.env.EYES_API_KEY);
theEyes.setBatch(application, process.env.EYES_BATCH_UUID || uuid.v4());

const checkImage = process.env.EYES_API_KEY
  ? theEyes.checkImage.bind(theEyes)
  : () => {};

async function withEyesFactory(callback, test, version) {
  try {
    await theEyes.open(application, `${test}, ${version}`);
    await callback.call(this, checkImage);
  } catch (error) {
    await theEyes.abortIfNotClosed();
    throw error;
  }
  await theEyes.close();
  console.log(`eyes.images comparison succeeded for "${test}, ${version}"`);
}

module.exports.withEyesFactory = withEyesFactory;
