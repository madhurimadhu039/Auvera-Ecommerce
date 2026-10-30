"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("loading");
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setState(r.ok ? "ok" : "err");
    } catch { setState("err"); }
  }
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid items-center gap-8 bg-emerald p-10 text-ivory md:grid-cols-2 md:p-14">
        <div className="flex items-center gap-6">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-gold text-gold"><Mail size={30} strokeWidth={1.25} /></span>
          <div><h2 className="text-3xl">Stay in the Loop</h2><p className="mt-2 text-sm text-ivory/70">Private previews, new arrivals and style inspiration.</p></div>
        </div>
        <form onSubmit={submit} className="flex">
          <label htmlFor="nl" className="sr-only">Email address</label>
          <input id="nl" name="email" type="email" required placeholder="Enter your email address" className="min-w-0 flex-1 bg-ivory px-5 py-3 text-sm text-ink outline-none" />
          <button className="btn-gold" disabled={state === "loading"}>{state === "loading" ? "…" : "Subscribe"}</button>
        </form>
        {state === "ok" && <p role="status" className="text-sm text-gold md:col-start-2">Thank you — you’re subscribed.</p>}
        {state === "err" && <p role="alert" className="text-sm text-red-300 md:col-start-2">Could not subscribe. Please try again.</p>}
      </div>
    </section>
  );
}
