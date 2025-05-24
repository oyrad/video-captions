export const CAPTION_POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type CaptionPosition =
  (typeof CAPTION_POSITION)[keyof typeof CAPTION_POSITION];

export function isCaptionPosition(value: string): value is CaptionPosition {
  return value === CAPTION_POSITION.TOP || value === CAPTION_POSITION.BOTTOM;
}
