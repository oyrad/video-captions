import { useEffect, useRef, useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer.tsx';
import { useCaptions } from '../hooks/use-captions.ts';
import { Transcript } from '../components/Transcript.tsx';
import { CaptionSettings } from '../components/CaptionSettings.tsx';
import { videoData } from '../data/video-data.ts';
import { VideoSelect } from '../components/VideoSelect.tsx';

export default function App() {
  const [video, setVideo] = useState(videoData[1]);
  const [playbackTime, setPlaybackTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const { captions } = useCaptions(video.captionsUrl);

  const activeCaption = captions.find(
    (caption) => caption.start < playbackTime && caption.end > playbackTime,
  );

  function handleVideoChange(index: number) {
    setVideo(videoData[index]);
  }

  useEffect(() => {
    let rafId: number;

    const updateTime = () => {
      if (videoRef.current) {
        setPlaybackTime(videoRef.current.currentTime);
      }
      rafId = requestAnimationFrame(updateTime);
    };

    updateTime();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-4 p-4 w-screen h-screen bg-neutral-900">
      <div className="flex flex-col gap-4 lg:col-span-2 lg:row-start-1">
        <VideoPlayer src={video.videoUrl} videoRef={videoRef} activeCaption={activeCaption} />

        <div className="flex flex-col-reverse md:flex-row gap-4">
          <CaptionSettings className="flex-1" />

          <VideoSelect onVideoChange={handleVideoChange} />
        </div>
      </div>

      <Transcript
        captions={captions}
        activeCaption={activeCaption}
        onCaptionClick={(startTime) => {
          if (videoRef.current) {
            videoRef.current.currentTime = startTime;
            void videoRef.current.play();
          }
        }}
        className="lg:col-start-3 lg:row-span-2 max-h-fit"
      />
    </main>
  );
}
