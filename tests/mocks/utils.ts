export const createMockResponse = (data: Record<string, unknown>, status: number): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};
