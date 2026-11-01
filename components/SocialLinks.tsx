import { socials } from "@/lib/site";

const icons: Record<string, JSX.Element> = {
  Instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.1-9.4a1.2 1.2 0 1 0 0 2.3 1.2 1.2 0 0 0 0-2.3Z" />
  ),
  Facebook: (
    <path d="M13.5 21.9v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6v3.2h2.7v8a10 10 0 1 1 3.2 0Z" />
  ),
  LinkedIn: (
    <path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6ZM8 19H5V9.5h3V19ZM6.5 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5S12.7 13 12.7 14.3V19h-3V9.5h2.8v1.3h.1c.4-.7 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V19Z" />
  ),
  X: <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />,
};

/** Icon links to every social profile. `size` controls the round button size. */
export default function SocialLinks({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="efficiovirtual on social media">
      {socials.map((s) => (
        <li key={s.name}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className={`social-link ${size === "lg" ? "h-12 w-12" : "h-10 w-10"}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]"} fill="currentColor">
              {icons[s.name]}
            </svg>
            <span className="sr-only">
              {s.name} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
