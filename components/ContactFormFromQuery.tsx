"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "./ContactForm";
import { services } from "@/lib/services";

export default function ContactFormFromQuery() {
  const q = useSearchParams().get("service") ?? "";
  const valid = services.some((s) => s.slug === q) ? q : "";
  return <ContactForm key={valid} defaultService={valid} />;
}
