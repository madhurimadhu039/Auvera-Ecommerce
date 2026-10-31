"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ChevronRight,
  ArrowRight,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/currency";
import type { CustomerOrder } from "@/types/store";

export default function CheckoutPage() {
  const { items, subtotal, shipping, discount, tax, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  // Step states
  const [shippingName, setShippingName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [shippingEmail, setShippingEmail] = useState(user?.email || "");
  const [shippingPhone, setShippingPhone] = useState(user?.phone || "+91 ");
  const [shippingStreet, setShippingStreet] = useState(user?.addresses[0]?.street || "");
  const [shippingCity, setShippingCity] = useState(user?.addresses[0]?.city || "Mumbai");
  const [shippingState, setShippingState] = useState(user?.addresses[0]?.state || "Maharashtra");
  const [shippingPostal, setShippingPostal] = useState(user?.addresses[0]?.postalCode || "400026");

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "cod">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200)); // Luxury confirmation delay

    const orderId = `AUV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: "Confirmed",
      subtotal,
      discount,
      shipping,
      tax,
      total,
      paymentMethod:
        paymentMethod === "upi"
          ? "UPI (Instant App / QR)"
          : paymentMethod === "card"
          ? "Credit / Debit Card (Razorpay)"
          : paymentMethod === "netbanking"
          ? "Net Banking (HDFC / ICICI)"
          : "Cash on Delivery",
      trackingNumber: `EXP-IND-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: "3 - 5 Business Days",
      shippingAddress: {
        id: `addr_${Date.now()}`,
        title: "Order Address",
        fullName: shippingName,
        phone: shippingPhone,
        street: shippingStreet,
        city: shippingCity,
        state: shippingState,
        postalCode: shippingPostal,
        country: "India",
      },
      items: items.map((i, idx) => ({
        id: `item_${idx}_${Date.now()}`,
        product: i.product,
        quantity: i.quantity,
        price: i.product.price,
      })),
      trackingSteps: [
        {
          title: "Order Placed",
          description: "Your order has been recorded in the AUVERA register",
          date: "Just now",
          completed: true,
        },
        {
          title: "Boutique Quality Check",
          description: "Curated by master inspectors",
          date: "Scheduled today",
          completed: false,
          current: true,
        },
        {
          title: "Dispatched with Insured Courier",
          description: "Priority air dispatch",
          date: "Pending",
          completed: false,
        },
        {
          title: "Delivered",
          description: "Delivered to your residence",
          date: "Estimated 3-5 days",
          completed: false,
        },
      ],
    };

    addOrder(newOrder);
    clearCart();
    setConfirmedOrder(newOrder);
    setIsProcessing(false);
  };

  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-gold/30 bg-white p-8 shadow-xl sm:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald/10 text-emerald">
            <CheckCircle size={44} />
          </div>

          <span className="mt-6 inline-block text-xs font-bold tracking-widest text-gold-dark uppercase">
            Order Confirmed & Secured
          </span>
          <h1 className="mt-2 font-serif text-3xl font-medium text-emerald sm:text-5xl">
            Thank You for Your Patronage
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink/70 sm:text-sm">
            Your acquisition has been confirmed. A formal invoice and priority dispatch details have been
            dispatched to your contact details.
          </p>

          <div className="mt-8 rounded-2xl bg-[#FAF8F5] p-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/15 pb-4">
              <div>
                <span className="text-[10px] font-bold text-ink/50 uppercase">Order ID</span>
                <p className="text-base font-bold text-emerald">{confirmedOrder.id}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-ink/50 uppercase">Consignment Tracking</span>
                <p className="text-xs font-mono font-bold text-ink">{confirmedOrder.trackingNumber}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-ink/50 uppercase">Total Paid</span>
                <p className="text-base font-bold text-ink">{formatPrice(confirmedOrder.total)}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-bold text-ink/50 uppercase">Shipping Destination</span>
              <p className="mt-1 text-xs text-ink/80">
                {confirmedOrder.shippingAddress.fullName} — {confirmedOrder.shippingAddress.street},{" "}
                {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state}{" "}
                {confirmedOrder.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/account"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-8 py-3.5 text-xs font-semibold tracking-wider text-ivory uppercase shadow-md hover:bg-emerald-700 transition"
            >
              <span>Track in Account Dashboard</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald px-8 py-3.5 text-xs font-semibold tracking-wider text-emerald uppercase hover:bg-emerald hover:text-ivory transition"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <Package size={40} className="mx-auto text-gold" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-ink">No items in checkout</h2>
        <p className="mt-2 text-xs text-ink/60">Please add items to your shopping bag before proceeding.</p>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-emerald px-6 py-2.5 text-xs text-ivory uppercase font-semibold">
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/60" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-emerald">Home</Link>
        <ChevronRight size={12} />
        <Link href="/cart" className="hover:text-emerald">Shopping Bag</Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-emerald">Express Checkout</span>
      </nav>

      <div className="mb-8 border-b border-gold/15 pb-4">
        <h1 className="font-serif text-3xl font-medium text-emerald sm:text-4xl">Secure Checkout</h1>
        <p className="mt-1 text-xs text-ink/60">Complimentary priority delivery & authenticity protection.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid gap-10 lg:grid-cols-12">
        {/* Left Column: Delivery & Payment Details (7 cols) */}
        <div className="space-y-8 lg:col-span-7">
          {/* 1. Shipping Address */}
          <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald text-xs text-ivory">1</span>
              <span>Delivery Address</span>
            </h2>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink/70 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  placeholder="Aarav Singhania"
                  className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingEmail}
                    onChange={(e) => setShippingEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 uppercase">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="+91 98200 45890"
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink/70 uppercase">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  placeholder="Flat / Villa / Street Name"
                  className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 uppercase">State</label>
                  <input
                    type="text"
                    required
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 uppercase">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={shippingPostal}
                    onChange={(e) => setShippingPostal(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 outline-none focus:border-emerald"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald text-xs text-ivory">2</span>
              <span>Payment Selection</span>
            </h2>

            <div className="mt-5 space-y-3">
              {[
                {
                  id: "upi",
                  label: "UPI Instant Payment (GPay, PhonePe, Paytm, BHIM)",
                  desc: "Scan QR or approve instant collect request",
                  icon: QrCode,
                },
                {
                  id: "card",
                  label: "Credit / Debit Card (Visa, MasterCard, Amex)",
                  desc: "Secured with 256-bit bank encryption",
                  icon: CreditCard,
                },
                {
                  id: "netbanking",
                  label: "Net Banking",
                  desc: "All major Indian scheduled banks",
                  icon: Building2,
                },
                {
                  id: "cod",
                  label: "Cash / Card on Delivery",
                  desc: "Pay securely to our priority courier upon arrival",
                  icon: Banknote,
                },
              ].map((p) => {
                const I = p.icon;
                const isSelected = paymentMethod === p.id;
                return (
                  <label
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as typeof paymentMethod)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      isSelected
                        ? "border-emerald bg-emerald/5 shadow-sm"
                        : "border-gold/20 hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={isSelected}
                        onChange={() => setPaymentMethod(p.id as typeof paymentMethod)}
                        className="accent-emerald"
                      />
                      <div>
                        <p className="text-xs font-bold text-ink">{p.label}</p>
                        <p className="text-[11px] text-ink/60">{p.desc}</p>
                      </div>
                    </div>
                    <I size={20} className={isSelected ? "text-emerald" : "text-ink/40"} />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Placement (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6 rounded-3xl border border-gold/25 bg-white p-6 shadow-md">
            <h2 className="border-b border-gold/15 pb-4 font-serif text-2xl font-medium text-emerald">
              Order Review
            </h2>

            {/* Compact items list */}
            <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#FAF8F5]">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="line-clamp-1 font-semibold text-ink">{product.name}</p>
                      <p className="text-[10px] text-ink/50">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-ink">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-gold/15 pt-4 space-y-2.5 text-xs text-ink/75">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-emerald">
                  {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald font-bold">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink/60">
                <span>GST (18% included)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="border-t border-gold/15 pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-ink">Total Payable</span>
                <span className="text-2xl font-serif font-bold text-emerald">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-full bg-emerald py-4 text-xs font-semibold tracking-widest text-ivory uppercase shadow-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {isProcessing ? "Securing Order…" : `Place Order · ${formatPrice(total)}`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-ink/60">
              <ShieldCheck size={14} className="text-emerald" />
              <span>256-Bit SSL Secured Transaction · Maison AUVERA</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

