import { useEffect, useMemo, useRef, useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer.tsx';
import { useCaptions } from '../hooks/use-captions.ts';
import { Transcript } from '../components/Transcript.tsx';
import { CaptionSettings } from '../components/CaptionSettings.tsx';
import { videoData } from '../data/video-data.ts';
import { VideoSelect } from '../components/VideoSelect.tsx';

export default function App() {
  const [video, setVideo] = useState(videoData[0]);
  const [playbackTime, setPlaybackTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const { captions, error: captionsLoadError } = useCaptions(video.captionsUrl);

  const activeCaption = useMemo(
    () => captions.find((caption) => caption.start <= playbackTime && caption.end > playbackTime),
    [captions, playbackTime],
  );

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
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 w-screen h-screen bg-neutral-900">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <VideoPlayer src={video.videoUrl} videoRef={videoRef} activeCaption={activeCaption} />

        <div className="flex flex-col-reverse md:flex-row gap-4">
          <CaptionSettings className="flex-1" />

          <VideoSelect
            selectedIndex={videoData.indexOf(video)}
            onVideoChange={(index) => setVideo(videoData[index])}
          />
        </div>
      </div>

      <Transcript
        captions={captions}
        error={captionsLoadError}
        activeCaption={activeCaption}
        onCaptionClick={(startTime) => {
          if (videoRef.current) {
            videoRef.current.currentTime = startTime;
            void videoRef.current.play();
          }
        }}
        className="lg:col-start-3 max-h-fit"
      />
    </main>
  );
}
