const fs = require("fs");
const path = require("path");

const images = [
  // Top Picks
  { file: "product-headphones.jpg", id: "photo-1505740420928-5e560c06d30e" },
  { file: "product-linen-shirt.jpg", id: "photo-1602810318383-e386cc2a3ccf" },
  { file: "product-serum.jpg", id: "photo-1620916566398-39f1143ab7be" },
  { file: "product-coffee-maker.jpg", id: "photo-1517668808822-9ebb02f2a0e6" },
  { file: "product-backpack.jpg", id: "photo-1553062407-98eeb64c6a62" },

  // Promo Banners
  { file: "banner-handbag.jpg", id: "photo-1584917865442-de89df76afd3" },
  { file: "banner-armchair.jpg", id: "photo-1586023492125-27b2c045efd7" },
  { file: "banner-smartwatch.jpg", id: "photo-1523275335684-37898b6baf30" },

  // Testimonials
  { file: "avatar-sarah.jpg", id: "photo-1494790108377-be9c29b29330" },
  { file: "avatar-michael.jpg", id: "photo-1507003211169-0a1dd7228f2d" },
  { file: "avatar-priya.jpg", id: "photo-1534528741775-53994a69daeb" },

  // Hero section
  { file: "hero-lifestyle.jpg", id: "photo-1441986300917-64674bd600d8" },
  { file: "hero-montage.jpg", id: "photo-1490481651871-ab68de25d43d" },
  { file: "hero-beauty.jpg", id: "photo-1522337360788-8b13dee7a37e" },
  { file: "hero-tech.jpg", id: "photo-1505740420928-5e560c06d30e" },

  // Categories
  { file: "cat-electronics.jpg", id: "photo-1550009158-9ebf69173e03" },
  { file: "cat-fashion.jpg", id: "photo-1489987707025-afc232f7ea0f" },
  { file: "cat-home.jpg", id: "photo-1616486338812-3dadae4b4ace" },
  { file: "cat-beauty.jpg", id: "photo-1522337360788-8b13dee7a37e" },
  { file: "cat-sports.jpg", id: "photo-1517649763962-0c623266ddc0" },
  { file: "cat-toys.jpg", id: "photo-1566576912321-d58ddd7a6088" },
  { file: "cat-books.jpg", id: "photo-1512820790803-83ca734da794" },
  { file: "cat-pets.jpg", id: "photo-1583511655857-d19b40a7a54e" },

  // Extra popular products for categories
  { file: "product-smartwatch.jpg", id: "photo-1523275335684-37898b6baf30" },
  { file: "product-handbag.jpg", id: "photo-1584917865442-de89df76afd3" },
  { file: "product-armchair.jpg", id: "photo-1586023492125-27b2c045efd7" },
  { file: "product-sneakers.jpg", id: "photo-1560769629-975ec94e6a86" },
  { file: "product-perfume.jpg", id: "photo-1592945403244-b3fbafd7f539" },
  { file: "product-sunglasses.jpg", id: "photo-1511499767150-a48a237f0083" },
  { file: "product-mug.jpg", id: "photo-1514432324607-a09d9b4aefdd" },
  { file: "product-yoga-mat.jpg", id: "photo-1601925260368-ae2f83cf8b7f" }
];

const targetDir = path.join(__dirname, "..", "public", "images");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function download(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=800&q=80`;
  const dest = path.join(targetDir, item.file);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${item.file}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${item.file} (${buf.length} bytes)`);
}

async function main() {
  for (const item of images) {
    try {
      await download(item);
    } catch (e) {
      console.error(`Failed ${item.file}:`, e.message);
    }
  }
}

main();

