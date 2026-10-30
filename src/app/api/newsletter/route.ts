import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { newsletterSchema } from "@/schemas/newsletter";
import { adminDb } from "@/firebase/admin";

export async function POST(req: Request) {
  const parsed = newsletterSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  const email = parsed.data.email.toLowerCase();
  const id = createHash("sha256").update(email).digest("hex").slice(0, 32);
  // TODO: add rate limiting (docs/PHASES.md, Phase 8)
  try {
    await adminDb.collection("newsletterSubscribers").doc(id).set({ email, subscribedAt: FieldValue.serverTimestamp() }, { merge: true });
  } catch { return NextResponse.json({ error: "Server not configured" }, { status: 503 }); }
  return NextResponse.json({ ok: true });
}
