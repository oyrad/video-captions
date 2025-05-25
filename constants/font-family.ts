export const FONT_FAMILY = {
  SANS_SERIF: 'sans-serif',
  SERIF: 'serif',
  MONOSPACE: 'monospace',
} as const;

export type FontFamily = (typeof FONT_FAMILY)[keyof typeof FONT_FAMILY];

export function isFontFamily(value: string): value is FontFamily {
  return (
    value === FONT_FAMILY.SANS_SERIF ||
    value === FONT_FAMILY.SERIF ||
    value === FONT_FAMILY.MONOSPACE
  );
}
