module.exports = {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
    ],
  },
};
