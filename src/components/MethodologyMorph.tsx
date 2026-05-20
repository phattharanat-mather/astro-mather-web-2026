import { MorphingText } from '@/components/ui/morphing-text';

interface Props {
  tags: string[];
}

export function MethodologyMorph({ tags }: Props) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="inline-block h-px w-4 shrink-0 bg-[var(--primary)]" />
      <MorphingText
        texts={tags}
        className="h-5 max-w-none text-left font-mono text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] md:h-5 lg:text-xs"
      />
    </div>
  );
}
