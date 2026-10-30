# Firebase setup
1. console.firebase.google.com → Add project.
2. Project settings → Your apps → Web (</>) → register; copy config into `.env.local` (see `.env.example`).
3. Build → Authentication → Get started → enable Email/Password (and Google if wanted).
4. Build → Firestore Database → Create (production mode).
5. Build → Storage → Get started.
6. `npm i -g firebase-tools && firebase login && cp .firebaserc.example .firebaserc` (edit project id).
7. `firebase deploy --only firestore:rules,firestore:indexes,storage`
8. Functions (Blaze plan required): `cd functions && npm i`; `firebase functions:secrets:set RAZORPAY_KEY_ID` (also RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET); `firebase deploy --only functions`. Set the webhook URL in the Razorpay dashboard.
9. Project settings → Service accounts → generate key; copy values into `.env.local` (never commit the JSON).
10. `npm install && npm run dev` → http://localhost:3000
First admin: use the Admin SDK once to set custom claims `{ admin: true, superAdmin: true }` on your own uid.
Emulators: set `NEXT_PUBLIC_USE_EMULATORS=true`, run `npm run emulators`.
