const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');

const itemsToDownload = [
  // Bedding
  { file: 'product-bedding-cotton-sheets.jpg', id: 'photo-1595526114035-0d45ed16cfbf' },
  { file: 'product-bedding-comforter.jpg', id: 'photo-1444201983204-c43cbd584d93' },
  { file: 'product-bedding-pillow-covers.jpg', id: 'photo-1632928312386-90d200fd4b7b' },
  { file: 'product-bedding-duvet-set.jpg', id: 'photo-1635594202056-9ea3b497e5c0' },
  { file: 'product-bedding-blanket.jpg', id: 'photo-1780672823877-6b1399bc7c1d' },
  { file: 'product-bedding-memory-pillow.jpg', id: 'photo-1598928636135-d146006ff4be' },
  { file: 'product-bedding-mattress-protector.jpg', id: 'photo-1524061614234-8449637d36ce' },

  // Storage
  { file: 'product-storage-woven-baskets.jpg', id: 'photo-1635719918971-bf907c2b1281' },
  { file: 'product-storage-wardrobe-organiser.jpg', id: 'photo-1721739232530-371d146300b9' },
  { file: 'product-storage-underbed-boxes.jpg', id: 'photo-1581068466660-e6585b8afa97' },
  { file: 'product-storage-drawer-organisers.jpg', id: 'photo-1569235186275-626cb53b83ce' },
  { file: 'product-storage-shoe-organiser.jpg', id: 'photo-1716513312004-9a7ebd4a7182' },
  { file: 'product-storage-laundry-basket.jpg', id: 'photo-1780253200136-77514727a5da' },

  // Home Accessories
  { file: 'product-acc-ceramic-vase.jpg', id: 'photo-1754893383186-43f1ef297a78' },
  { file: 'product-acc-decorative-tray.jpg', id: 'photo-1608979048467-6194dabc6a3d' }
];

async function download(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=1000&q=80`;
  const dest = path.join(targetDir, item.file);
  console.log(`Downloading ${item.file} from ${item.id}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${item.file}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${item.file} (${buf.length} bytes)`);
}

async function run() {
  for (const item of itemsToDownload) {
    try {
      await download(item);
    } catch (e) {
      console.error(`Failed ${item.file}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

run();

