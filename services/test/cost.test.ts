import { expect, test } from 'vitest';
import { calculateCost } from '../util/cost';

test('lowest tier', () => {
  const storage = 10;

  const expectedCost = 4000;
  const cost = calculateCost(storage);
  expect(cost).toEqual(expectedCost);
});

test('middle tier', () => {
  const storage = 100;

  const expectedCost = 20000;
  const cost = calculateCost(storage);
  expect(cost).toEqual(expectedCost);
});

test('highest tier', () => {
  const storage = 101;

  const expectedCost = 10100;
  const cost = calculateCost(storage);
  expect(cost).toEqual(expectedCost);
});
