import { site } from "@/lib/site";

/** The efficiovirtual wordmark: always lowercase, with a small luminous mark. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 shrink-0">
        <defs>
          <linearGradient id="wm-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c7b6ff" />
            <stop offset="1" stopColor="#e2559f" />
          </linearGradient>
        </defs>
        <rect x="3" y="7" width="18" height="12" rx="3" fill="none" stroke="url(#wm-g)" strokeWidth="1.5" opacity="0.7" />
        <rect x="11" y="13" width="18" height="12" rx="3" fill="rgba(159,132,255,0.18)" stroke="url(#wm-g)" strokeWidth="1.5" />
        <circle cx="20" cy="19" r="2.2" fill="#f5eee6" />
      </svg>
      <span className="font-display text-[1.35rem] font-medium leading-none tracking-[-0.02em] text-cream">{site.name}</span>
    </span>
  );
}
