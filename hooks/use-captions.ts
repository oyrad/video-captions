import { useEffect, useState } from 'react';
import { parseSrtFile } from '../util/parse-srt-file.ts';
import type { Caption } from '../types/caption.ts';

export function useCaptions(url: string) {
  const [captions, setCaptions] = useState<Array<Caption>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCaptions([]);
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setCaptions(parseSrtFile(text));
      })
      .catch(() =>
        setError('Failed to load captions. Please check the URL or your network connection.'),
      )
      .finally(() => setLoading(false));
  }, [url]);

  return { captions, loading, error };
}
