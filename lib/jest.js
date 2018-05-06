const matcherGenerator = require('./matcherGenerator');
const toMatchEyesScreenshot = require('./toMatchEyesScreenshot');

module.exports = matcherGenerator(toMatchEyesScreenshot);
