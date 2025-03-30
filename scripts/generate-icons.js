const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 64, 192, 512];
const sourceIcon = path.join(__dirname, '../public/icon.png');
const outputDir = path.join(__dirname, '../public');

// Create a simple icon if it doesn't exist
if (!fs.existsSync(sourceIcon)) {
  const svg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#4F46E5"/>
      <text x="256" y="300" font-family="Arial" font-size="300" fill="white" text-anchor="middle">✓</text>
    </svg>
  `;
  fs.writeFileSync(sourceIcon, svg);
}

// Generate icons for each size
sizes.forEach(size => {
  sharp(sourceIcon)
    .resize(size, size)
    .toFile(path.join(outputDir, `icon${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch(err => console.error(`Error generating ${size}x${size} icon:`, err));
}); 