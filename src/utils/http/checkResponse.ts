import getErrorMessage from './getErrorMessage';

async function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  const errorData: unknown = await response.json();

  const serverMessage =
    typeof errorData === 'object' && errorData !== null && 'message' in errorData
      ? (errorData as { message?: string }).message
      : undefined;

  if (serverMessage) {
    throw new Error(serverMessage);
  }

  const fallbackMessage = getErrorMessage(response.status);
  throw new Error(fallbackMessage);
}

export default checkResponse;
