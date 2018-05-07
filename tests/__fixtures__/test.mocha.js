const [, , , chaiToMatchScreenshot, browserWSEndpoint] = process.argv;
const {Assertion, expect} = require('chai');

const toMatchScreenshot = require(chaiToMatchScreenshot);

Assertion.addMethod('toMatchScreenshot', toMatchScreenshot);
it(`should work with chai`, async function() { // eslint-disable-line
  this.timeout(30000);
  const puppeteer = require('puppeteer');

  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });

  const page = await browser.newPage();
  await page.setContent('<div>Hi there chai!</div>');
  const screenshot = await page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with chai',
  });
  await browser.disconnect();
});
