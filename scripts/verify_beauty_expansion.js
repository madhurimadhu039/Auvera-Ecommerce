const fs = require('fs');
const path = require('path');

const catContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'constants', 'catalogue.ts'), 'utf8');

// Parse beauty products from RAW_PRODUCTS
const beautyBlockRegex = /\/\/\s*=====================\s*4\.\s*BEAUTY[\s\S]*?\/\/\s*=====================\s*5\.\s*SPORTS/;
const match = catContent.match(beautyBlockRegex);

if (!match) {
  console.error('Failed to locate Beauty block in catalogue.ts');
  process.exit(1);
}

const beautyBlock = match[0];
const productRegex = /{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*category:\s*"beauty",\s*subcategory:\s*"([^"]+)",[\s\S]*?price:\s*(\d+),\s*compareAtPrice:\s*(\d+),[\s\S]*?images:\s*\["([^"]+)"/g;

let pMatch;
const products = [];
while ((pMatch = productRegex.exec(beautyBlock)) !== null) {
  products.push({
    id: pMatch[1],
    name: pMatch[2],
    slug: pMatch[3],
    subcategory: pMatch[4],
    price: parseInt(pMatch[5]),
    compareAtPrice: parseInt(pMatch[6]),
    image: pMatch[7]
  });
}

console.log(`\n========================================`);
console.log(`AUVERA BEAUTY EXPANSION VERIFICATION`);
console.log(`========================================`);
console.log(`Total Beauty products detected: ${products.length}`);

// 1. Check Subcategory distribution
const subcatCounts = {};
for (const p of products) {
  subcatCounts[p.subcategory] = (subcatCounts[p.subcategory] || 0) + 1;
}
console.log('\nSubcategory counts:');
console.table(subcatCounts);

// 2. Pricing Validation: price < 3000
const priceViolations = products.filter(p => p.price >= 3000);
console.log(`Price >= 3000 violations: ${priceViolations.length}`);
if (priceViolations.length > 0) {
  console.error('VIOLATION:', priceViolations);
}

// 3. CompareAtPrice > price
const compareViolations = products.filter(p => p.compareAtPrice <= p.price);
console.log(`compareAtPrice <= price violations: ${compareViolations.length}`);
if (compareViolations.length > 0) {
  console.error('VIOLATION:', compareViolations);
}

// 4. Check image files on disk
let missingImages = 0;
for (const p of products) {
  const relPath = p.image.replace(/^\//, '');
  const fullPath = path.join(__dirname, '..', 'public', relPath.replace(/\//g, path.sep));
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing image for ${p.id}: ${fullPath}`);
    missingImages++;
  }
}
console.log(`Missing image files on disk: ${missingImages}`);

// 5. Unique checks
const idSet = new Set();
const nameSet = new Set();
const slugSet = new Set();
let duplicates = 0;

for (const p of products) {
  if (idSet.has(p.id)) { console.error(`Duplicate ID: ${p.id}`); duplicates++; }
  idSet.add(p.id);
  if (nameSet.has(p.name)) { console.error(`Duplicate Name: ${p.name}`); duplicates++; }
  nameSet.add(p.name);
  if (slugSet.has(p.slug)) { console.error(`Duplicate Slug: ${p.slug}`); duplicates++; }
  slugSet.add(p.slug);
}
console.log(`Duplicate IDs / Names / Slugs: ${duplicates}`);

if (priceViolations.length === 0 && compareViolations.length === 0 && missingImages === 0 && duplicates === 0 && products.length === 57) {
  console.log(`\n>>> ALL VERIFICATION CHECKS PASSED PERFECTLY! <<<`);
} else {
  console.error(`\n>>> VERIFICATION FAILED! <<<`);
  process.exit(1);
}

