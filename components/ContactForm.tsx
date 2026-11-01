"use client";

import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

const topics = [...services.map((s) => s.name), "Not sure yet"];

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[topics.length - 1]);

  // A "Discuss this service" link arrives as /?service=<slug>#contact.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (match) setTopic(match.name);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) return setError("Please add your name, email and a short message.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("That email address doesn’t look quite right.");

    setError(null);
    const body = [message, "", `— ${name}`, email, company && `Company: ${company}`, `Interested in: ${topic}`].filter(Boolean).join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(`New project: ${topic} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby="form-status">
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" autoComplete="name" required placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
      </div>
      <div className="field">
        <label htmlFor="cf-company">
          Company <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <input id="cf-company" name="company" autoComplete="organization" placeholder="Company or website" />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">I’m interested in</label>
        <select id="cf-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="cf-message">What would you like to achieve?</label>
        <textarea id="cf-message" name="message" required rows={5} placeholder="A few lines about your goals, timing and budget." />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Send message
          <span aria-hidden="true">→</span>
        </button>
        <p id="form-status" className="text-sm text-cream-muted" role="status" aria-live="polite">
          {error ? (
            <span className="text-[#ffb3c8]">{error}</span>
          ) : sent ? (
            <>
              Your email app should open with the message ready to send. If it doesn’t, write to{" "}
              <a className="text-link" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
