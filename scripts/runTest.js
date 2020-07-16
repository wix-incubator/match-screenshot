const {spawnSync} = require('child_process');

function runTest(env) {
  return new Promise((res, rej) => {
    const config = {
      stdio: 'inherit',
    };

    if (env) {
      config.env = env;
    }

    try {
      spawnSync('jest', ['--maxWorkers=3'], config);
      res();
    } catch (e) {
      rej(e);
    }
  });
}

function runTestWithApplitoolsVars() {
  console.log(
    'Running tests with EYES_API_KEY and EYES_API_SERVER_URL env variables',
  );
  runTest();
}

function runTestWithoutApplitoolsVars() {
  console.log(
    'Running tests WITHOUT EYES_API_KEY and EYES_API_SERVER_URL env variables',
  );
  const environmentVariables = {...process.env};
  delete environmentVariables.EYES_API_KEY;
  delete environmentVariables.EYES_API_SERVER_URL;
  runTest(environmentVariables);
}

function main() {
  const {EYES_API_SERVER_URL, EYES_API_KEY} = process.env;

  if (!EYES_API_KEY && !EYES_API_SERVER_URL) {
    throw new Error(
      'Must provide EYES_API_KEY and EYES_API_SERVER_URL environment variables in order to test match-screenshot',
    );
  }

  runTestWithApplitoolsVars();
  runTestWithoutApplitoolsVars();
}

main();
