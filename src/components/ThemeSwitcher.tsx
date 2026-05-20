import { useState, useEffect } from 'react';

const PRESETS = ['cosmos', 'dawn', 'void'] as const;
const DARK_PRESETS = ['cosmos', 'void'] as const;

type Preset = (typeof PRESETS)[number];

const LABELS: Record<Preset, string> = {
  cosmos: 'Cosmos',
  dawn: 'Dawn',
  void: 'Void',
};

function applyPreset(preset: Preset) {
  document.documentElement.dataset.colorPreset = preset;
  if ((DARK_PRESETS as readonly string[]).includes(preset)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('color-preset', preset);
}

export function ThemeSwitcher() {
  const [preset, setPreset] = useState<Preset>('cosmos');

  useEffect(() => {
    const saved = (localStorage.getItem('color-preset') as Preset) || 'cosmos';
    setPreset(saved);
  }, []);

  function cycle() {
    const idx = PRESETS.indexOf(preset);
    const next = PRESETS[(idx + 1) % PRESETS.length];
    setPreset(next);
    applyPreset(next);
  }

  const isDark = (DARK_PRESETS as readonly string[]).includes(preset);

  return (
    <button
      onClick={cycle}
      title={`Theme: ${LABELS[preset]} — click to cycle`}
      aria-label={`Current theme: ${LABELS[preset]}. Click to switch.`}
      className="
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-sm
        text-xs font-mono tracking-widest uppercase
        border border-[var(--line-strong)]
        text-[var(--muted-foreground)]
        hover:text-[var(--foreground)] hover:border-[var(--primary)]
        transition-colors duration-150
        select-none cursor-pointer
      "
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: isDark ? 'var(--primary)' : 'var(--secondary)' }}
      />
      {LABELS[preset]}
    </button>
  );
}
