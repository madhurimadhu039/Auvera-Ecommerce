const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImages() {
  const targetDir = 'AUVERA/public/images';

  console.log('1. Processing brushes...');
  // candidate-brushset2.jpg is 3.79MB (width: 5472, height: 3648)
  await sharp(path.join(targetDir, 'candidate-brushset2.jpg'))
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-brushes.jpg'));

  console.log('2. Processing beauty blender...');
  // candidate-sponge.jpg is 2.36MB (width: 2062, height: 2608)
  await sharp(path.join(targetDir, 'candidate-sponge.jpg'))
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-blender.jpg'));

  console.log('3. Processing eyelash curler...');
  // candidate-curler-wiki.jpg is 709KB (width: 1774, height: 2662)
  await sharp(path.join(targetDir, 'candidate-curler-wiki.jpg'))
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-curler.jpg'));

  console.log('4. Processing jade roller...');
  // candidate-face-massager.jpg is 104KB (width: 1000, height: 667)
  await sharp(path.join(targetDir, 'candidate-face-massager.jpg'))
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-jaderoller.jpg'));

  console.log('5. Processing rose quartz gua sha stone...');
  // candidate-rosequarz-square.jpg is 1000x1000
  await sharp(path.join(targetDir, 'candidate-rosequarz-square.jpg'))
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-guasha.jpg'));

  console.log('6. Processing LED vanity mirror...');
  // candidate-mirror.jpg is 186KB (width: 1000, height: 1500)
  await sharp(path.join(targetDir, 'candidate-mirror.jpg'))
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-mirror.jpg'));

  console.log('7. Processing sonic silicone cleanser brush...');
  // candidate-foreo-final.jpg is 900x1000
  await sharp(path.join(targetDir, 'candidate-foreo-final.jpg'))
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'product-tool-cleanser-brush.jpg'));

  console.log('All 7 images successfully processed and saved to target files!');
}

processImages().catch(console.error);
