import { useEffect, useState } from 'react';
import {
  type Caption,
  parseCaptionsFile,
} from '../util/parse-captions-file.ts';

export function useCaptions(url: string) {
  const [captions, setCaptions] = useState<Array<Caption>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setCaptions(parseCaptionsFile(text));
      })
      .catch((err) => setError(`Error loading subtitles: ${err}`))
      .finally(() => setLoading(false));
  }, [url]);

  return { captions, loading, error };
}
