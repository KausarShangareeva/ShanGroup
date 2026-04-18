'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui', textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '3.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>Критическая ошибка</h2>
        <p style={{ fontSize: '1.8rem', color: '#666', marginBottom: '3rem' }}>Произошла непредвиденная ошибка.</p>
        <button
          onClick={() => reset()}
          style={{ fontSize: '1.6rem', fontWeight: 600, color: '#fff', background: '#111', border: 'none', borderRadius: '10rem', padding: '1.2rem 3rem', cursor: 'pointer' }}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
