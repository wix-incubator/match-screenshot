const {Eyes, ConsoleLogHandler} = require('@applitools/eyes-images');
const path = require('path');
require('dotenv').config();

const APPLITOOLS_CALL_TIMEOUT = 2 * 60 * 1000; // 2minutes
const rejectAfterTimePromise = (ms, description) =>
  new Promise((__, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`Waited for ${ms}ms for ${description}`)),
      ms,
    );
    timeout.unref();
  });

module.exports = (options = {}) =>
  async function toMatchScreenshot(
    instance,
    {key, version = 'v1.0.0', viewport, matchLevel, autoSaveNewTest = true},
  ) {
    const eyes = new Eyes();
    if (!process.env.EYES_API_KEY) {
      console.log(
        `EYES_API_KEY not found. Eyes comparison skipped for test "${key} ${version}"`,
      );
      return true;
    }
    eyes.setHostOS(process.platform);
    eyes.setApiKey(process.env.EYES_API_KEY);
    if (process.env.EYES_API_SERVER_URL) {
      eyes.setServerUrl(process.env.EYES_API_SERVER_URL);
    }
    eyes.setSaveNewTests(autoSaveNewTest);
    const appName =
      options.appName || require(path.join(process.cwd(), 'package.json')).name;

    const eyesPromise = sendToEyes({
      eyes,
      img: instance,
      appName,
      specName: key,
      version,
      viewport,
      matchLevel,
    });

    await Promise.race([
      eyesPromise,
      rejectAfterTimePromise(
        APPLITOOLS_CALL_TIMEOUT,
        "Wasn't able to complete the call to eyes (applitools)",
      ),
    ]);
  };

const sendToEyes = async ({
  eyes,
  img,
  appName,
  specName,
  version,
  viewport,
  matchLevel,
}) => {
  try {
    if (process.env.DEBUG_EYES) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }

    console.log(
      `eyes comparison started for test "${specName}" version: "${version}" at ${new Date()}`,
    );
    await eyes.open(
      appName,
      `${appName} toMatchScreenshot ${specName} version: ${version}`,
      viewport,
    );
    if (matchLevel) {
      eyes.setMatchLevel(matchLevel);
    }
    await eyes.checkImage(img, `${specName} ${version}`);
  } catch (e) {
    await eyes.abortIfNotClosed();
    throw e;
  }
  await eyes.close();
  console.log(
    `eyes comparison succeed for test "${specName} ${version}" at ${new Date()}`,
  );
};
