import { NextResponse } from "next/server";

/* Email capture for the free printable.
   ─────────────────────────────────────────────────────────────
   Validates, logs, and returns success. One integration point.

   The promise on the page is "One checklist, one email. Nothing else,
   ever." — whatever provider goes in below must honour that: a single
   transactional send, no drip sequence, no list-building by default.

   Note the site also offers the PDF with no email at all, and that
   escape hatch is load-bearing for trust. Don't remove it to improve
   this endpoint's conversion rate. */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Redact the local part before logging — server logs are not a
    mailing list, and the address is the user's, not ours. */
function redact(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "<invalid>";
  const head = local.slice(0, 1);
  return `${head}${"*".repeat(Math.max(1, local.length - 1))}@${domain}`;
}

export async function POST(request: Request) {
  let email: unknown;

  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "That address looks unfinished." }, { status: 422 });
  }

  const address = email.trim().toLowerCase();

  // TODO(provider): send "Ten to start with" and record the subscriber.
  // Drop in Resend / Buttondown / Mailchimp here. Keep it to ONE email
  // — the page promises no series, and that promise is the reason the
  // form converts at all.
  //
  //   await resend.emails.send({
  //     from: "wanda@unplugbook.example",
  //     to: address,
  //     subject: "Ten to start with",
  //     attachments: [{ filename: "ten-to-start-with.pdf", path: PDF_URL }],
  //   });
  console.info(`[subscribe] queued checklist for ${redact(address)}`);

  return NextResponse.json({ ok: true });
}
