export interface Caption {
  id: number;
  start: number;
  end: number;
  text: string;
}

export function parseCaptionsFile(srtText: string): Array<Caption> {
  const blocks = srtText.trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const [idLine, timeLine, ...textLines] = block.split('\n');
    const [start, end] = timeLine.split(' --> ');

    return {
      id: parseInt(idLine, 10),
      start: parseTime(start.trim()),
      end: parseTime(end.trim()),
      text: textLines.join('\n').trim(),
    };
  });
}

function parseTime(time: string) {
  const [hours, minutes, seconds] = time.split(':');
  const [sec, milliseconds] = seconds.split(',');

  const parsedSeconds = parseFloat(sec);
  const parsedMilliseconds = milliseconds ? parseInt(milliseconds, 10) : 0;

  return (
    parseInt(hours) * 3600 +
    parseInt(minutes) * 60 +
    parsedSeconds +
    parsedMilliseconds / 1000
  );
}
