import checkResponse from '@/utils/http/checkResponse';
import { mockEmptyData, mockErrorData, mockSuccessData } from '../../mocks/data/responses';
import { createMockResponse } from '../../mocks/utils';

jest.mock('@/utils/http/getErrorMessage', () => ({
  __esModule: true,
  default: jest.fn((status) => `Error ${status}`)
}));

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
