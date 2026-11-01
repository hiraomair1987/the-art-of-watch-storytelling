/** Line icons that echo each service's 3D emblem. */
export default function ServiceIcon({ index, className = "h-10 w-10" }: { index: number; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      {index === 0 && (
        <g {...common}>
          <circle cx="18" cy="22" r="13" opacity="0.55" />
          <circle cx="18" cy="22" r="8.5" opacity="0.8" />
          <circle cx="18" cy="22" r="4" className="text-magenta" stroke="#e2559f" />
          <path d="M34 6L19 21M34 6v6M34 6h-6" />
        </g>
      )}
      {index === 1 && (
        <g {...common}>
          <circle cx="20" cy="20" r="12" />
          <circle cx="32" cy="20" r="3" fill="#e2559f" stroke="#e2559f" />
          <circle cx="14" cy="9.6" r="3" fill="#160a1d" />
          <circle cx="14" cy="30.4" r="3" fill="#160a1d" />
          <path d="M27 9.5l3.5 1-1 3.5" opacity="0.7" />
        </g>
      )}
      {index === 2 && (
        <g {...common}>
          <path d="M20 5l13 7.5v15L20 35 7 27.5v-15z" />
          <path d="M7 12.5L20 20l13-7.5M20 20v15" opacity="0.6" />
          <path d="M20 14l5 3v6l-5 3-5-3v-6z" stroke="#e2559f" />
        </g>
      )}
      {index === 3 && (
        <g {...common}>
          <rect x="5" y="4" width="20" height="26" rx="2.5" opacity="0.45" />
          <rect x="10" y="9" width="22" height="27" rx="2.5" fill="#160a1d" />
          <path d="M14 15h12M14 19.5h9" />
          <rect x="14" y="26" width="10" height="4" rx="2" fill="#e2559f" stroke="#e2559f" />
        </g>
      )}
      {index === 4 && (
        <g {...common}>
          <path d="M8 26c0-9 6-16 13-16 6 0 10 4 10 9 0 6-5 8-8 6s-1-7 3-6" />
          <path d="M8 26c2 5 7 8 13 8" opacity="0.6" />
          <circle cx="30" cy="31" r="3" fill="#e2559f" stroke="#e2559f" />
        </g>
      )}
    </svg>
  );
}
