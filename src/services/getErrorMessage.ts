function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Bad request (400). Please check the entered data.';
    case 401:
      return 'Unauthorized (401). Please log in to continue.';
    case 403:
      return 'Access denied (403). You don’t have permission to do this.';
    case 404:
      return 'Not found (404). Try changing the search or query.';
    case 405:
      return 'Method not allowed (405). Only GET requests are supported.';
    case 429:
      return 'Too many requests (429). You are being rate limited. Please wait a bit.';
    case 500:
      return 'Internal server error (500). Please try again later.';
    case 503:
      return 'Service unavailable (503). The server might be down for maintenance.';
    default:
      return `Unexpected error (code ${status}). Please try again.`;
  }
}

export default getErrorMessage;
