import { useState, useMemo } from 'react';

export function useSearch(data, fields) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(item =>
      fields.some(field => {
        const val = field.split('.').reduce((o, k) => o?.[k], item);
        return String(val || '').toLowerCase().includes(q);
      })
    );
  }, [data, query, fields]);

  return { query, setQuery, filtered };
}
