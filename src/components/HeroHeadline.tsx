import { TextHoverEffect } from '@/components/ui/text-hover-effect';

interface Props {
  headline: string;
}

export function HeroHeadline({ headline }: Props) {
  return (
    <>
      {/* Background watermark — large, faded */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ opacity: 0.04 }}
      >
        <div style={{ width: '140%', height: '60%' }}>
          <TextHoverEffect text={headline} duration={0.3} />
        </div>
      </div>

      {/* Foreground headline */}
      <div className="w-full max-w-3xl" style={{ height: '8rem' }}>
        <TextHoverEffect text={headline} duration={0.2} />
      </div>
    </>
  );
}
