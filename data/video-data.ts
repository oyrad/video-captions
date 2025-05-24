interface VideoData {
  videoUrl: string;
  captionsUrl: string;
}

export const videoData: Array<VideoData> = [
  {
    videoUrl: '/video_1/clip.mp4',
    captionsUrl: '/video_1/captions.srt',
  },
  {
    videoUrl: '/video_2/clip.mp4',
    captionsUrl: '/video_2/captions.srt',
  },
];
