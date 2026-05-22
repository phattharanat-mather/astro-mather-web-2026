import { Vortex } from '@/components/ui/vortex';
import { useCssColor } from '@/components/home/hero-background/useCssColor';

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
  const bg = useCssColor('--background');

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
