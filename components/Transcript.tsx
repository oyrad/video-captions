import type { HTMLProps } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '../util/cn';
import { formatSecondsForDisplay } from '../util/format-seconds-for-display';
import type { Caption } from '../types/caption.ts';

interface TranscriptProps extends HTMLProps<HTMLDivElement> {
  captions: Array<Caption>;
  error: string | null;
  onCaptionClick: (startTime: number) => void;
  activeCaption?: Caption;
}

export function Transcript({
  captions,
  error,
  onCaptionClick,
  activeCaption,
  className,
  ...rest
}: TranscriptProps) {
  const activeCaptionRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeCaptionRef.current && activeCaptionRef.current.parentElement) {
      const container = activeCaptionRef.current.parentElement;
      const elementTop = activeCaptionRef.current.offsetTop;

      container.scrollTo({
        top: elementTop - container.offsetTop - 9,
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
      className={cn('flex flex-col gap-1 py-2 px-3 overflow-y-auto rounded-xl bg-white', className)}
      {...rest}
    >
      {captions.map(({ id, start, text }) => {
        return (
          <button
            key={id}
            type="button"
            ref={id === activeCaption?.id ? activeCaptionRef : null}
            className={cn(
              'flex px-1 py-2 rounded-lg cursor-pointer text-black hover:bg-blue-50',
              id === activeCaption?.id && 'bg-blue-200',
            )}
            onClick={() => onCaptionClick(start)}
          >
            <p className="min-w-16">{formatSecondsForDisplay(start)}</p>
            <p className="text-left">{text}</p>
          </button>
        );
      })}
    </aside>
  );
}
