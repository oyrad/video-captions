import { videoData } from '../data/video-data';

interface VideoSelectProps {
  onVideoChange: (index: number) => void;
}

export function VideoSelect({ onVideoChange }: VideoSelectProps) {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
      {videoData.map((video, index) => (
        <button
          key={index}
          onClick={() => onVideoChange(index)}
          className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer hover:opacity-90"
        >
          {video.videoUrl}
        </button>
      ))}
    </div>
  );
}
