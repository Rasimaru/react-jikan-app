export const extractErrorMessage = (error: unknown): string | undefined => {
  if (!error) return;

  if (typeof error === 'object' && error !== null) {
    const err = error as { message?: string; data?: { message?: string } };
    if (typeof err.message === 'string') return err.message;
    if (typeof err.data?.message === 'string') return err.data.message;
  }
  return 'Unknown Error';
};

export const withBasePath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

export const formatPathname = (pathname: string) =>
  pathname.endsWith('/') ? pathname : `${pathname}/`;
