import getErrorMessage from './getErrorMessage';

async function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  try {
    const errorData = await response.json();
    const serverMessage = errorData.message || errorData.error;

    if (serverMessage) {
      throw new Error(serverMessage);
    }
  } catch {
    console.info('Response is not a valid Jikan error JSON; using fallback message.');
  }

  const fallbackMessage = getErrorMessage(response.status);
  throw new Error(fallbackMessage);
}

export default checkResponse;
