import { type HTMLProps, type RefObject, useState } from 'react';
import { cn } from '../util/cn.ts';
import { useCaptionStylesStore } from '../stores/use-caption-styles-store.ts';
import { hexToRgba } from '../util/hex-to-rgba.ts';
import { CAPTION_POSITION } from '../constants/caption-position.ts';
import type { Caption } from '../types/caption.ts';
import { FONT_FAMILY } from '../constants/font-family.ts';

interface VideoPlayerProps extends HTMLProps<HTMLDivElement> {
  src: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  activeCaption?: Caption;
}

export function VideoPlayer({
  src,
  videoRef,
  activeCaption,
  className,
  ...rest
}: VideoPlayerProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    captionsEnabled,
    fontSize,
    fontFamily,
    textColor,
    backgroundColor,
    backgroundOpacity,
    position,
  } = useCaptionStylesStore();

  if (error) {
    return (
      <div className="bg-red-100 border border-red-500 text-red-500 h-fit rounded-xl py-2 px-4">
        {error}
      </div>
    );
  }

  return (
    <section className={cn('relative w-full aspect-video rounded-xl', className)} {...rest}>
      <video
        src={src}
        ref={videoRef}
        controls
        className="absolute inset-0 w-full h-full bg-black object-contain outline-none"
        onError={() => setError('Failed to load video. Please check the URL of the video file.')}
      />

      {captionsEnabled && activeCaption && (
        <p
          className={cn(
            'absolute px-3 py-1 rounded left-1/2 transform -translate-x-1/2 text-center z-10',
            fontFamily === FONT_FAMILY.SERIF && 'font-serif',
            fontFamily === FONT_FAMILY.MONOSPACE && 'font-mono',
            position === CAPTION_POSITION.TOP ? 'top-[15%]' : 'bottom-[15%]',
          )}
          style={{
            fontSize,
            color: textColor,
            backgroundColor: hexToRgba(backgroundColor, backgroundOpacity),
          }}
        >
          {activeCaption.text}
        </p>
      )}
    </section>
  );
}
