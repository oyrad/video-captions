import { videoData } from '../data/video-data';
import { cn } from '../util/cn.ts';
import type { HTMLProps } from 'react';

interface VideoSelectProps extends HTMLProps<HTMLDivElement> {
  selectedIndex: number;
  onVideoChange: (index: number) => void;
}

export function VideoSelect({
  selectedIndex,
  onVideoChange,
  className,
  ...rest
}: VideoSelectProps) {
  return (
    <section
      className={cn('bg-white rounded-xl p-3 flex flex-row lg:flex-col gap-2', className)}
      {...rest}
    >
      {videoData.map((video, index) => (
        <button
          key={index}
          onClick={() => onVideoChange(index)}
          className={cn(
            'rounded px-4 py-2 cursor-pointer flex-1 transition-colors',
            selectedIndex === index
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
          )}
        >
          {video.videoUrl}
        </button>
      ))}
    </section>
  );
}
