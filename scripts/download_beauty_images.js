const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  // Skincare
  { filename: 'product-skin-sunscreen.jpg', url: 'https://images.unsplash.com/photo-1623676714504-edd78728155e?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-skin-cica-cream.jpg', url: 'https://images.unsplash.com/photo-1781343219531-3cf90fdfbea0?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-skin-scrub.jpg', url: 'https://images.unsplash.com/photo-1688413427501-3e4fac58ede1?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-skin-clay-mask.jpg', url: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-skin-brightening-essence.jpg', url: 'https://images.unsplash.com/photo-1698912198250-fb0c5ecccc6e?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-skin-night-cream.jpg', url: 'https://images.unsplash.com/photo-1752134594016-f4969838b68d?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-skin-eye-cream.jpg', url: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=1000&q=80' },

  // Makeup
  { filename: 'product-makeup-lipstick.jpg', url: 'https://images.unsplash.com/photo-1770981667014-677a0bf91663?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-lipgloss.jpg', url: 'https://images.unsplash.com/photo-1666594171486-858f82f5b191?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-foundation.jpg', url: 'https://images.unsplash.com/photo-1560879311-370fd4561a0d?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-concealer.jpg', url: 'https://images.unsplash.com/photo-1748355544303-14bc9763aabd?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-compact.jpg', url: 'https://images.unsplash.com/photo-1501728636520-11c972bd5e2e?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-blush.jpg', url: 'https://images.unsplash.com/photo-1575686717697-f43bd36e74c2?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-mascara.jpg', url: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-makeup-palette.jpg', url: 'https://images.unsplash.com/photo-1677001456988-c70e14f9f51a?auto=format&fit=crop&w=1000&q=80' },

  // Face Serums
  { filename: 'product-serum-vit-c.jpg', url: 'https://images.unsplash.com/photo-1702475139570-b90434243af2?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-serum-hyaluronic.jpg', url: 'https://images.unsplash.com/photo-1770048792339-d8f8d8d2dbeb?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-serum-salicylic.jpg', url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-serum-retinol.jpg', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-serum-alpha-arbutin.jpg', url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-serum-peptide.jpg', url: 'https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=1000&q=80' },

  // Moisturizers
  { filename: 'product-moist-hydra-gel.jpg', url: 'https://images.unsplash.com/photo-1585687361032-fa38cd27c095?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-moist-dewy-lotion.jpg', url: 'https://images.unsplash.com/photo-1630411767274-8588f68498a8?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-moist-oilfree.jpg', url: 'https://images.unsplash.com/photo-1585077082572-52c006739dcd?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-moist-cica-soothing.jpg', url: 'https://images.unsplash.com/photo-1772910059649-ec40a07ecfe6?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-moist-night-butter.jpg', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-moist-marine-cream.jpg', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80' },

  // Cleansers
  { filename: 'product-cleanse-charcoal.jpg', url: 'https://images.unsplash.com/photo-1745565610492-b70156cec381?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-cleanse-oil.jpg', url: 'https://images.unsplash.com/photo-1603668479131-45c765b16196?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-cleanse-micellar.jpg', url: 'https://images.unsplash.com/photo-1601065874121-05ba185080d8?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-cleanse-balm.jpg', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-cleanse-cloud-foam.jpg', url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-cleanse-exfoliating.jpg', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1000&q=80' },

  // Haircare
  { filename: 'product-hair-conditioner.jpg', url: 'https://images.unsplash.com/photo-1786457166579-92da3f9a23b8?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-hair-mask.jpg', url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-hair-serum.jpg', url: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-hair-oil.jpg', url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-hair-curl-cream.jpg', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-hair-spray.jpg', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80' },

  // Fragrances
  { filename: 'product-frag-men-edt.jpg', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-frag-mist.jpg', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-frag-rollon.jpg', url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-frag-deodorant.jpg', url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-frag-rose-edp.jpg', url: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-frag-citrus-edt.jpg', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80' },

  // Beauty Tools
  { filename: 'product-tool-brushes.jpg', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-tool-blender.jpg', url: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-tool-curler.jpg', url: 'https://images.unsplash.com/photo-1512178295672-8e697a3412f4?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-tool-jaderoller.jpg', url: 'https://images.unsplash.com/photo-1586220742613-b731f66f7743?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-tool-guasha.jpg', url: 'https://images.unsplash.com/photo-1500840216050-6ffa99d75160?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-tool-mirror.jpg', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80' },
  { filename: 'product-tool-cleanser-brush.jpg', url: 'https://images.unsplash.com/photo-1618111415464-62013acf8656?auto=format&fit=crop&w=1000&q=80' },
];

const targetDir = path.join(__dirname, '..', 'public', 'images');

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.filename);
    const file = fs.createWriteStream(dest);

    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(dest);
            resolve({ filename: item.filename, status: 'OK', bytes: stats.size });
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => {});
          resolve({ filename: item.filename, status: 'ERROR', error: err.message });
        });
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          resolve({ filename: item.filename, status: 'OK', bytes: stats.size });
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        resolve({ filename: item.filename, status: `HTTP ${response.statusCode}` });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      resolve({ filename: item.filename, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} beauty product images...`);
  const results = [];
  for (const img of images) {
    const res = await download(img);
    console.log(`[${results.length + 1}/${images.length}] ${res.filename}: ${res.status} (${res.bytes ? (res.bytes / 1024).toFixed(1) + ' KB' : res.error || ''})`);
    results.push(res);
  }
  const failed = results.filter(r => r.status !== 'OK');
  console.log(`\nCompleted. Success: ${results.length - failed.length}/${images.length}`);
  if (failed.length > 0) {
    console.log('Failed downloads:', failed);
  }
}

run();

