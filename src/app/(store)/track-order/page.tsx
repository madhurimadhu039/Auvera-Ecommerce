"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Truck,
  Search,
  CheckCircle,
  Clock,
  Package,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  PhoneCall,
  FileText,
} from "lucide-react";
import { useAuth, INITIAL_ORDERS } from "@/context/AuthContext";
import { formatPrice } from "@/utils/currency";
import type { CustomerOrder } from "@/types/store";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryParamId = searchParams.get("id") || "";

  const { orders: userOrders, isAuthenticated } = useAuth();

  // Combine user orders with default demo orders so any known order is instantly trackable
  const allKnownOrders = useMemo(() => {
    const map = new Map<string, CustomerOrder>();
    INITIAL_ORDERS.forEach((o) => map.set(o.id.toLowerCase(), o));
    userOrders.forEach((o) => map.set(o.id.toLowerCase(), o));
    return Array.from(map.values());
  }, [userOrders]);

  const [orderQuery, setOrderQuery] = useState(queryParamId || "AUV-2026-9041");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Auto-track if query param passed or set default on initial load
  useEffect(() => {
    const targetId = (queryParamId || "AUV-2026-9041").trim().toLowerCase();
    const found = allKnownOrders.find(
      (o) =>
        o.id.toLowerCase() === targetId ||
        o.trackingNumber.toLowerCase() === targetId
    );
    if (found) {
      setSelectedOrder(found);
      setOrderQuery(found.id);
    }
  }, [queryParamId, allKnownOrders]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchError(null);

    const q = orderQuery.trim().toLowerCase();
    if (!q) {
      setSearchError("Please enter your Order ID or Courier Consignment Number.");
      setSelectedOrder(null);
      return;
    }

    const matched = allKnownOrders.find(
      (o) =>
        o.id.toLowerCase() === q ||
        o.trackingNumber.toLowerCase() === q ||
        o.id.toLowerCase().includes(q) ||
        o.trackingNumber.toLowerCase().includes(q)
    );

    if (matched) {
      setSelectedOrder(matched);
      setSearchError(null);
    } else {
      setSelectedOrder(null);
      setSearchError(`No consignment found matching "${orderQuery}". Please check your order ID format (e.g. AUV-2026-XXXX) or try the sample orders below.`);
    }
  };

  const handleSelectSample = (orderId: string) => {
    setOrderQuery(orderId);
    setSearchError(null);
    const found = allKnownOrders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
    if (found) {
      setSelectedOrder(found);
      setHasSearched(true);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/60" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-emerald">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-emerald">Track Order</span>
      </nav>

      {/* Hero Header */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold tracking-widest text-gold-dark uppercase">
          <Truck size={12} />
          <span>Concierge Courier Tracking</span>
        </span>
        <h1 className="mt-3 font-serif text-3xl font-medium text-emerald sm:text-5xl">
          Track Your Bespoke Order
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink/70 sm:text-sm">
          Enter your AUVERA Order ID or Courier Consignment Number to monitor real-time consignment progression,
          departure points, and estimated residence arrival.
        </p>
      </div>

      {/* Search Console Card */}
      <div className="mx-auto max-w-3xl rounded-3xl border border-gold/30 bg-white p-6 shadow-xl sm:p-8">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                Order ID / Consignment Number
              </label>
              <div className="relative mt-1.5">
                <input
                  type="text"
                  required
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. AUV-2026-9041 or DEL-IND-8849201"
                  className="w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3.5 pr-10 text-xs font-semibold uppercase tracking-wider text-ink outline-none transition focus:border-emerald focus:bg-white"
                />
                <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                Email / Mobile (Optional)
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="patron@domain.com or +91"
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3.5 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Quick Demo Test Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-medium text-ink/50">Quick Test:</span>
              <button
                type="button"
                onClick={() => handleSelectSample("AUV-2026-9041")}
                className="rounded-full border border-gold/40 bg-gold/5 px-2.5 py-1 text-[11px] font-semibold text-gold-dark hover:bg-gold/15 transition"
              >
                AUV-2026-9041 (Delivered)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample("AUV-2026-8812")}
                className="rounded-full border border-gold/40 bg-gold/5 px-2.5 py-1 text-[11px] font-semibold text-gold-dark hover:bg-gold/15 transition"
              >
                AUV-2026-8812 (Dispatched)
              </button>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-8 py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition hover:bg-emerald-700 hover:shadow-lg"
            >
              <span>Track Consignment</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {searchError && (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 animate-in fade-in">
            {searchError}
          </div>
        )}
      </div>

      {/* Logged-In User Quick Order Selector */}
      {isAuthenticated && userOrders.length > 0 && (
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gold/20 bg-[#FAF8F5] p-4 text-xs">
          <div className="flex items-center justify-between border-b border-gold/15 pb-2.5">
            <span className="font-bold text-ink uppercase tracking-wider">Your Recent Orders</span>
            <Link href="/account" className="text-emerald hover:underline font-semibold">
              View All in Account →
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {userOrders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => handleSelectSample(ord.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 transition ${
                  selectedOrder?.id === ord.id
                    ? "border-emerald bg-emerald text-ivory font-bold shadow-sm"
                    : "border-gold/30 bg-white text-ink/75 hover:border-gold hover:text-emerald"
                }`}
              >
                <Package size={13} />
                <span>{ord.id}</span>
                <span className="text-[10px] opacity-75">({ord.status})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TRACKING RESULTS DISPLAY
         ========================================================================= */}
      {selectedOrder && (
        <div className="mx-auto mt-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
          {/* 1. Status Highlight Card */}
          <div className="overflow-hidden rounded-3xl bg-emerald p-6 text-ivory shadow-lg sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-emerald-700/60 pb-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
                  Consignment Status
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                    {selectedOrder.status}
                  </h2>
                  <span className="rounded-full bg-gold/20 px-3 py-0.5 text-xs font-bold text-gold">
                    Live
                  </span>
                </div>
                <p className="mt-2 text-xs text-ivory/80">
                  Estimated Arrival: <strong className="text-ivory">{selectedOrder.estimatedDelivery}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
                  Air Waybill / Consignment #
                </span>
                <p className="mt-1 font-mono text-base font-bold text-ivory">
                  {selectedOrder.trackingNumber}
                </p>
                <p className="text-[11px] text-ivory/70">BlueDart Priority Luxury Air Express</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-ivory/60">Order Reference:</span>{" "}
                <span className="font-bold text-ivory">{selectedOrder.id}</span>
              </div>
              <div>
                <span className="text-ivory/60">Booking Date:</span>{" "}
                <span className="font-bold text-ivory">{selectedOrder.date}</span>
              </div>
              <div>
                <span className="text-ivory/60">Payment Mode:</span>{" "}
                <span className="font-bold text-ivory">{selectedOrder.paymentMethod}</span>
              </div>
              <div>
                <span className="text-ivory/60">Consignment Value:</span>{" "}
                <span className="font-bold text-gold">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* 2. Visual Stepper Timeline */}
          <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-gold/15 pb-4">
              <h3 className="font-serif text-xl font-bold text-ink">Consignment Progression</h3>
              <p className="mt-1 text-xs text-ink/60">Detailed transit logs verified with courier hub.</p>
            </div>

            <div className="mt-8 space-y-8">
              {selectedOrder.trackingSteps.map((step, idx) => {
                const isLast = idx === selectedOrder.trackingSteps.length - 1;
                return (
                  <div key={idx} className="relative flex gap-5">
                    {/* Connecting line */}
                    {!isLast && (
                      <div
                        className={`absolute left-4 top-8 -bottom-5 w-0.5 ${
                          step.completed ? "bg-emerald" : "bg-ink/15"
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-all ${
                        step.completed
                          ? "bg-emerald text-ivory shadow-md ring-4 ring-emerald/10"
                          : step.current
                          ? "border-2 border-emerald bg-emerald/10 text-emerald animate-pulse ring-4 ring-emerald/15"
                          : "border border-ink/20 bg-white text-ink/40"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle size={16} />
                      ) : step.current ? (
                        <Clock size={16} />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 pb-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4
                          className={`text-sm font-bold ${
                            step.completed
                              ? "text-emerald"
                              : step.current
                              ? "text-emerald font-extrabold"
                              : "text-ink/60"
                          }`}
                        >
                          {step.title}
                          {step.current && (
                            <span className="ml-2 rounded bg-emerald/10 px-2 py-0.5 text-[9px] font-bold text-emerald uppercase">
                              In Progress
                            </span>
                          )}
                        </h4>
                        <span className="font-mono text-xs text-ink/50">{step.date}</span>
                      </div>
                      <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Package Items & Destination Grid */}
          <div className="grid gap-8 md:grid-cols-12">
            {/* Package Contents (7 cols) */}
            <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8 md:col-span-7">
              <h3 className="font-serif text-xl font-bold text-ink">Package Contents</h3>
              <p className="mt-1 text-xs text-ink/60">
                {selectedOrder.items.length} {selectedOrder.items.length === 1 ? "creation" : "creations"} in this consignment.
              </p>

              <div className="mt-6 space-y-4">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-gold/15 p-3.5 transition hover:border-gold/40"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#FAF8F5]">
                        <Image
                          src={item.product.image || item.product.images?.[0] || "/images/cat-fashion.jpg"}
                          alt={item.product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold tracking-wider text-gold-dark uppercase">
                          {item.product.brand}
                        </span>
                        <Link href={`/product/${item.product.slug}`} className="block">
                          <h4 className="line-clamp-1 text-xs font-semibold text-ink transition hover:text-emerald">
                            {item.product.name}
                          </h4>
                        </Link>
                        <p className="text-[11px] text-ink/50">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-ink">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Concierge (5 cols) */}
            <div className="space-y-6 md:col-span-5">
              {/* Destination Card */}
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
                  <MapPin size={15} className="text-emerald" />
                  <span>Delivery Destination</span>
                </div>
                <div className="mt-4 text-xs text-ink/80 leading-relaxed">
                  <p className="font-bold text-ink text-sm">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="mt-1">{selectedOrder.shippingAddress.street}</p>
                  {selectedOrder.shippingAddress.apartment && (
                    <p>{selectedOrder.shippingAddress.apartment}</p>
                  )}
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} —{" "}
                    {selectedOrder.shippingAddress.postalCode}
                  </p>
                  <p className="mt-2 font-medium text-ink/60">Phone: {selectedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Concierge Assistance */}
              <div className="rounded-3xl border border-gold/20 bg-[#FAF8F5] p-6 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  <span>Boutique Guarantee</span>
                </div>
                <p className="mt-2 text-ink/70 leading-relaxed">
                  Every AUVERA shipment is insured against transit damage and dispatched via dedicated climate-controlled couriers.
                </p>
                <div className="mt-4 flex flex-col gap-2 border-t border-gold/15 pt-3">
                  <a
                    href="mailto:concierge@auvera.com"
                    className="flex items-center gap-2 font-semibold text-emerald hover:text-gold-dark transition"
                  >
                    <PhoneCall size={13} />
                    <span>Contact Dedicated Concierge</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">
          <Truck size={36} className="mx-auto text-gold animate-bounce" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink/60">
            Loading Concierge Tracking…
          </p>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
