import type { HTMLProps, RefObject } from 'react';
import type { Caption } from '../util/parse-captions-file.ts';
import { cn } from '../util/cn.ts';
import { useCaptionStylesStore } from '../stores/use-caption-styles-store.ts';
import { hexToRgba } from '../util/hex-to-rgba.ts';
import { CAPTION_POSITION } from '../const/caption-position.ts';

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
  const { captionsEnabled, fontSize, textColor, backgroundColor, backgroundOpacity, position } =
    useCaptionStylesStore();

  return (
    <div className={cn('relative w-fit h-fit', className)} {...rest}>
      <video src={src} ref={videoRef} controls className="rounded-xl" />

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
    </div>
  );
}
