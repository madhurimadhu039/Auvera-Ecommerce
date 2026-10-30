# AUVERA — The Art of Everyday Luxury
Status: **foundation (Phases 1–2)**. See `docs/PHASES.md`. Not a finished store.

```
npm install
cp .env.example .env.local   # fill values (docs/FIREBASE_SETUP.md)
npm run dev
```
- `src/` Next.js app; homepage built from `docs/reference/viva-homepage.jpg`
- `functions/` Cloud Functions (admin claim, Razorpay order + verified webhook)
- `firestore.rules`, `storage.rules`, `firestore.indexes.json`, `firebase.json`
- `scripts/seed.ts`, `docs/` (setup, requirements, phases, Antigravity prompt)
