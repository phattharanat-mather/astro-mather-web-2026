import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { siteConfig } from '@/data/site';
import type { ColorPreset } from '@/data/site';

const PRESETS = siteConfig.colorPresets;

type Preset = ColorPreset;

const ICONS: Record<Preset, React.ReactNode> = {
  cosmos: <Sparkles size={14} />,
  dawn:   <Sun size={14} />,
  void:   <Moon size={14} />,
};

function applyPreset(preset: Preset) {
  const meta = PRESETS.find((p) => p.name === preset)!;
  document.documentElement.dataset.colorPreset = preset;
  if (meta.mode === 'dark') {
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
    const idx = PRESETS.findIndex((p) => p.name === preset);
    const next = PRESETS[(idx + 1) % PRESETS.length].name;
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
      title={`Theme: ${PRESETS.find((p) => p.name === preset)!.label} — click to cycle`}
      aria-label={`Current theme: ${PRESETS.find((p) => p.name === preset)!.label}. Click to switch theme.`}
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
