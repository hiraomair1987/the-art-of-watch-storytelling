"use client";

import { useEffect, useState } from "react";
import { CHAPTER_EVENT } from "./scene/StoryScene";
import { chapters } from "@/lib/site";

/** A quiet chapter index on the right edge of large screens. */
export default function ChapterNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener(CHAPTER_EVENT, on);
    return () => window.removeEventListener(CHAPTER_EVENT, on);
  }, []);

  return (
    <nav aria-label="Story chapters" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col items-end gap-1">
        {chapters.map((c, i) => {
          const on = i === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "step" : undefined}
                className="group flex items-center gap-3 rounded-full py-1.5 pl-3 pr-1 text-xs font-medium"
              >
                <span
                  className={`transition-all duration-300 ${
                    on ? "text-cream opacity-100" : "translate-x-1 text-cream-dim opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  }`}
                >
                  {c.label}
                </span>
                <span
                  className={`block h-px transition-all duration-500 ${on ? "w-8 bg-gradient-to-r from-violet-glow to-magenta" : "w-4 bg-cream-dim/50 group-hover:w-6 group-hover:bg-cream"}`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
