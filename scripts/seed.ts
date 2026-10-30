/**
 * Seeds all 8 departments, subcategories, and luxury products into Firestore.
 * Emulator: FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 npm run seed
 */
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { CATEGORIES, PRODUCTS } from "../src/constants/catalogue";

if (!getApps().length) {
  initializeApp({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID ?? "demo-auvera",
  });
}

const db = getFirestore();

async function seed() {
  console.log("Seeding AUVERA Firestore Database...");

  // Seed Categories
  for (const cat of CATEGORIES) {
    await db.doc(`categories/${cat.slug}`).set(
      {
        name: cat.name,
        slug: cat.slug,
        department: cat.department,
        description: cat.description,
        image: cat.image,
        icon: cat.icon,
        subcategories: cat.subcategories,
        itemCount: cat.itemCount,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
  console.log(`✓ Seeded ${CATEGORIES.length} categories.`);

  // Seed Products
  for (const prod of PRODUCTS) {
    await db.doc(`products/${prod.id}`).set(
      {
        ...prod,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
  console.log(`✓ Seeded ${PRODUCTS.length} curated luxury products.`);
  console.log("Seed complete.");
}

seed().catch(console.error);
