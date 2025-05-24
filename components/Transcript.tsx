import type { HTMLProps } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '../util/cn';
import { formatSecondsForDisplay } from '../util/format-seconds-for-display';
import type { Caption } from '../types/caption.ts';

interface TranscriptProps extends HTMLProps<HTMLDivElement> {
  captions: Array<Caption>;
  error: string | null;
  activeCaption?: Caption;
  onCaptionClick: (startTime: number) => void;
}

export function Transcript({
  captions,
  error,
  activeCaption,
  onCaptionClick,
  className,
  ...rest
}: TranscriptProps) {
  const activeCaptionRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeCaptionRef.current && activeCaptionRef.current.parentElement) {
      const container = activeCaptionRef.current.parentElement;
      const containerOffsetTop = container.offsetTop;
      const elementTop = activeCaptionRef.current.offsetTop;

      container.scrollTo({
        top: elementTop - containerOffsetTop - 9,
        behavior: 'smooth',
      });
    }
  }, [activeCaption]);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-500 text-red-500 h-fit rounded-xl py-2 px-4">
        {error}
      </div>
    );
  }

  return (
    <aside
      className={cn(
        'flex flex-col gap-1 py-2 px-3 overflow-y-auto rounded-xl bg-white no-scrollbar',
        className,
      )}
      {...rest}
    >
      {captions.map(({ id, start, text }) => {
        return (
          <button
            key={id}
            type="button"
            ref={id === activeCaption?.id ? activeCaptionRef : null}
            className={cn(
              'flex p-2 rounded-lg cursor-pointer text-black hover:bg-blue-50',
              id === activeCaption?.id && 'bg-blue-200',
            )}
            onClick={() => onCaptionClick(start)}
          >
            <p className="min-w-14">{formatSecondsForDisplay(start)}</p>
            <p>{text}</p>
          </button>
        );
      })}
    </aside>
  );
}
