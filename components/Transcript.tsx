import type { HTMLProps } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '../util/cn';
import { formatSecondsForDisplay } from '../util/format-seconds-for-display';
import type { Caption } from '../util/parse-captions-file';

interface TranscriptProps extends HTMLProps<HTMLDivElement> {
  captions: Array<Caption>;
  activeCaption?: Caption;
  onCaptionClick: (startTime: number) => void;
}

export function Transcript({
  captions,
  activeCaption,
  onCaptionClick,
  className,
  ...rest
}: TranscriptProps) {
  const activeCaptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeCaptionRef.current && activeCaptionRef.current.parentElement) {
      const container = activeCaptionRef.current.parentElement;
      const elementTop = activeCaptionRef.current.offsetTop;

      container.scrollTo({
        top: elementTop - 25,
        behavior: 'smooth',
      });
    }
  }, [activeCaption]);

  return (
    <div
      className={cn('flex flex-col gap-1 py-2 px-3 overflow-y-auto rounded-xl bg-white', className)}
      {...rest}
    >
      {captions.map(({ id, start, text }) => {
        return (
          <div
            key={id}
            ref={id === activeCaption?.id ? activeCaptionRef : null}
            className={cn(
              'flex p-2 rounded-lg cursor-pointer text-black hover:bg-blue-50',
              id === activeCaption?.id && 'bg-blue-200',
            )}
            onClick={() => onCaptionClick(start)}
          >
            <p className="min-w-14">{formatSecondsForDisplay(start)}</p>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
}
