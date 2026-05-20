import { FlipWords } from '@/components/ui/flip-words';

interface Props {
  tags: string[];
}

export function MethodologyMorph({ tags }: Props) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="inline-block h-px w-4 shrink-0 bg-[var(--primary)]" />
      <FlipWords
        words={tags}
        duration={2500}
        className="font-mono text-base font-bold tracking-[0.2em] uppercase text-[var(--primary)] p-0"
      />
    </div>
  );
}
