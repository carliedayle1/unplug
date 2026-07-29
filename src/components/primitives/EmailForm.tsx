"use client";

import { useId, useState } from "react";
import { Button } from "./Button";
import { PRINTABLE } from "@/content/unplug";

/* Email capture for the free printable.
   ─────────────────────────────────────────────────────────────
   Validation messages are the mockup's, verbatim. The status line is
   aria-live so a screen-reader user hears the result without having
   to hunt for it.

   Client-side validation runs first so the common typo never costs a
   round trip; the route handler validates again regardless. */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Status = "idle" | "sending" | "sent" | "error";

export function EmailForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>(PRINTABLE.idle);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus("error");
      setMessage(PRINTABLE.empty);
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage(PRINTABLE.invalid);
      return;
    }

    setStatus("sending");
    setMessage("Sending…");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setMessage(PRINTABLE.sent(value));
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(PRINTABLE.failed);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4.5 flex flex-col gap-2.5" noValidate>
      <label htmlFor={id} className="text-[18px] font-black">
        {PRINTABLE.emailLabel}
      </label>
      <input
        id={id}
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== "idle") {
            setStatus("idle");
            setMessage(PRINTABLE.idle);
          }
        }}
        placeholder={PRINTABLE.placeholder}
        aria-describedby={`${id}-status`}
        aria-invalid={status === "error"}
        className="box-border h-14 rounded-md border-3 border-ink-navy bg-cream px-4.5 text-[18px] font-bold text-ink-navy placeholder:text-ink-muted placeholder:font-semibold"
      />
      <Button type="submit" size="block" pop="red" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : PRINTABLE.submit}
      </Button>
      <div
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="text-[17px] font-bold text-ink-muted"
      >
        {message}
      </div>
    </form>
  );
}
