# match-screenshot

[![Build Status](https://travis-ci.org/wix-incubator/match-screenshot.svg?branch=master)](https://travis-ci.org/wix-incubator/match-screenshot)

A simple Jest or Chai matcher to compare screenshots, using [Applitools Eyes](https://applitools.com/) (other platforms will be supported as well, TBD)


## Usage

1. Install

```bash
  npm install --save-dev match-screenshot
```

2. Setup eyes env variable

    Add `EYES_API_KEY` environment variable, with your eyes [key](https://applitools.com/docs/topics/overview/obtain-api-key.html) 

    #### CI

      Travis: go to your build's `options -> settings -> Environment Variables` and add `EYES_API_KEY` + your key


    #### locally

      add an `.env` file, with:

      ```
      EYES_API_KEY=<your key here>
      ```

      - this step is not mandatory - you should use it if you want to use eyes when running locally.
      - **you should put your `.env` file in git ignore!!!**


3. Set the matcher

    ##### Jest

    ```js
    "jest": {
      "setupTestFrameworkScriptFile": "match-screenshot/jest"
    },
    ```

    ##### Chai

    ```js
    const {Assertion} = require('chai');
    const toMatchScreenshot = require('match-screenshot/chai');
    Assertion.addMethod('toMatchScreenshot', toMatchScreenshot);
    ```

3. Use the matcher

    Puppeteer example:

    ```js
    it('my test', async () {
      await page.goto('http://www.wix.com');
      const screenshot = await page.screenshot();
      expect(screenshot).toMatchScreenshot({description: 'my test'});
    });
    ```


## Creating a new baseline

When you change production code implementation, Eyes will break, and you will have to go to its management Dashboard and approve the change. In order to avoid that, you can assign a new version and create a new baseline:

```js
  it('my test', async () {
    await page.goto('http://www.wix.com');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchScreenshot({description: 'my test', {version: 'v1.0.1'}});
  });
```


## How does it work

Everytime you use `toMatchScreenshot` matcher, a screenshot will be sent to [Applitools Eyes](https://applitools.com/), which will compare the new screenshot with the baseline. The test will fail if they are not equal.

