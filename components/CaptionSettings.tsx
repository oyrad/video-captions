import { useCaptionStylesStore } from '../stores/use-caption-styles-store.ts';
import type { HTMLProps } from 'react';
import { cn } from '../util/cn.ts';
import { CAPTION_POSITION, isCaptionPosition } from '../constants/caption-position.ts';
import { useHotkey } from '../hooks/use-hotkey.ts';

export function CaptionSettings({ className, ...rest }: HTMLProps<HTMLDivElement>) {
  const store = useCaptionStylesStore();

  useHotkey('c', () => {
    store.setCaptionsEnabled(!store.captionsEnabled);
  });

  return (
    <section
      className={cn('bg-white rounded-xl p-4 grid grid-cols-2 lg:grid-cols-4 gap-4', className)}
      {...rest}
    >
      <div className="flex items-center col-span-2 gap-2">
        <label htmlFor="captions-toggle" className="text-lg font-semibold text-gray-800">
          Captions (c)
        </label>
        <input
          id="captions-toggle"
          type="checkbox"
          checked={store.captionsEnabled}
          onChange={() => store.setCaptionsEnabled(!store.captionsEnabled)}
          className="h-4 w-4"
        />
      </div>

      <button
        className="bg-blue-500 rounded text-white col-start-4 py-1 cursor-pointer hover:opacity-90"
        onClick={store.resetStyles}
      >
        Reset styles
      </button>

      <div className="flex flex-col gap-2 col-span-2">
        <label className="text-sm font-medium">Font Size</label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.05"
          value={parseFloat(store.fontSize)}
          onChange={(e) => store.setFontSize(`${e.target.value}rem`)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1 col-span-2">
        <label className="text-sm font-medium">Position</label>
        <select
          value={store.position}
          onChange={(e) =>
            store.setPosition(
              isCaptionPosition(e.target.value) ? e.target.value : CAPTION_POSITION.BOTTOM,
            )
          }
          className="w-full border rounded px-2 py-1"
        >
          <option value={CAPTION_POSITION.BOTTOM}>Bottom</option>
          <option value={CAPTION_POSITION.TOP}>Top</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <label className="text-sm font-medium">Background Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={store.backgroundOpacity}
          onChange={(e) => store.setBackgroundOpacity(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Text Color</label>
        <input
          type="color"
          value={store.textColor}
          onChange={(e) => store.setTextColor(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Background Color</label>
        <input
          type="color"
          value={store.backgroundColor}
          onChange={(e) => store.setBackgroundColor(e.target.value)}
        />
      </div>
    </section>
  );
}
