import { Vortex } from '@/components/ui/vortex';

// Cosmos dark — vortex uses additive glow compositing which requires darkness.
// This value is fixed regardless of the active page theme.
const CANVAS_BG = 'oklch(0.07 0.022 264)';

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
  return (
    <Vortex
      backgroundColor={CANVAS_BG}
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
