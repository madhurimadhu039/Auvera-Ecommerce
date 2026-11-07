"use client";
import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("loading");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(r.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-10">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0B3B2C] p-6 sm:p-10 md:p-12 text-white shadow-xl">
        {/* Subtle decorative leaf background glow */}
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#E5C378]/10 blur-3xl" />

        <div className="relative grid items-center gap-6 sm:gap-8 md:grid-cols-12">
          {/* Left content */}
          <div className="flex items-center gap-4 sm:gap-6 md:col-span-7">
            <span className="grid h-16 w-16 sm:h-20 sm:w-20 shrink-0 place-items-center rounded-full bg-white text-[#0B3B2C] shadow-md">
              <Mail size={28} className="sm:hidden" strokeWidth={1.5} />
              <Mail size={34} className="hidden sm:block" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Stay in the Loop
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                Get exclusive deals, new arrivals and style inspiration straight to your inbox.
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <form onSubmit={submit} className="flex items-center rounded-full bg-white p-1 sm:p-1.5 shadow-md">
              <label htmlFor="nl" className="sr-only">Email address</label>
              <input
                id="nl"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="rounded-full bg-[#E4EAE1] hover:bg-[#D5DFD1] px-5 sm:px-6 py-2.5 text-xs font-semibold text-[#0B3B2C] transition shrink-0 active:scale-95 disabled:opacity-50"
              >
                {state === "loading" ? "…" : "Subscribe"}
              </button>
            </form>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-white/70">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>We respect your privacy. Unsubscribe anytime.</span>
            </div>

            {state === "ok" && (
              <p role="status" className="mt-2 text-xs text-[#E5C378] font-medium">
                Thank you — you&apos;re subscribed.
              </p>
            )}
            {state === "err" && (
              <p role="alert" className="mt-2 text-xs text-red-300">
                Could not subscribe. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
