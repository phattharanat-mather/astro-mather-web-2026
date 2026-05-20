import { useState, useEffect } from 'react';

const PRESETS = ['cosmos', 'dawn', 'void'] as const;
const DARK_PRESETS: string[] = ['cosmos', 'void'];

type Preset = (typeof PRESETS)[number];

const LABELS: Record<Preset, string> = {
  cosmos: 'Cosmos',
  dawn: 'Dawn',
  void: 'Void',
};

const DOT_COLORS: Record<Preset, string> = {
  cosmos: 'oklch(0.58 0.26 272)',
  dawn:   'oklch(0.67 0.22 350)',
  void:   'oklch(0.85 0.18 195)',
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
          gap: '6px',
          padding: '4px 10px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted-foreground)',
          minWidth: '80px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: DOT_COLORS.cosmos,
          }}
        />
        Cosmos
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
        gap: '6px',
        padding: '4px 10px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--muted-foreground)',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'border-color 150ms, color 150ms',
        whiteSpace: 'nowrap',
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
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: DOT_COLORS[preset],
          flexShrink: 0,
        }}
      />
      {LABELS[preset]}
    </button>
  );
}
