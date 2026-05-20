import { useState } from 'react';
import type { PlatformSolutionsData } from '@/content-definition/home';

interface Props {
  data: PlatformSolutionsData;
}

export function PlatformSolutions({ data }: Props) {
  const [activeKey, setActiveKey] = useState(data.tabs[0]?.key ?? '');

  const filtered = data.projects.filter((p) => p.categories.includes(activeKey));

  return (
    <section id="platform" className="py-24 border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--ink)' }}
          >
            {data.heading}
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
            {data.intro}
          </p>
        </div>

        {/* Tab strip */}
        <div
          className="flex flex-wrap gap-2 mb-10 border-b border-[var(--line)] pb-0"
          role="tablist"
          aria-label="Platform categories"
        >
          {data.tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeKey === tab.key}
              onClick={() => setActiveKey(tab.key)}
              className={`
                px-4 py-2.5 -mb-px
                font-mono text-xs tracking-widest uppercase
                border-b-2 transition-colors duration-150
                ${
                  activeKey === tab.key
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects grid or placeholder */}
        {filtered.length > 0 ? (
          <div key={activeKey} className="columns-1 sm:columns-2 lg:columns-3 gap-4 animate-fade-up">
            {filtered.map((project, i) => (
              <div
                key={i}
                className="
                  break-inside-avoid mb-4
                  rounded-sm overflow-hidden
                  border border-[var(--line)]
                  bg-[var(--card)]
                "
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--ink)' }}>
                    {project.title}
                  </p>
                  <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-widest">
                    {project.categories.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            key={activeKey}
            className="
              grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-up
            "
            aria-label="Project placeholders"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="
                  aspect-video rounded-sm
                  border border-dashed border-[var(--line-strong)]
                  bg-[var(--surface)]
                  flex items-center justify-center
                "
              >
                <span className="font-mono text-xs text-[var(--muted-foreground)] opacity-40 tracking-widest uppercase">
                  Project
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
