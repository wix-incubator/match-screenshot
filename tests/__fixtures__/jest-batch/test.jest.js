const MatchScreenshotEyes = require('../../../lib/matchScreenshotEyes');

const matchScreenshotEyes = new MatchScreenshotEyes({
  appName: 'My batch application',
});

it(`should batch`, async () => {
  jest.setTimeout(30000);
  matchScreenshotEyes.open({batchName: 'should batch XXX'});
  await global.page.setContent('<div>Hi there batch</div>');
  let screenshot = await global.page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with jest batch',
    matchScreenshotEyes,
  });

  await global.page.setContent('<div>Hi there batch 2</div>');
  screenshot = await global.page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with jest batch 2',
    matchScreenshotEyes,
  });
  matchScreenshotEyes.close('should batch');
});
