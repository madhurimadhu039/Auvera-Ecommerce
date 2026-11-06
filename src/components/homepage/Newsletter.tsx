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
    <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid items-center gap-6 sm:gap-8 rounded-2xl sm:rounded-3xl bg-emerald p-6 sm:p-10 md:p-14 text-ivory md:grid-cols-2">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="grid h-14 w-14 sm:h-20 sm:w-20 shrink-0 place-items-center rounded-full border border-gold text-gold">
            <Mail size={22} className="sm:hidden" strokeWidth={1.25} />
            <Mail size={30} className="hidden sm:block" strokeWidth={1.25} />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif">Stay in the Loop</h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-ivory/70">
              Private previews, new arrivals and style inspiration.
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-0">
          <label htmlFor="nl" className="sr-only">Email address</label>
          <input
            id="nl"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-full sm:rounded-l-full sm:rounded-r-none bg-ivory px-4 sm:px-5 py-3 text-xs sm:text-sm text-ink outline-none"
          />
          <button
            className="btn-gold rounded-full sm:rounded-r-full sm:rounded-l-none"
            disabled={state === "loading"}
          >
            {state === "loading" ? "…" : "Subscribe"}
          </button>
        </form>
        {state === "ok" && <p role="status" className="text-xs sm:text-sm text-gold md:col-start-2">Thank you — you’re subscribed.</p>}
        {state === "err" && <p role="alert" className="text-xs sm:text-sm text-red-300 md:col-start-2">Could not subscribe. Please try again.</p>}
      </div>
    </section>
  );
}
