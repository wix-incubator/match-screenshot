const {conditionalTest, executeTest} = require('./toMatchScreenshot.driver.js');

describe('EYES', () => {
  jest.setTimeout(30000);

  const eyesApiKey = process.env.EYES_API_KEY;

  if (!process.env.EYES_API_KEY) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      '>>> EYES_API_KEY is missing. For all the tests to run please add .env file to the root of the project with EYES_API_KEY=<your key here> <<<',
    );
  }

  describe('when EYES_API_KEY is missing', () => {
    beforeAll(() => {
      process.env.EYES_API_KEY = '';
    });

    test('should return success without accessing eyes', async () => {
      await global.page.setContent('<div>Hello World 123</div>');
      const screenshot1 = await global.page.screenshot({fullpage: true});
      let error;
      try {
        await expect(screenshot1).toMatchScreenshot({
          key: 'Missing API key',
        });

        await global.page.setContent('<div>Hello World 1234</div>');
        const screenshot2 = await global.page.screenshot({fullpage: true});

        await expect(screenshot2).toMatchScreenshot({
          key: 'Missing API key',
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeUndefined();
      expect(await executeTest()).toContain(
        'EYES_API_KEY not found. Eyes comparison skipped for test "should work with jest v1.0.0"',
      );
    });

    afterAll(() => {
      process.env.EYES_API_KEY = eyesApiKey;
    });
  });

  describe('Log', () => {
    conditionalTest(
      'should log after eyes success',
      async () => {
        expect(await executeTest()).toContain(
          'eyes comparison succeed for test "should work with jest v1.0.0"',
        );
      },
      eyesApiKey,
    );
  });

  describe('should works with configurations', () => {
    conditionalTest(
      'should log after eyes success',
      async () => {
        expect(await executeTest()).toContain(
          'eyes comparison succeed for test "should work with jest v1.0.0"',
        );
      },
      eyesApiKey,
    );
  });

  describe('basic flows', () => {
    conditionalTest(
      'should support a new baseline',
      async () => {
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
      },
      eyesApiKey,
    );

    conditionalTest(
      'should fail',
      async () => {
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
      },
      eyesApiKey,
    );

    conditionalTest(
      'should not create new baseline for different image sizes when viewport is provided',
      async () => {
        const viewport = {width: 100, height: 100};
        await global.page.setContent('<div id="container">Hello World</div>');
        const container = await global.page.$('#container');
        const screenshot = await container.screenshot({fullpage: true});
        await expect(screenshot).toMatchScreenshot({
          key: 'helloWorldWithViewport',
          version: 'v1.0.0',
          viewport,
        });
        await global.page.setContent(
          '<div id="container" style="padding-bottom: 10px">Hello World</div>',
        );
        const container2 = await global.page.$('#container');
        const screenshot2 = await container2.screenshot({fullpage: true});
        let error;
        try {
          await expect(screenshot2).toMatchScreenshot({
            key: 'helloWorldWithViewport',
            version: 'v1.0.0',
            viewport,
          });
        } catch (e) {
          error = e;
        }
        expect(error).toBeTruthy();
      },
      eyesApiKey,
    );
  });
});
