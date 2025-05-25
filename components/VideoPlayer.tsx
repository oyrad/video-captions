import { type HTMLProps, type RefObject, useState } from 'react';
import { cn } from '../util/cn.ts';
import { useCaptionStylesStore } from '../stores/use-caption-styles-store.ts';
import { hexToRgba } from '../util/hex-to-rgba.ts';
import { CAPTION_POSITION } from '../constants/caption-position.ts';
import type { Caption } from '../types/caption.ts';

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

  const { captionsEnabled, fontSize, textColor, backgroundColor, backgroundOpacity, position } =
    useCaptionStylesStore();

  if (error) {
    return (
      <div className="bg-red-100 border border-red-500 text-red-500 h-fit rounded-xl py-2 px-4">
        {error}
      </div>
    );
  }

  return (
    <section className={cn('relative w-fit h-fit', className)} {...rest}>
      <video
        src={src}
        ref={videoRef}
        controls
        className="rounded-xl"
        onError={() => setError('Failed to load video. Please check the URL of the video file.')}
      />

      {captionsEnabled && activeCaption && (
        <p
          className={cn(
            'absolute px-3 py-1 rounded left-1/2 transform -translate-x-1/2 text-center',
            position === CAPTION_POSITION.BOTTOM ? 'bottom-2 md:bottom-6' : 'top-2 md:top-6',
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
