import checkResponse from '@/services/checkResponse';

jest.mock('@/services/getErrorMessage', () => ({
  __esModule: true,
  default: jest.fn((status) => `Error ${status}`)
}));

const mockSuccessData = { data: 'test' };
const mockErrorData = { message: 'Something went wrong' };
const mockEmptyData = {};

const createMockResponse = (data: Record<string, unknown>, status: number): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};

describe('checkResponse function', () => {
  it('returns parsed JSON when response is ok', async () => {
    const response = createMockResponse(mockSuccessData, 200);

    const result = await checkResponse(response);
    expect(result).toEqual(mockSuccessData);
  });

  it('throws error message if present', async () => {
    const response = createMockResponse(mockErrorData, 404);

    await expect(checkResponse(response)).rejects.toThrow('Something went wrong');
  });

  it('throws fallback error message', async () => {
    const response = createMockResponse(mockEmptyData, 500);

    await expect(checkResponse(response)).rejects.toThrow(/500/i);
  });
});
