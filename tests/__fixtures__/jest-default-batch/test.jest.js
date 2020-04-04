it(`should work with batch`, async () => {
  jest.setTimeout(30000);
  const batch = 'my batch';
  await global.page.setContent('<div>Hi there</div>');
  const screenshot = await global.page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with batch',
    batch,
  });
  await expect(screenshot).toMatchScreenshot({
    key: 'should work with batch1',
    batch,
  });
});
