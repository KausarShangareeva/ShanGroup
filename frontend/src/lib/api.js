const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'API error');
  }

  return res.json();
}
