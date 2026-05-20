import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';

const PRESETS = ['cosmos', 'dawn', 'void'] as const;
const DARK_PRESETS: string[] = ['cosmos', 'void'];

type Preset = (typeof PRESETS)[number];

const LABELS: Record<Preset, string> = {
  cosmos: 'Cosmos',
  dawn: 'Dawn',
  void: 'Void',
};

const ICONS: Record<Preset, React.ReactNode> = {
  cosmos: <Sparkles size={14} />,
  dawn:   <Sun size={14} />,
  void:   <Moon size={14} />,
};

function applyPreset(preset: Preset) {
  document.documentElement.dataset.colorPreset = preset;
  if (DARK_PRESETS.includes(preset)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('color-preset', preset);
}

export function ThemeSwitcher() {
  const [preset, setPreset] = useState<Preset>('cosmos');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem('color-preset') as Preset) || 'cosmos';
    setPreset(saved);
  }, []);

  function cycle() {
    const idx = PRESETS.indexOf(preset);
    const next = PRESETS[(idx + 1) % PRESETS.length];
    setPreset(next);
    applyPreset(next);
  }

  /* Render a static placeholder until mounted (avoids SSR mismatch) */
  if (!mounted) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30px',
          height: '30px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          color: 'var(--muted-foreground)',
        }}
      >
        {ICONS.cosmos}
      </span>
    );
  }

  return (
    <button
      onClick={cycle}
      title={`Theme: ${LABELS[preset]} — click to cycle`}
      aria-label={`Current theme: ${LABELS[preset]}. Click to switch theme.`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        color: 'var(--muted-foreground)',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'border-color 150ms, color 150ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted-foreground)';
      }}
    >
      {ICONS[preset]}
    </button>
  );
}
