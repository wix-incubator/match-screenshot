const execa = require('execa');

describe('EYES', () => {
  jest.setTimeout(30000);
  describe('Log', () => {
    test('should log after eyes success', async () => {
      const res = await execa('node', [
        require.resolve('mocha/bin/mocha'),
        require.resolve('./__fixtures__/test.mocha'),
        require.resolve('../lib/chai'),
      ]);

      expect(res.stdout).toContain(
        'eyes comparison succeed for test "should work with chai v1.0.0"',
      );
    });
  });
});
