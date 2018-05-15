require('dotenv').config();

const path = require('path');
const uuid = require('uuid');
const {Eyes} = require('eyes.images');

const application = require(path.join(process.cwd(), 'package.json')).name;

const theEyes = new Eyes();

theEyes.setOs(process.platform);
theEyes.setApiKey(process.env.EYES_API_KEY);
theEyes.setBatch(application, process.env.EYES_BATCH_UUID || uuid.v4());

async function withEyesFactoryDummy(callback, test, version) {
  await callback.call(this, () => {});
  console.log(`eyes.images comparison skipped for "${test}, ${version}"`);
}

async function withEyesFactory(callback, test, version) {
  try {
    await theEyes.open(application, `${test}, ${version}`);
    await callback.call(this, theEyes.checkImage.bind(theEyes));
  } catch (error) {
    await theEyes.abortIfNotClosed();
    throw error;
  }
  await theEyes.close();
  console.log(`eyes.images comparison succeeded for "${test}, ${version}"`);
}

module.exports.withEyesFactory = theEyes.getApiKey()
  ? withEyesFactory
  : withEyesFactoryDummy;
