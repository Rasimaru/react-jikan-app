export const createMockResponse = (data: Record<string, unknown>, status: number): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const getPagesArray = (totalPages: number): number[] => {
  const res = [];
  for (let i = 0; i < totalPages; i++) {
    res.push(i + 1);
  }
  return res;
};
