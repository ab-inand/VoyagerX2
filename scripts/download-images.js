const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

const destinations = [
  {
    id: 'paris',
    query: 'paris eiffel tower cityscape',
    sizes: [1200, 800, 400]
  },
  {
    id: 'tokyo',
    query: 'tokyo cityscape japan',
    sizes: [1200, 800, 400]
  },
  {
    id: 'dubai',
    query: 'dubai burj khalifa cityscape',
    sizes: [1200, 800, 400]
  },
  {
    id: 'bali',
    query: 'bali beach temple paradise',
    sizes: [1200, 800, 400]
  },
  {
    id: 'newyork',
    query: 'new york city skyline',
    sizes: [1200, 800, 400]
  },
  {
    id: 'sydney',
    query: 'sydney opera house harbor',
    sizes: [1200, 800, 400]
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
}

async function optimizeImage(inputPath, outputPath, width) {
  await sharp(inputPath)
    .resize(width, null, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({
      quality: 80,
      progressive: true
    })
    .toFile(outputPath);
}

async function processDestination(destination) {
  const dir = path.join(__dirname, '../public/destinations', destination.id);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    // Fetch image from Unsplash
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(destination.query)}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    const data = await response.json();
    const imageUrl = data.urls.regular;
    
    // Download original image
    const originalPath = path.join(dir, 'original.jpg');
    await downloadImage(imageUrl, originalPath);
    
    // Create different sizes
    for (const size of destination.sizes) {
      const outputPath = path.join(dir, `${size}.jpg`);
      await optimizeImage(originalPath, outputPath, size);
    }
    
    // Create main.jpg (1200px version)
    fs.copyFileSync(
      path.join(dir, '1200.jpg'),
      path.join(dir, 'main.jpg')
    );
    
    console.log(`✅ Processed ${destination.id}`);
  } catch (error) {
    console.error(`❌ Error processing ${destination.id}:`, error);
  }
}

async function main() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Please set UNSPLASH_ACCESS_KEY environment variable');
    process.exit(1);
  }

  console.log('🚀 Starting image processing...');
  
  for (const destination of destinations) {
    await processDestination(destination);
  }
  
  console.log('✨ Image processing complete!');
}

main().catch(console.error); 