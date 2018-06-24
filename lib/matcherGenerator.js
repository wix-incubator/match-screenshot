let internalExpect;
const matcherGenerator = matcher => {
  internalExpect = screenShot => {
    const expectation = {};

    expectation[matcher.name] = createMatcher(matcher, screenShot);

    return expectation;
  };
  return internalExpect;
};

const createMatcher = (matcher, screenShot) => {
  return async function throwingMatcher(...args) {
    if (typeof global.expect !== 'undefined') {
      global.expect.getState().assertionCalls += 1;
    }
    try {
      return await matcher(screenShot, ...args);
    } catch (error) {
      // Error.captureStackTrace(error, createMatcher);
      throw error;
    }
  };
};

if (typeof global.expect !== 'undefined') {
  const originalExpect = global.expect;
  global.expect = (actual, ...args) => {
    const screenshotsMatcher = internalExpect(actual);
    const jestMatchers = originalExpect(actual, ...args);

    return {
      ...jestMatchers,
      ...screenshotsMatcher,
      not: {
        ...jestMatchers.not,
      },
    };
  };

  // put back expect properties we run over
  Object.keys(originalExpect).forEach(prop => {
    global.expect[prop] = originalExpect[prop];
  });
}

module.exports = matcherGenerator;
