export const sum = (a: number, b: number) => a + b;

test('Should sum two numbers', () => expect(sum(1, 2)).toBe(3));
