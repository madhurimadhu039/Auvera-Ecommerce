import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import Razorpay from "razorpay";

const keyId = defineSecret("RAZORPAY_KEY_ID");
const keySecret = defineSecret("RAZORPAY_KEY_SECRET");

/** Price is ALWAYS recomputed server-side from Firestore; client totals are ignored. */
export const createRazorpayOrder = onCall({ secrets: [keyId, keySecret], enforceAppCheck: true }, async (req) => {
  if (!req.auth) throw new HttpsError("unauthenticated", "Sign in required");
  const db = getFirestore();
  const cart = await db.doc(`carts/${req.auth.uid}`).get();
  const items: { productId: string; qty: number }[] = cart.data()?.items ?? [];
  if (!items.length) throw new HttpsError("failed-precondition", "Cart is empty");

  let subtotal = 0;
  const lines = await db.runTransaction(async (tx) => {
    const out: { productId: string; qty: number; unitPrice: number }[] = [];
    for (const it of items) {
      const p = (await tx.get(db.doc(`products/${it.productId}`))).data();
      if (!p || p.status !== "active") throw new HttpsError("failed-precondition", `Unavailable: ${it.productId}`);
      if (p.stock < it.qty) throw new HttpsError("failed-precondition", `Insufficient stock: ${p.name}`);
      subtotal += p.price * it.qty;
      out.push({ productId: it.productId, qty: it.qty, unitPrice: p.price });
    }
    return out;
  });
  // TODO: coupons, shipping, GST (docs/PHASES.md Phase 5)
  const total = subtotal;
  const rz = new Razorpay({ key_id: keyId.value(), key_secret: keySecret.value() });
  const rzOrder = await rz.orders.create({ amount: Math.round(total * 100), currency: "INR", receipt: `auv_${Date.now()}` });
  const ref = db.collection("orders").doc();
  await ref.set({ userId: req.auth.uid, items: lines, subtotal, tax: 0, shipping: 0, total, status: "pending", razorpayOrderId: rzOrder.id, createdAt: FieldValue.serverTimestamp() });
  return { orderId: ref.id, razorpayOrderId: rzOrder.id, amount: rzOrder.amount, currency: "INR" };
});
