import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import { CAPTION_POSITION, type CaptionPosition } from '../const/caption-position.ts';

const captionStylesDefaults = {
  captionsEnabled: true,
  fontSize: '1.5rem',
  textColor: '#ffffff',
  backgroundColor: '#000000',
  backgroundOpacity: '0.9',
  position: CAPTION_POSITION.BOTTOM,
};

interface CaptionStylesStore {
  captionsEnabled: boolean;
  fontSize: string;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: string;
  position: CaptionPosition;
  setCaptionsEnabled: (enabled: boolean) => void;
  setFontSize: (size: string) => void;
  setTextColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundOpacity: (opacity: string) => void;
  setPosition: (position: CaptionPosition) => void;
  resetStyles: VoidFunction;
}

export const useCaptionStylesStore = create<CaptionStylesStore>()(
  persist(
    (set) => ({
      ...captionStylesDefaults,
      setCaptionsEnabled: (captionsEnabled) => set({ captionsEnabled }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTextColor: (textColor) => set({ textColor }),
      setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
      setBackgroundOpacity: (backgroundOpacity) => set({ backgroundOpacity }),
      setPosition: (position) => set({ position }),
      resetStyles: () => set({ ...captionStylesDefaults }),
    }),
    {
      name: 'caption-styles',
      version: 0,
    },
  ),
);
