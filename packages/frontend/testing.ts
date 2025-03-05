import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

declare module "bun:test" {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  // interface AsymmetricMatchers extends TestingLibraryMatchers<any, any> {}
}

// Optional: cleans up `render` after each test
afterEach(() => {
  cleanup();
});
