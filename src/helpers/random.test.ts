import { shuffle } from "./random";

// using closure to create fake Math.random function
const createFakeRnd = (seq = [0.08, 0.1, 0.5, 0.9, 0.2]) => {
  let i = 0;

  return () => {
    const rnd = seq[i];
    i = (i + 1) % seq.length;
    return rnd;
  };
};

const realRandom = global.Math.random;

describe("testing the shuffle function", () => {
  beforeEach(() => {
    const fakeRnd = createFakeRnd();
    global.Math.random = fakeRnd;
  });

  afterEach(() => {
    global.Math.random = realRandom;
  });

  it("should shuffle an array of numbers", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const output = shuffle(input);
    expect(output).toEqual([8, 3, 10, 5, 2, 7, 6, 4, 9, 1]);
  });
});
