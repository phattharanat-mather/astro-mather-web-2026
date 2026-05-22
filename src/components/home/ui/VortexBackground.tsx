import { useState, useEffect } from 'react';
import { Vortex } from '@/components/ui/vortex';

function readBackground(): string {
  const el = document.createElement('div');
  el.style.cssText = 'position:absolute;width:1px;height:1px;background-color:var(--background)';
  document.body.appendChild(el);
  const color = getComputedStyle(el).backgroundColor;
  document.body.removeChild(el);
  return color || 'rgb(7, 8, 13)';
}

interface Props {
  baseHue?: number;
  particleCount?: number;
  rangeY?: number;
  rangeSpeed?: number;
}

export function VortexBackground({
  baseHue = 210,
  particleCount = 500,
  rangeY = 800,
  rangeSpeed = 1.2,
}: Props) {
  const [bg, setBg] = useState<string>(() => readBackground());

  useEffect(() => {
    const update = () => setBg(readBackground());
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-preset', 'class'],
    });
    return () => mo.disconnect();
  }, []);

  return (
    <Vortex
      backgroundColor={bg}
      baseHue={baseHue}
      particleCount={particleCount}
      rangeY={rangeY}
      baseSpeed={0.0}
      rangeSpeed={rangeSpeed}
      baseRadius={1}
      rangeRadius={2}
      containerClassName="h-full w-full"
    />
  );
}
