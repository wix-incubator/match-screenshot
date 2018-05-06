const [, , , chaiToMatchScreenshot] = process.argv;
const {Assertion, expect} = require('chai');

const toMatchScreenshot = require(chaiToMatchScreenshot);

Assertion.addMethod('toMatchScreenshot', toMatchScreenshot);

it(`should work with chai`, async function() { // eslint-disable-line
  this.timeout(30000);
  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
    ],
  });

  const page = await browser.newPage();
  await page.setContent('<div>Hi there chai!</div>');
  const screenshot = await page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    description: 'should work with chai',
  });
  await browser.close();
});
