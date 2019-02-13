it(`should work with batch`, async () => {
  jest.setTimeout(30000);
  await global.page.setContent('<div>Hi there</div>');
  const screenshot = await global.page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with batch',
    batch: 'my batch',
  });
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with batch1',
    batch: 'my batch',
  });
});
