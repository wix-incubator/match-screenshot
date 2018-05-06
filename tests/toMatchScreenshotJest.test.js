describe('EYES', () => {
  jest.setTimeout(30000);

  describe('Log', () => {
    test('should log after eyes success', async () => {
      const {spawn} = require('child_process');
      let _data;
      let fullfill;
      const p = new Promise(resolve => (fullfill = resolve));

      const res = spawn('node', [
        require.resolve('jest/bin/jest'),
        require.resolve('./__fixtures__/test.customSpec'),
        `--config=${require.resolve('./__fixtures__/conf.json')}`,
      ]);
      res.stdout.on('data', data => {
        _data += data.toString('utf8');
      });

      res.on('close', fullfill);
      await p;
      expect(_data).toContain(
        'eyes comparison succeed for test "should work v1.0.0"',
      );
    });
  });
});
