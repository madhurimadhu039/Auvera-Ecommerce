import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { getFirestore } from "firebase-admin/firestore";
import { createHmac, timingSafeEqual } from "crypto";

const webhookSecret = defineSecret("RAZORPAY_WEBHOOK_SECRET");

export const razorpayWebhook = onRequest({ secrets: [webhookSecret] }, async (req, res) => {
  const sig = String(req.header("x-razorpay-signature") ?? "");
  const expected = createHmac("sha256", webhookSecret.value()).update(req.rawBody).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) { res.status(400).send("bad signature"); return; }

  const db = getFirestore();
  const { event, payload } = req.body;
  const rzOrderId = payload?.payment?.entity?.order_id;
  if (rzOrderId && (event === "payment.captured" || event === "payment.failed")) {
    const q = await db.collection("orders").where("razorpayOrderId", "==", rzOrderId).limit(1).get();
    if (!q.empty) {
      await q.docs[0].ref.update({ status: event === "payment.captured" ? "paid" : "failed" });
      // TODO: decrement inventory in a transaction, award reward points, send email.
    }
  }
  res.status(200).send("ok");
});
