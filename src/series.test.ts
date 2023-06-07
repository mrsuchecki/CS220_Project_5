import { Stream, to } from "../include/stream.js";
import { addSeries, evalSeries } from "./series.js";

function expectStreamToBe<T>(s: Stream<T>, a: T[]) {
  for (const element of a) {
    expect(s.isEmpty()).toBe(false);
    expect(s.head()).toBe(element);

    s = s.tail();
  }

  expect(s.isEmpty()).toBe(true);
}

describe("addSeries", () => {
  it("adds simple streams together", () => {
    // Open `include/stream.ts` to learn how to use `to`
    // 1 -> 2 -> 3 -> 4 -> 5
    const a = to(1, 5);
    const b = to(1, 5);
    const c = addSeries(a, b);

    expectStreamToBe(c, [2, 4, 6, 8, 10]);
  });

  it("adds two streams of different lengths", () => {
    const a = to(1, 5);
    const b = to(1, 3);
    const c = addSeries(a, b);
    expectStreamToBe(c, [2, 4, 6, 4, 5]);
  });
});

describe("prodSeries", () => {
  // More tests for prodSeries go here
});

describe("derivSeries", () => {
  // More tests for derivSeries go here
});

describe("coeff", () => {
  // More tests for coeff go here
});

describe("evalSeries", () => {
  // More tests for evalSeries go here
  it("evaluates a series at a given value", () => {
    // Open `include/stream.ts` to learn how to use `to`
    // 1 -> 2 -> 3 -> 4 -> 5
    const a = to(1, 5);
    const f = evalSeries(a, 2);

    expect(f(0)).toBe(1);
    expect(f(1)).toBe(6);
    expect(f(2)).toBe(17);
  });
});

describe("applySeries", () => {
  // More tests for applySeries go here
});

describe("expSeries", () => {
  // More tests for expSeries go here
});

describe("recurSeries", () => {
  // More tests for recurSeries go here
});
