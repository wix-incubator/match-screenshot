const {Eyes} = require('eyes.images');
const path = require('path');
require('dotenv').config();

class MatchScreenshotEyes {
  constructor() {
    this.appName = '';
    this.eyesInstance = new Eyes();
    if (process.env.EYES_API_KEY) {
      this.eyesInstance.setOs(process.platform);
      this.eyesInstance.setApiKey(process.env.EYES_API_KEY);
    }
  }
  async open({batchName}) {
    await this.eyesInstance.open(
      this.appName,
      `${this.appName} toMatchScreenshot ${batchName ||
        `${this.appName} toMatchScreenshot ${specName} version: ${version}`}`,
    );
  }

  async close(batchName) {
    await this.eyesInstance.close();
    console.log(`eyes comparison succeed for test ${batchName}`);
  }

  async checkImage({instance, key}) {
    try {
      await this.eyesInstance.checkImage(instance, key);
    } catch (e) {
      await this.eyesInstance.abortIfNotClosed();
      throw e;
    }
  }
}

module.exports = MatchScreenshotEyes;
