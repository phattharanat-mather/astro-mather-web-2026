import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/data/site';
import type { ColorPreset } from '@/data/site';

const PRESETS = siteConfig.colorPresets;

type Preset = ColorPreset;

const SWATCHES: Record<Preset, [string, string, string]> = {
  cosmos:    ['oklch(0.58 0.26 272)', 'oklch(0.82 0.14 200)', 'oklch(0.67 0.22 350)'],
  dawn:      ['oklch(0.52 0.26 272)', 'oklch(0.48 0.14 200)', 'oklch(0.60 0.22 350)'],
  void:      ['oklch(0.62 0.28 272)', 'oklch(0.85 0.18 195)', 'oklch(0.70 0.24 350)'],
  sun:       ['oklch(0.62 0.20 60)',  'oklch(0.68 0.18 42)',  'oklch(0.55 0.24 28)' ],
  moon:      ['oklch(0.40 0.010 242)','oklch(0.55 0.008 242)','oklch(0.48 0.040 270)'],
  blackhole: ['oklch(0.68 0.22 52)',  'oklch(0.58 0.26 18)',  'oklch(0.62 0.24 245)'],
  pulsar:    ['oklch(0.75 0.24 196)', 'oklch(0.60 0.28 332)', 'oklch(0.78 0.22 142)'],
  nebula:    ['oklch(0.62 0.26 346)', 'oklch(0.65 0.18 178)', 'oklch(0.55 0.22 312)'],
};

const LIGHT_PRESETS = PRESETS.filter((p) => p.mode === 'light');
const DARK_PRESETS  = PRESETS.filter((p) => p.mode === 'dark');

function SwatchDots({ colors }: { colors: [string, string, string] }) {
  return (
    <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
      {colors.map((c, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: c,
            flexShrink: 0,
          }}
        />
      ))}
    </span>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <li
      aria-hidden
      style={{
        padding: '4px 8px 2px',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--popover-foreground)',
        opacity: 0.4,
        userSelect: 'none',
      }}
    >
      {children}
    </li>
  );
}

function Divider() {
  return (
    <li
      aria-hidden
      style={{
        height: '1px',
        margin: '4px 0',
        background: 'var(--popover-foreground)',
        opacity: 0.08,
      }}
    />
  );
}

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

function PresetOption({
  p,
  active,
  onSelect,
}: {
  p: (typeof PRESETS)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const highlighted = active || hovered;

  return (
    <li>
      <button
        role="option"
        aria-selected={active}
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '5px 8px',
          border: 'none',
          borderRadius: 'calc(var(--radius) - 2px)',
          /* Theme-neutral highlight: semi-transparent overlay works on both light + dark */
          background: highlighted ? 'oklch(0.5 0 0 / 10%)' : 'transparent',
          color: 'var(--popover-foreground)',
          cursor: 'pointer',
          fontSize: '13px',
          textAlign: 'left',
          transition: 'background 100ms',
          /* Selected indicator: left border using the preset's primary swatch colour */
          borderLeft: active
            ? `2px solid ${SWATCHES[p.name as Preset][0]}`
            : '2px solid transparent',
          paddingLeft: '6px',
          fontWeight: active ? 500 : 400,
        }}
      >
        <SwatchDots colors={SWATCHES[p.name as Preset]} />
        {p.label}
      </button>
    </li>
  );
}

export function ThemeSwitcher() {
  const [preset, setPreset] = useState<Preset>(
    () => (localStorage.getItem('color-preset') as Preset) || 'void'
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.getElementById('tsw-static')?.remove();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function select(p: Preset) {
    setPreset(p);
    applyPreset(p);
    setOpen(false);
  }

  const triggerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    height: '30px',
    padding: '0 8px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'border-color 150ms, color 150ms',
    whiteSpace: 'nowrap',
  };

  const currentLabel = PRESETS.find((p) => p.name === preset)!.label;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Current theme: ${currentLabel}. Click to change.`}
        style={triggerStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted-foreground)';
        }}
      >
        <SwatchDots colors={SWATCHES[preset]} />
        <span>{currentLabel}</span>
        <ChevronDown
          size={11}
          style={{ transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select theme"
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 6px)',
            margin: 0,
            padding: '4px',
            listStyle: 'none',
            background: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: '0 4px 16px oklch(0 0 0 / 20%)',
            minWidth: '140px',
            zIndex: 50,
          }}
        >
          <GroupLabel>Light</GroupLabel>
          {LIGHT_PRESETS.map((p) => (
            <PresetOption
              key={p.name}
              p={p}
              active={preset === p.name}
              onSelect={() => select(p.name as Preset)}
            />
          ))}
          <Divider />
          <GroupLabel>Dark</GroupLabel>
          {DARK_PRESETS.map((p) => (
            <PresetOption
              key={p.name}
              p={p}
              active={preset === p.name}
              onSelect={() => select(p.name as Preset)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
