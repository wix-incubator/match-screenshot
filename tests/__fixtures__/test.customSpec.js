it(`should work`, async () => {
  jest.setTimeout(30000);
  await global.page.setContent('<div>Hi there</div>');
  const screenshot = await global.page.screenshot({fullpage: true});
  await expect(screenshot).toMatchScreenshot({
    description: 'should work with jest',
  });
});
