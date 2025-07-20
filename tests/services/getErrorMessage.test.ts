import getErrorMessage from '@/services/getErrorMessage';

describe('getErrorMessage function', () => {
  it.each([
    [400, 'Bad request'],
    [401, 'Unauthorized'],
    [403, 'Access denied'],
    [404, 'Not found'],
    [405, 'Method not allowed'],
    [429, 'Too many requests'],
    [500, 'Internal server error'],
    [503, 'Service unavailable']
  ])('returns correct message for status code', (code, message) => {
    expect(getErrorMessage(code)).toMatch(new RegExp(message, 'i'));
  });

  it('returns default message fo unknown status code', () => {
    expect(getErrorMessage(416)).toMatch(/Unexpected error/i);
  });
});
