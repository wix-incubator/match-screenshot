const conditionalTest = (title, testLambda, condition) => {
  condition ? test(title, testLambda) : test.skip(title);
};

module.exports = conditionalTest;
