const MatchScreenshotEyes = require('../lib/matchScreenshotEyes');

describe('EYES', () => {
  let matchScreenshotEyes;
  jest.setTimeout(30000);

  beforeEach(() => {
    matchScreenshotEyes = new MatchScreenshotEyes();
  });

  test('should work', async () => {
    await global.page.setContent('<div>Hello World</div>');
    const screenshot = await global.page.screenshot({fullpage: true});
    try {
      await matchScreenshotEyes.open({
        appName: 'toMatchScreenshot',
        testName: 'generic check image',
      });
      await matchScreenshotEyes.checkImage({
        img: screenshot,
        title: 'checkImage',
      });
      await matchScreenshotEyes.close();
    } finally {
      await matchScreenshotEyes.abortIfNotClosed();
    }
  });
});
