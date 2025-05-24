import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import {
  CAPTION_POSITION,
  type CaptionPosition,
} from '../const/caption-position.ts';

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
}

export const useCaptionStylesStore = create<CaptionStylesStore>()(
  persist(
    (set) => ({
      captionsEnabled: true,
      fontSize: '1rem',
      textColor: '#ffffff',
      backgroundColor: '#000000',
      backgroundOpacity: '1',
      position: CAPTION_POSITION.BOTTOM,
      setCaptionsEnabled: (captionsEnabled) => set({ captionsEnabled }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTextColor: (textColor) => set({ textColor }),
      setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
      setBackgroundOpacity: (backgroundOpacity) => set({ backgroundOpacity }),
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'caption-styles',
      version: 0,
    },
  ),
);
