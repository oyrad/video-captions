import type { Caption } from '../types/caption.ts';

export function parseSrtFile(srtText: string): Array<Caption> {
  const blocks = srtText.trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const [id, time, ...text] = block.split('\n');
    const [start, end] = time.split(' --> ');

    return {
      id: parseInt(id, 10),
      start: parseTime(start.trim()),
      end: parseTime(end.trim()),
      text: text.join('\n').trim(),
    };
  });
}

function parseTime(time: string) {
  const match = time.match(/(\d+):(\d+):(\d+),(\d+)/);
  if (!match) return 0;

  const [, hours, minutes, seconds, milliseconds] = match;
  return (
    parseInt(hours, 10) * 3600 +
    parseInt(minutes, 10) * 60 +
    parseInt(seconds, 10) +
    parseInt(milliseconds, 10) / 1000
  );
}
