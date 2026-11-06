"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  Truck,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/utils/currency";
import type { UserAddress } from "@/types/store";

type AuthTab = "login" | "register" | "forgot";
type DashboardTab = "profile" | "orders" | "tracking" | "addresses" | "wishlist" | "settings";

export default function AccountPage() {
  const {
    user,
    isAuthenticated,
    isLoading,
    orders,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAuth();

  const { items: wishlistItems } = useWishlist();

  // Guest view states
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  // Logged-in dashboard states
  const [activeTab, setActiveTab] = useState<DashboardTab>("orders");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || "");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFirstName, setEditFirstName] = useState(user?.firstName || "");
  const [editLastName, setEditLastName] = useState(user?.lastName || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Address modal/form states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState("Home");
  const [newAddrName, setNewAddrName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [newAddrPhone, setNewAddrPhone] = useState(user?.phone || "+91 ");
  const [newAddrStreet, setNewAddrStreet] = useState("");
  const [newAddrApt, setNewAddrApt] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("Mumbai");
  const [newAddrState, setNewAddrState] = useState("Maharashtra");
  const [newAddrPostal, setNewAddrPostal] = useState("");

  // Settings form states
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [settingsSaved, setSettingsSaved] = useState(false);

  // 1. Guest Login Handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!loginEmail.trim()) {
      setAuthError("Email address is required.");
      return;
    }
    if (!loginPassword.trim()) {
      setAuthError("Password is required.");
      return;
    }

    setIsSubmitting(true);
    const res = await login(loginEmail, loginPassword, rememberMe);
    setIsSubmitting(false);

    if (!res.success) {
      setAuthError(res.error || "Login failed. Please verify credentials.");
    }
  };

  // 1-Click Demo Login for smooth testing
  const handleDemoLogin = async () => {
    setAuthError(null);
    setIsSubmitting(true);
    await login("aarav.singhania@auvera.com", "AuveraLuxury2026", true);
    setIsSubmitting(false);
  };

  // 2. Guest Registration Handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!regFirstName.trim() || !regLastName.trim()) {
      setAuthError("Please provide both first and last name.");
      return;
    }
    if (!regEmail.trim()) {
      setAuthError("Email address is required.");
      return;
    }
    if (!regPassword) {
      setAuthError("Password is required.");
      return;
    }
    if (regPassword.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setAuthError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSubmitting(true);
    const res = await register(regFirstName, regLastName, regEmail, regPassword);
    setIsSubmitting(false);

    if (!res.success) {
      setAuthError(res.error || "Registration failed.");
    }
  };

  // 3. Forgot Password Handler
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!forgotEmail.trim()) {
      setAuthError("Please provide your registered email address.");
      return;
    }

    setIsSubmitting(true);
    const res = await resetPassword(forgotEmail);
    setIsSubmitting(false);

    if (res.success) {
      setAuthSuccess(`Password reset instructions have been sent to ${forgotEmail}.`);
      setForgotEmail("");
    } else {
      setAuthError(res.error || "Unable to send reset email.");
    }
  };

  // Profile update save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
    });
    setProfileSuccess(true);
    setIsEditingProfile(false);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  // Add address save
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrPostal) return;

    addAddress({
      title: newAddrTitle,
      fullName: newAddrName,
      phone: newAddrPhone,
      street: newAddrStreet,
      apartment: newAddrApt,
      city: newAddrCity,
      state: newAddrState,
      postalCode: newAddrPostal,
      country: "India",
      isDefaultShipping: user?.addresses.length === 0,
      isDefaultBilling: user?.addresses.length === 0,
    });

    setShowAddressModal(false);
    setNewAddrStreet("");
    setNewAddrApt("");
    setNewAddrPostal("");
  };

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/60" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-emerald">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-emerald">
          {user ? "Customer Dashboard" : "Patron Sign In"}
        </span>
      </nav>

      {/* =========================================================================
          SECTION 1: GUEST USER (LOGIN / REGISTER / FORGOT PASSWORD)
         ========================================================================= */}
      {!user ? (
        <div className="mx-auto my-6 max-w-xl">
          <div className="overflow-hidden rounded-3xl border border-gold/30 bg-white p-6 shadow-xl sm:p-10">
            {/* Elegant Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold tracking-widest text-gold-dark uppercase">
                <Sparkles size={12} />
                <span>Maison AUVERA Privé</span>
              </span>
              <h1 className="mt-3 font-serif text-3xl font-medium text-emerald sm:text-4xl">
                Welcome to AUVERA
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-ink/70 sm:text-sm">
                Sign in to your account and enjoy a more personal shopping experience.
              </p>
            </div>

            {/* Auth Mode Tabs */}
            <div className="mt-8 flex rounded-xl border border-gold/20 bg-[#FAF8F5] p-1">
              <button
                type="button"
                onClick={() => {
                  setAuthTab("login");
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`flex-1 rounded-lg py-2.5 text-xs font-semibold tracking-wider uppercase transition ${
                  authTab === "login"
                    ? "bg-emerald text-ivory shadow-sm"
                    : "text-ink/60 hover:text-emerald"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab("register");
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`flex-1 rounded-lg py-2.5 text-xs font-semibold tracking-wider uppercase transition ${
                  authTab === "register"
                    ? "bg-emerald text-ivory shadow-sm"
                    : "text-ink/60 hover:text-emerald"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Feedback Alerts */}
            {authError && (
              <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-700 animate-in fade-in">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald/10 p-3.5 text-xs font-medium text-emerald animate-in fade-in">
                {authSuccess}
              </div>
            )}

            {/* TAB A: SIGN IN FORM */}
            {authTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthTab("forgot");
                        setAuthError(null);
                      }}
                      className="text-[11px] font-semibold text-gold-dark hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 pr-10 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-ink/75">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-emerald"
                    />
                    <span>Remember Me</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-emerald py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Authenticating…" : "Sign In"}
                </button>

                {/* 1-Click Demo Login Button for Rapid Testing */}
                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gold/20" />
                  </div>
                  <span className="relative bg-white px-3 text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                    Or Test Instantly
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-gold/40 bg-gold/5 py-3 text-xs font-semibold tracking-wider text-gold-dark uppercase transition hover:bg-gold/15"
                >
                  Quick Sign In with Demo Patron
                </button>
              </form>
            )}

            {/* TAB B: REGISTRATION FORM */}
            {authTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      placeholder="Aarav"
                      className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      placeholder="Singhania"
                      className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 pr-10 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 pr-10 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-emerald py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Creating Membership…" : "Create Account"}
                </button>

                <p className="text-center text-xs text-ink/60">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthTab("login")}
                    className="font-semibold text-emerald hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* TAB C: FORGOT PASSWORD */}
            {authTab === "forgot" && (
              <form onSubmit={handleForgotSubmit} className="mt-6 space-y-4">
                <p className="text-xs text-ink/70 leading-relaxed">
                  Enter your registered email address below. We will send you instructions to securely reset
                  your account credentials.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs text-ink outline-none transition focus:border-emerald focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-emerald py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Request…" : "Send Reset Instructions"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("login");
                      setAuthError(null);
                      setAuthSuccess(null);
                    }}
                    className="text-xs font-semibold text-emerald hover:underline"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        /* =========================================================================
            SECTION 2: LOGGED-IN CUSTOMER DASHBOARD
           ========================================================================= */
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Sidebar Navigation (4 cols) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm">
              {/* Customer Avatar & Greeting */}
              <div className="border-b border-gold/15 pb-4 lg:pb-6 flex items-center gap-4 text-left lg:flex-col lg:text-center">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-emerald bg-emerald/10 shadow-md lg:mx-auto lg:h-20 lg:w-20">
                  <Image
                    src="/images/avatar-michael.jpg"
                    alt={user.firstName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-ink sm:text-xl lg:text-2xl">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-xs text-ink/60 truncate max-w-[200px] sm:max-w-none">{user.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald">
                    <ShieldCheck size={12} />
                    <span>{user.memberTier}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu Links */}
              <nav className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:mt-6 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0" aria-label="Account Sections">
                {[
                  { id: "orders", label: "My Orders", icon: Package, badge: orders.length },
                  { id: "tracking", label: "Order Tracking", icon: Truck },
                  { id: "profile", label: "My Profile", icon: User },
                  { id: "addresses", label: "My Addresses", icon: MapPin, badge: user.addresses.length },
                  { id: "wishlist", label: "My Wishlist", icon: Heart, badge: wishlistItems.length },
                  { id: "settings", label: "Account Settings", icon: Settings },
                ].map((tab) => {
                  const I = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as DashboardTab)}
                      className={`flex shrink-0 items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wider uppercase transition whitespace-nowrap lg:w-full lg:py-3 ${
                        isActive
                          ? "bg-emerald text-ivory shadow-sm"
                          : "text-ink/75 hover:bg-[#FAF8F5] hover:text-emerald"
                      }`}
                    >
                      <div className="flex items-center gap-2 lg:gap-3">
                        <I size={15} />
                        <span>{tab.label}</span>
                      </div>
                      {Boolean(tab.badge && tab.badge > 0) && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive ? "bg-white/20 text-ivory" : "bg-emerald/10 text-emerald"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Logout Button */}
                <div className="shrink-0 lg:border-t lg:border-gold/15 lg:pt-3">
                  <button
                    onClick={logout}
                    className="flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wider text-rose-600 uppercase transition hover:bg-rose-50 whitespace-nowrap lg:w-full lg:gap-3 lg:py-3"
                  >
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Right Main Content Area (8 cols) */}
          <div className="space-y-6 lg:col-span-8 xl:col-span-9">
            {/* TAB 1: MY ORDERS */}
            {activeTab === "orders" && (
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-gold/15 pb-5">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-emerald">My Orders</h2>
                    <p className="mt-1 text-xs text-ink/60">
                      Review all historic and current bespoke acquisitions.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gold-dark uppercase tracking-wider">
                    {orders.length} Orders
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="rounded-2xl border border-gold/20 p-5 transition hover:border-gold/50 hover:shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/10 pb-4">
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-ink/50 uppercase">
                            Order ID
                          </span>
                          <p className="text-sm font-bold text-emerald">{ord.id}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-ink/50 uppercase">
                            Date Placed
                          </span>
                          <p className="text-xs font-semibold text-ink">{ord.date}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-ink/50 uppercase">
                            Total Amount
                          </span>
                          <p className="text-sm font-bold text-ink">{formatPrice(ord.total)}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-ink/50 uppercase">
                            Status
                          </span>
                          <span className="mt-0.5 block rounded-full bg-emerald/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald uppercase">
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="mt-4 space-y-3">
                        {ord.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#FAF8F5]">
                                <Image
                                  src={item.product.image || item.product.images?.[0] || "/images/cat-fashion.jpg"}
                                  alt={item.product.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-ink">{item.product.name}</p>
                                <p className="text-[11px] text-ink/50">
                                  Qty: {item.quantity} · {item.product.brand}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-ink">{formatPrice(item.price)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gold/10 pt-4">
                        <span className="text-[11px] text-ink/60">
                          Payment: <strong className="text-ink">{ord.paymentMethod}</strong>
                        </span>
                        <button
                          onClick={() => {
                            setSelectedOrderId(ord.id);
                            setActiveTab("tracking");
                          }}
                          className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-4 py-1.5 text-xs font-semibold text-emerald hover:bg-emerald hover:text-ivory transition"
                        >
                          <Truck size={13} />
                          <span>Track Delivery</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: ORDER TRACKING */}
            {activeTab === "tracking" && (
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col justify-between gap-3 border-b border-gold/15 pb-5 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-emerald">Order Tracking</h2>
                    <p className="mt-1 text-xs text-ink/60">
                      Live status and courier progression for your shipment.
                    </p>
                  </div>
                  {orders.length > 1 && (
                    <select
                      value={selectedOrder.id}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      className="rounded-lg border border-gold/30 bg-[#FAF8F5] p-2 text-xs font-semibold text-ink outline-none"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.id} ({o.status})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Tracking Header Card */}
                <div className="mt-6 rounded-2xl bg-emerald p-6 text-ivory">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
                        Current Status
                      </span>
                      <h3 className="mt-1 font-serif text-2xl">{selectedOrder.status}</h3>
                      <p className="mt-1 text-xs text-ivory/80">
                        Estimated Arrival: {selectedOrder.estimatedDelivery}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
                        Consignment Tracking #
                      </span>
                      <p className="mt-1 font-mono text-sm font-bold text-ivory">
                        {selectedOrder.trackingNumber}
                      </p>
                      <span className="text-[10px] text-ivory/60">BlueDart Priority Luxury Air</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Progression */}
                <div className="mt-8 space-y-6">
                  {selectedOrder.trackingSteps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-4">
                      {/* Vertical line connecting steps */}
                      {idx !== selectedOrder.trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-8 -bottom-4 w-0.5 ${
                            step.completed ? "bg-emerald" : "bg-ink/15"
                          }`}
                        />
                      )}

                      <div
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all ${
                          step.completed
                            ? "bg-emerald text-ivory shadow-sm ring-4 ring-emerald/10"
                            : "border border-ink/20 bg-white text-ink/40"
                        }`}
                      >
                        {step.completed ? <CheckCircle size={14} /> : idx + 1}
                      </div>

                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-xs font-bold sm:text-sm ${
                              step.completed ? "text-emerald" : "text-ink/50"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-[10px] text-ink/50">{step.date}</span>
                        </div>
                        <p className="mt-1 text-xs text-ink/70">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="mt-6 rounded-xl border border-gold/20 bg-[#FAF8F5] p-4 text-xs">
                  <span className="font-bold text-ink uppercase tracking-wider">Destination:</span>
                  <p className="mt-1 text-ink/80">
                    {selectedOrder.shippingAddress.fullName} — {selectedOrder.shippingAddress.street},{" "}
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: MY PROFILE */}
            {activeTab === "profile" && (
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-gold/15 pb-5">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-emerald">My Profile</h2>
                    <p className="mt-1 text-xs text-ink/60">
                      Manage your personal patron credentials and preferences.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-white px-4 py-2 text-xs font-semibold text-emerald transition hover:bg-emerald hover:text-ivory"
                  >
                    <Edit2 size={13} />
                    <span>{isEditingProfile ? "Cancel" : "Edit Profile"}</span>
                  </button>
                </div>

                {profileSuccess && (
                  <div className="mt-4 rounded-xl bg-emerald/10 p-3 text-xs font-semibold text-emerald">
                    Profile information updated successfully.
                  </div>
                )}

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink/70 uppercase">First Name</label>
                        <input
                          type="text"
                          value={editFirstName}
                          onChange={(e) => setEditFirstName(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs outline-none focus:border-emerald"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink/70 uppercase">Last Name</label>
                        <input
                          type="text"
                          value={editLastName}
                          onChange={(e) => setEditLastName(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs outline-none focus:border-emerald"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink/70 uppercase">Phone Number</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs outline-none focus:border-emerald"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-emerald px-6 py-2.5 text-xs font-semibold tracking-wider text-ivory uppercase shadow transition hover:bg-emerald-700"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gold/15 bg-[#FAF8F5] p-4.5">
                      <span className="text-[10px] font-bold uppercase text-ink/50">Full Name</span>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gold/15 bg-[#FAF8F5] p-4.5">
                      <span className="text-[10px] font-bold uppercase text-ink/50">Email Address</span>
                      <p className="mt-1 text-sm font-semibold text-ink">{user.email}</p>
                    </div>
                    <div className="rounded-2xl border border-gold/15 bg-[#FAF8F5] p-4.5">
                      <span className="text-[10px] font-bold uppercase text-ink/50">Phone Number</span>
                      <p className="mt-1 text-sm font-semibold text-ink">{user.phone || "Not specified"}</p>
                    </div>
                    <div className="rounded-2xl border border-gold/15 bg-[#FAF8F5] p-4.5">
                      <span className="text-[10px] font-bold uppercase text-ink/50">Membership Tier</span>
                      <p className="mt-1 text-sm font-semibold text-emerald">{user.memberTier}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: MY ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-gold/15 pb-5">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-emerald">My Addresses</h2>
                    <p className="mt-1 text-xs text-ink/60">
                      Manage default shipping destinations and billing residences.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2 text-xs font-semibold tracking-wider text-ivory uppercase shadow transition hover:bg-emerald-700"
                  >
                    <Plus size={13} />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* Addresses Grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="flex flex-col justify-between rounded-2xl border border-gold/20 p-5 transition hover:border-gold"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold-dark uppercase tracking-wider">
                            {addr.title}
                          </span>
                          {addr.isDefaultShipping && (
                            <span className="text-[10px] font-bold text-emerald uppercase">
                              ★ Default Shipping
                            </span>
                          )}
                        </div>
                        <h4 className="mt-3 text-sm font-bold text-ink">{addr.fullName}</h4>
                        <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                          {addr.street} {addr.apartment && `, ${addr.apartment}`}
                          <br />
                          {addr.city}, {addr.state} — {addr.postalCode}
                          <br />
                          {addr.country}
                        </p>
                        <p className="mt-2 text-xs font-medium text-ink/60">Phone: {addr.phone}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gold/10 pt-3 text-xs">
                        {!addr.isDefaultShipping && (
                          <button
                            onClick={() => setDefaultAddress(addr.id, "shipping")}
                            className="text-[11px] font-semibold text-emerald hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="ml-auto text-ink/40 hover:text-rose-600 transition"
                          title="Delete address"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Address Inline Form / Modal */}
                {showAddressModal && (
                  <div className="mt-8 rounded-2xl border border-emerald/30 bg-[#FAF8F5] p-6 animate-in fade-in">
                    <h3 className="font-serif text-lg font-bold text-emerald">Add New Address</h3>
                    <form onSubmit={handleSaveAddress} className="mt-4 space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-ink/70">Address Tag</label>
                          <input
                            type="text"
                            required
                            value={newAddrTitle}
                            onChange={(e) => setNewAddrTitle(e.target.value)}
                            placeholder="Home, Office, Atelier"
                            className="mt-1 w-full rounded-xl border border-gold/30 bg-white p-2.5 text-xs outline-none focus:border-emerald"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-ink/70">Full Name</label>
                          <input
                            type="text"
                            required
                            value={newAddrName}
                            onChange={(e) => setNewAddrName(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gold/30 bg-white p-2.5 text-xs outline-none focus:border-emerald"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase text-ink/70">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddrStreet}
                          onChange={(e) => setNewAddrStreet(e.target.value)}
                          placeholder="House / Building / Street"
                          className="mt-1 w-full rounded-xl border border-gold/30 bg-white p-2.5 text-xs outline-none focus:border-emerald"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-ink/70">City</label>
                          <input
                            type="text"
                            required
                            value={newAddrCity}
                            onChange={(e) => setNewAddrCity(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gold/30 bg-white p-2.5 text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-ink/70">State</label>
                          <input
                            type="text"
                            required
                            value={newAddrState}
                            onChange={(e) => setNewAddrState(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gold/30 bg-white p-2.5 text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-ink/70">PIN Code</label>
                          <input
                            type="text"
                            required
                            value={newAddrPostal}
                            onChange={(e) => setNewAddrPostal(e.target.value)}
                            placeholder="400001"
                            className="mt-1 w-full rounded-xl border border-gold/30 bg-white p-2.5 text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="rounded-full bg-emerald px-6 py-2.5 text-xs font-semibold tracking-wider text-ivory uppercase shadow"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddressModal(false)}
                          className="text-xs font-medium text-ink/60 hover:text-ink"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: MY WISHLIST PREVIEW */}
            {activeTab === "wishlist" && (
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-gold/15 pb-5">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-emerald">Saved Creations</h2>
                    <p className="mt-1 text-xs text-ink/60">
                      {wishlistItems.length} pieces curated in your private wishlist.
                    </p>
                  </div>
                  <Link
                    href="/wishlist"
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2 text-xs font-semibold tracking-wider text-ivory uppercase shadow transition hover:bg-emerald-700"
                  >
                    <span>Full Wishlist Page</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="my-8 text-center text-xs text-ink/60">
                    Your wishlist is waiting. Explore our catalogue to curate your favorites.
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {wishlistItems.slice(0, 3).map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        className="group rounded-xl border border-gold/15 p-3 hover:border-gold transition"
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                          <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition" />
                        </div>
                        <h4 className="mt-2 line-clamp-1 text-xs font-semibold text-ink">{p.name}</h4>
                        <p className="text-xs font-bold text-emerald">{formatPrice(p.price)}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: ACCOUNT SETTINGS */}
            {activeTab === "settings" && (
              <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="border-b border-gold/15 pb-5">
                  <h2 className="font-serif text-2xl font-medium text-emerald">Account Settings</h2>
                  <p className="mt-1 text-xs text-ink/60">
                    Security, password management, and concierge communication preferences.
                  </p>
                </div>

                {settingsSaved && (
                  <div className="mt-4 rounded-xl bg-emerald/10 p-3 text-xs font-semibold text-emerald">
                    Security settings updated successfully.
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSettingsSaved(true);
                    setCurrentPass("");
                    setNewPass("");
                    setTimeout(() => setSettingsSaved(false), 2500);
                  }}
                  className="mt-6 max-w-md space-y-4"
                >
                  <h3 className="text-xs font-bold tracking-wider text-ink/70 uppercase">Update Password</h3>
                  <div>
                    <label className="text-[11px] font-semibold text-ink/60 uppercase">Current Password</label>
                    <input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="mt-1 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs outline-none focus:border-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-ink/60 uppercase">New Password</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="At least 6 characters"
                      className="mt-1 w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs outline-none focus:border-emerald"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-emerald px-6 py-2.5 text-xs font-semibold tracking-wider text-ivory uppercase shadow transition hover:bg-emerald-700"
                  >
                    Update Credentials
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
