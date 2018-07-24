const execa = require('execa');
const dargs = require('dargs');

describe('EYES', () => {
  jest.setTimeout(30000);

  describe('Log', () => {
    test('should log after eyes success', async () => {
      const options = {
        config: require.resolve('./__fixtures__/jest-default/conf.json'),
      };

      const res = await execa('node', [
        require.resolve('jest/bin/jest'),
        require.resolve('./__fixtures__/jest-default/test.jest'),
        dargs(options),
      ]);

      expect(res.stdout).toContain(
        'eyes comparison succeed for test "should work with jest v1.0.0"',
      );
    });
  });

  describe('should works with configurations', () => {
    test('should log after eyes success', async () => {
      const options = {
        config: require.resolve('./__fixtures__/jest-with-config/conf.json'),
      };

      const res = await execa('node', [
        require.resolve('jest/bin/jest'),
        require.resolve('./__fixtures__/jest-with-config/test.jest'),
        dargs(options),
      ]);

      expect(res.stdout).toContain(
        'eyes comparison succeed for test "should work with jest v1.0.0"',
      );
    });
  });

  test('should support a new baseline', async () => {
    await global.page.setContent('<div>Hello World</div>');
    const screenshot = await global.page.screenshot({fullpage: true});
    await expect(screenshot).toMatchScreenshot({
      key: 'Hello World',
      version: 'v1.0.0',
    });
    await global.page.setContent('<div>Hello World 123</div>');
    const screenshot2 = await global.page.screenshot({fullpage: true});
    await expect(screenshot2).toMatchScreenshot({
      key: 'Hello World',
      version: 'v1.0.1',
    });
  });

  test('should fail', async () => {
    await global.page.setContent('<div>Hello World</div>');
    const screenshot = await global.page.screenshot({fullpage: true});
    await expect(screenshot).toMatchScreenshot({
      key: 'Failing Hello World',
    });
    await global.page.setContent('<div>Hello World 123</div>');
    const screenshot2 = await global.page.screenshot({fullpage: true});
    let error;
    try {
      await expect(screenshot2).toMatchScreenshot({
        key: 'Failing Hello World',
      });
    } catch (e) {
      error = e;
    }
    expect(error).toBeTruthy();
  });
});
