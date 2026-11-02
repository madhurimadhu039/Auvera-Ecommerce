const fs = require('fs');
const path = require('path');

// Dynamically check catalogue data
const cataloguePath = path.join(__dirname, '..', 'src', 'constants', 'catalogue.ts');
const code = fs.readFileSync(cataloguePath, 'utf8');

// We can compile/run with ts-node or inspect with a node runner
console.log('Verifying Home & Living catalogue integration...');

// Let's test hitting the dev server on port 3004
async function verifyServer() {
  const baseUrl = 'http://localhost:3004';

  const pagesToTest = [
    { url: `${baseUrl}/categories/home-living`, label: 'Home & Living main' },
    { url: `${baseUrl}/categories/home-living?sub=bedding`, label: 'Bedding subcategory' },
    { url: `${baseUrl}/categories/home-living?sub=storage`, label: 'Storage subcategory' },
    { url: `${baseUrl}/categories/home-living?sub=accessories`, label: 'Accessories subcategory' },
  ];

  for (const page of pagesToTest) {
    try {
      const res = await fetch(page.url);
      console.log(`[HTTP ${res.status}] ${page.label} (${page.url})`);
      const html = await res.text();
      if (!res.ok) {
        console.error(`ERROR fetching ${page.url}`);
      }
    } catch (e) {
      console.error(`Connection failed for ${page.url}:`, e.message);
    }
  }

  // Check all 23 image paths on disk and via server
  const imagesToCheck = [
    // Bedding
    'product-bedding.jpg',
    'product-bedding-cotton-sheets.jpg',
    'product-bedding-comforter.jpg',
    'product-bedding-pillow-covers.jpg',
    'product-bedding-duvet-set.jpg',
    'product-bedding-blanket.jpg',
    'product-bedding-memory-pillow.jpg',
    'product-bedding-mattress-protector.jpg',

    // Storage
    'product-storage-woven-baskets.jpg',
    'product-storage-wardrobe-organiser.jpg',
    'product-storage-underbed-boxes.jpg',
    'product-storage-drawer-organisers.jpg',
    'product-storage-containers-lids.jpg',
    'product-storage-shoe-organiser.jpg',
    'product-storage-laundry-basket.jpg',
    'product-storage-wall-shelves.jpg',

    // Home Accessories
    'product-acc-ceramic-vase.jpg',
    'product-acc-scented-candle.jpg',
    'product-acc-wall-clock.jpg',
    'product-acc-photo-frames.jpg',
    'product-acc-table-lamp.jpg',
    'product-acc-indoor-plants.jpg',
    'product-acc-wall-art.jpg',
    'product-acc-decorative-tray.jpg'
  ];

  console.log(`\nVerifying ${imagesToCheck.length} images...`);
  let allImagesOk = true;
  for (const img of imagesToCheck) {
    const filePath = path.join(__dirname, '..', 'public', 'images', img);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing file on disk: ${img}`);
      allImagesOk = false;
      continue;
    }
    const stat = fs.statSync(filePath);
    try {
      const imgRes = await fetch(`${baseUrl}/images/${img}`, { method: 'HEAD' });
      if (imgRes.status !== 200) {
        console.error(`Image HTTP error: /images/${img} returned ${imgRes.status}`);
        allImagesOk = false;
      } else {
        console.log(`✓ /images/${img} (${stat.size} bytes, HTTP 200)`);
      }
    } catch (e) {
      console.error(`Image request failed for /images/${img}:`, e.message);
      allImagesOk = false;
    }
  }

  if (allImagesOk) {
    console.log('\nAll images verified successfully!');
  } else {
    console.error('\nSome images had issues!');
  }
}

verifyServer();

