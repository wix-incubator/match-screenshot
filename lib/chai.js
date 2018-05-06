const toMatchEyesScreenshot = require('./toMatchEyesScreenshot.js');

async function toMatchScreenshot(options) {
  await toMatchEyesScreenshot(this._obj, options);
}
module.exports = toMatchScreenshot;
