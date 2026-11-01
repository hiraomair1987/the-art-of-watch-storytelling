export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-tight ${className}`}>
      efficio<span className="text-accent">virtual</span>
    </span>
  );
}
