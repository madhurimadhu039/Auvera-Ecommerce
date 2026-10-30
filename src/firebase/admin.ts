import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/** Server-only. Never import from a "use client" file. */
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

const app = getApps().length
  ? getApps()[0]
  : initializeApp(
    projectId && clientEmail && privateKey
      ? {
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      }
      : { projectId: projectId || "auvera-demo" }
  );
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app); 
