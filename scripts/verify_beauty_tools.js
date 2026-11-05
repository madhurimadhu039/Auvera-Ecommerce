const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('AUVERA/src/constants/catalogue.ts', 'utf8');

// Check tools products
const toolIds = [
  'prod-tool-brushes',
  'prod-tool-blender',
  'prod-tool-curler',
  'prod-tool-jaderoller',
  'prod-tool-guasha',
  'prod-tool-mirror',
  'prod-tool-cleanser-brush'
];

console.log('--- Verifying Beauty Tools ---');
toolIds.forEach(id => {
  const re = new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?name:\\s*["']([^"']+)["'][\\s\\S]*?price:\\s*(\\d+)[\\s\\S]*?images:\\s*\\[([^\\]]+)\\]`);
  const match = content.match(re);
  if (match) {
    const name = match[1];
    const price = parseInt(match[2]);
    const imgs = match[3].split(',').map(s => s.trim().replace(/['"]/g, ''));
    console.log(`[OK] ${id}: "${name}" | Price: Rs.${price} | Images: ${imgs.join(', ')}`);

    imgs.forEach(img => {
      const filePath = path.join('AUVERA/public', img);
      if (!fs.existsSync(filePath)) {
        console.error(`  [ERROR] Image not found: ${filePath}`);
      } else {
        const stats = fs.statSync(filePath);
        console.log(`  File exists (${stats.size} bytes)`);
      }
    });

    if (price >= 3000) {
      console.error(`  [ERROR] Price Rs.${price} exceeds 2,999 constraint!`);
    }
  } else {
    console.error(`[ERROR] Product not found: ${id}`);
  }
});
