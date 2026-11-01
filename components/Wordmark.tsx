import LogoMark from "./LogoMark";

export default function Wordmark({ className = "", mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] font-display tracking-tight ${className}`}>
      {mark && <LogoMark className="logo-mark h-[1.25em] w-[1.25em] shrink-0" />}
      <span>
        efficio<span className="text-accent">virtual</span>
      </span>
    </span>
  );
}
