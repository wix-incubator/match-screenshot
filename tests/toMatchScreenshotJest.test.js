const execa = require('execa');
const dargs = require('dargs');

describe('EYES', () => {
  jest.setTimeout(30000);

  describe('Log', () => {
    test('should log after eyes success', async () => {
      const options = {
        config: require.resolve('./__fixtures__/conf.json'),
      };

      const res = await execa('node', [
        require.resolve('jest/bin/jest'),
        require.resolve('./__fixtures__/test.customSpec'),
        dargs(options),
      ]);

      expect(res.stdout).toContain(
        'eyes comparison succeed for test "should work with jest v1.0.0"',
      );
    });
  });
});
