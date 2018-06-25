const matcherGenerator = require('./matcherGenerator');
const toMatchEyesScreenshot = require('./toMatchEyesScreenshot');

module.exports = options => matcherGenerator(toMatchEyesScreenshot(options));
