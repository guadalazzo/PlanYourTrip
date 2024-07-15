import { getDay, getDayOfTheWeek, isLastDay, formatPrice, calculatePreDiscount } from '../utils';

describe('Utility Functions', () => {
  test('getDay should return the correct day of the month', () => {
    expect(getDay('2023-10-21')).toBe(21);
  });

  test('getDayOfTheWeek should return the correct day of the week', () => {
    expect(getDayOfTheWeek('2023-10-21')).toBe('SAT');
    expect(getDayOfTheWeek('2023-10-22')).toBe('SUN');
  });

  test('isLastDay should return true if it is the last day of the month', () => {
    expect(isLastDay('2023-10-31')).toBe(true);
    expect(isLastDay('2023-10-30')).toBe(false);
  });

  test('formatPrice should format the price to 2 decimal places with € sign', () => {
    expect(formatPrice(123.456)).toBe('€123.46');
    expect(formatPrice(0)).toBe('€0.00');
  });

  test('calculatePreDiscount should return the pre-discount price', () => {
    const discountPrice = calculatePreDiscount(100, 10);
    expect(discountPrice).toBe(110);

    const discountPriceZero = calculatePreDiscount(0, 0.1);
    expect(discountPriceZero).toBe(0);
  });
});
