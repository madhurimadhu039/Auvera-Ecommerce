import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

export const app = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_APPCHECK_RECAPTCHA_SITE_KEY;
  const emu = process.env.NEXT_PUBLIC_USE_EMULATORS === "true";
  if (key && !emu) {
    initializeAppCheck(app, { provider: new ReCaptchaV3Provider(key), isTokenAutoRefreshEnabled: true });
  }
  const g = globalThis as unknown as { __emu?: boolean };
  if (emu && !g.__emu) {
    g.__emu = true;
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
  }
}
