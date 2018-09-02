# match-screenshot

[![Build Status](https://travis-ci.org/wix-incubator/match-screenshot.svg?branch=master)](https://travis-ci.org/wix-incubator/match-screenshot)
[![npm](https://img.shields.io/npm/v/match-screenshot.svg)](https://www.npmjs.com/package/match-screenshot)


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
    }
    ```

    In case you have several custom matchers in your project / you need `setupTestFrameworkScriptFile` for other configurations, just use:

    ```js
    "jest": {
      "setupTestFrameworkScriptFile": "<rootDir>/setupTestFrameworkScriptFile.js"
    }
    ```

    Inside `setupTestFrameworkScriptFile.js` you can then:

    ```js
    require('match-screenshot/jest');
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
      await expect(screenshot).toMatchScreenshot({key: 'my test'});
    });
    ```


## Creating a new baseline

When you change production code implementation, Eyes will break, and you will have to go to its management Dashboard and approve the change. In order to avoid that, you can assign a new version and create a new baseline:

```js
  it('my test', async () {
    await page.goto('http://www.wix.com');
    const screenshot = await page.screenshot();
    await expect(screenshot).toMatchScreenshot({key: 'my test', version: 'v1.0.1'});
  });
```

## api

#### toMatchScreenshot([options])

- options

  `key` <[string]> A unique key for your screenshot. This key will be used in Applittols Eyes.

  `version` <[string]> (optional) Used to create a new baseline. See [Creating a new baseline](https://github.com/wix-incubator/match-screenshot#creating-a-new-baseline) for more details. Default value: 'v1.0.0'.


#### jestWithConfig([options])

Configure your matcher with global options.

Set the matcher:

```js
"jest": {
  "setupTestFrameworkScriptFile": "<rootDir>/setupTestFrameworkScriptFile.js"
},
```

Inside `setupTestFrameworkScriptFile.js` you can then:

```js
require('match-screenshot/jestWithConfig')(options);
```

- options

  `appName` <[string]> Application name. Will be used inside Applitools as part of test title

## How does it work

Everytime you use `toMatchScreenshot` matcher, a screenshot will be sent to [Applitools Eyes](https://applitools.com/), which will compare the new screenshot with the baseline. The test will fail if they are not equal.

