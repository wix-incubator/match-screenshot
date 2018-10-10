const {Eyes} = require('eyes.images');
require('dotenv').config();

class MatchScreenshotEyes {
  constructor() {
    this.eyesInstance = new Eyes();
    if (process.env.EYES_API_KEY) {
      this.eyesInstance.setOs(process.platform);
      this.eyesInstance.setApiKey(process.env.EYES_API_KEY);
    }
  }
  async open({appName, testName}) {
    return this.eyesInstance.open(appName, testName);
  }

  async close() {
    await this.eyesInstance.close();
  }

  async checkImage({img, title}) {
    return this.eyesInstance.checkImage(img, title);
  }

  async abortIfNotClosed() {
    return this.eyesInstance.abortIfNotClosed();
  }
}

module.exports = MatchScreenshotEyes;
