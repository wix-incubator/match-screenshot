/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toMatchScreenshot(args: { key?: string; version?: string }): R;
  }
}
