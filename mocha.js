const {withEyesFactory} = require('./lib/eyes');

function withEyes(callback, options) {
  return async function() {
    this.timeout(30000);

    const test = this.test.fullTitle();
    const version = (options || {}).version || 'v1.0.0';
    await withEyesFactory.call(this, callback, test, version);
  };
}

module.exports.withEyes = withEyes;
