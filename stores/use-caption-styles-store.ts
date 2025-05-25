import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import { CAPTION_POSITION, type CaptionPosition } from '../constants/caption-position.ts';
import { FONT_FAMILY, type FontFamily } from '../constants/font-family.ts';

export const captionStyleDefaults = {
  captionsEnabled: true,
  fontSize: '1.5rem',
  fontFamily: FONT_FAMILY.SANS_SERIF,
  textColor: '#ffffff',
  backgroundColor: '#000000',
  backgroundOpacity: '0.9',
  position: CAPTION_POSITION.BOTTOM,
};

interface CaptionStylesStore {
  captionsEnabled: boolean;
  fontSize: string;
  fontFamily: FontFamily;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: string;
  position: CaptionPosition;
  setCaptionsEnabled: (enabled: boolean) => void;
  setFontSize: (size: string) => void;
  setFontFamily: (family: FontFamily) => void;
  setTextColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundOpacity: (opacity: string) => void;
  setPosition: (position: CaptionPosition) => void;
  resetStyles: VoidFunction;
}

export const useCaptionStylesStore = create<CaptionStylesStore>()(
  persist(
    (set) => ({
      ...captionStyleDefaults,
      setCaptionsEnabled: (captionsEnabled) => set({ captionsEnabled }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setTextColor: (textColor) => set({ textColor }),
      setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
      setBackgroundOpacity: (backgroundOpacity) => set({ backgroundOpacity }),
      setPosition: (position) => set({ position }),
      resetStyles: () => set({ ...captionStyleDefaults }),
    }),
    {
      name: 'caption-styles',
      version: 0,
    },
  ),
);
