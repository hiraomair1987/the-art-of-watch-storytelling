"use client";

import { useId, useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = { kind: "idle" | "sending" | "sent" | "mailto" | "error"; text?: string };

export default function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("website") ?? "");

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "Please add your email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email address doesn’t look quite right.";
    if (!message) next.message = "A sentence or two about your goals helps us prepare.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (honeypot) return setStatus({ kind: "sent" });

    const serviceName = services.find((s) => s.slug === service)?.name ?? "Not sure yet";

    if (site.formEndpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, company, service: serviceName, message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus({ kind: "sent" });
      } catch {
        setStatus({
          kind: "error",
          text: `Something went wrong sending your message. Please try again, or email us at ${site.contactEmail}.`,
        });
      }
      return;
    }

    const subject = `New enquiry: ${serviceName} — ${name}`;
    const body = [message, "", `Name: ${name}`, `Email: ${email}`, company && `Company: ${company}`, `Interested in: ${serviceName}`]
      .filter((l) => l !== "")
      .join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "mailto" });
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-2 text-sm text-magenta-soft">
        {errors[k]}
      </p>
    ) : null;

  if (status.kind === "sent") {
    return (
      <div className="glass p-8 text-center sm:p-10" role="status">
        <p className="display text-3xl">Thank you.</p>
        <p className="mt-3 text-cream-muted">Your message is on its way. We’ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass grid gap-5 p-6 sm:grid-cols-2 sm:p-8" aria-describedby={`${id}-note`}>
      <div>
        <label htmlFor={`${id}-name`} className="label">
          Name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          className="field"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="label">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="field"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor={`${id}-company`} className="label">
          Company <span className="font-normal text-cream-dim">(optional)</span>
        </label>
        <input id={`${id}-company`} name="company" autoComplete="organization" className="field" />
      </div>
      <div>
        <label htmlFor={`${id}-service`} className="label">
          I’m interested in
        </label>
        <div className="relative">
          <select id={`${id}-service`} name="service" defaultValue={defaultService} className="field appearance-none pr-10">
            <option value="" className="bg-plum-900">
              Not sure yet
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} className="bg-plum-900">
                {s.name}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-cream-dim" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className="label">
          What would you like to achieve?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          className="field resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
        />
        {err("message")}
      </div>

      {/* Spam trap: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="text-sm text-cream-dim">
          Prefer email? Write to{" "}
          <a href={`mailto:${site.contactEmail}`} className="link">
            {site.contactEmail}
          </a>
        </p>
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
      <p className="text-sm sm:col-span-2" role="status" aria-live="polite">
        {status.kind === "mailto" && <span className="text-cream-muted">Your email app should now be open with your message ready to send.</span>}
        {status.kind === "error" && <span className="text-magenta-soft">{status.text}</span>}
      </p>
    </form>
  );
}
