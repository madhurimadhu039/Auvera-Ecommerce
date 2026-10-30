import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getAuth } from "firebase-admin/auth";
/** Only an existing super-admin may grant admin. Bootstrap the first one with the Admin SDK (docs/FIREBASE_SETUP.md). */
export const setAdminClaim = onCall({ enforceAppCheck: true }, async (req) => {
  if (req.auth?.token.superAdmin !== true) throw new HttpsError("permission-denied", "Not allowed");
  const uid = String(req.data?.uid ?? "");
  if (!uid) throw new HttpsError("invalid-argument", "uid required");
  await getAuth().setCustomUserClaims(uid, { admin: true });
  return { ok: true };
});
