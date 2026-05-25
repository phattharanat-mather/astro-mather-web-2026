import { useState } from "react";
import { motion } from "motion/react";
import { FlipWords } from "@/components/ui/flip-words";

interface Props {
  tags: string[];
  delay?: string;
}

export function HeroSignal({ tags, delay = "700ms" }: Props) {
  const [activeTag, setActiveTag] = useState(tags[0]);
  const activeIndex = tags.indexOf(activeTag);

  return (
    <div
      className="mt-10 flex items-center gap-5 hero-item"
      style={{ "--delay": delay } as React.CSSProperties}
    >
      {/* 4M + active pillar dots */}
      <div className="shrink-0">
        <p className="text-2xl font-bold leading-none mb-2" style={{ color: "var(--headline2)" }}>4M</p>
        <div className="flex items-center gap-1.5">
          {tags.map((_, i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              animate={{
                width: i === activeIndex ? "1.25rem" : "0.375rem",
                height: "0.1875rem",
                backgroundColor:
                  i === activeIndex
                    ? "oklch(0.58 0.26 272)"
                    : "oklch(0.55 0.055 258)",
                opacity: i === activeIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      </div>

      {/* Vertical divider */}
      <span
        className="shrink-0 w-px h-8 self-center"
        style={{ background: "var(--line)" }}
        aria-hidden="true"
      />

      {/* Morphing methodology name */}
      <FlipWords
        words={tags}
        duration={2500}
        className="font-mono text-base font-bold tracking-[0.2em] uppercase text-[var(--primary)] p-0"
        onWordChange={setActiveTag}
      />
    </div>
  );
}
