const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

const blogPosts = [
  {
    id: 'paris',
    query: 'paris cityscape eiffel tower',
    sizes: [1200, 800, 400]
  },
  {
    id: 'photography',
    query: 'travel photography camera',
    sizes: [1200, 800, 400]
  },
  {
    id: 'sustainable',
    query: 'sustainable travel eco tourism',
    sizes: [1200, 800, 400]
  },
  {
    id: 'tokyo-food',
    query: 'japanese street food tokyo',
    sizes: [1200, 800, 400]
  },
  {
    id: 'bali-wellness',
    query: 'bali spa wellness retreat',
    sizes: [1200, 800, 400]
  },
  {
    id: 'dubai-luxury',
    query: 'dubai luxury hotel burj al arab',
    sizes: [1200, 800, 400]
  },
  {
    id: 'nyc-broadway',
    query: 'new york broadway theater',
    sizes: [1200, 800, 400]
  },
  {
    id: 'sydney-harbor',
    query: 'sydney harbor bridge opera house',
    sizes: [1200, 800, 400]
  },
  {
    id: 'adventure-hiking',
    query: 'mountain hiking adventure travel',
    sizes: [1200, 800, 400]
  },
  {
    id: 'culture-temple',
    query: 'asian temple culture architecture',
    sizes: [1200, 800, 400]
  },
  {
    id: 'beach-paradise',
    query: 'tropical beach paradise sunset',
    sizes: [1200, 800, 400]
  },
  {
    id: 'food-markets',
    query: 'local food market street vendors',
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

async function processBlogPost(post) {
  const dir = path.join(__dirname, '../public/blog');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    // Fetch image from Unsplash
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(post.query)}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    const data = await response.json();
    const imageUrl = data.urls.regular;
    
    // Download original image
    const originalPath = path.join(dir, `${post.id}-original.jpg`);
    await downloadImage(imageUrl, originalPath);
    
    // Create different sizes
    for (const size of post.sizes) {
      const outputPath = path.join(dir, `${post.id}-${size}.jpg`);
      await optimizeImage(originalPath, outputPath, size);
    }
    
    // Create main image (1200px version)
    fs.copyFileSync(
      path.join(dir, `${post.id}-1200.jpg`),
      path.join(dir, `${post.id}.jpg`)
    );
    
    console.log(`✅ Processed ${post.id}`);
  } catch (error) {
    console.error(`❌ Error processing ${post.id}:`, error);
  }
}

async function main() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Please set UNSPLASH_ACCESS_KEY environment variable');
    process.exit(1);
  }

  console.log('🚀 Starting blog image processing...');
  
  for (const post of blogPosts) {
    await processBlogPost(post);
  }
  
  console.log('✨ Blog image processing complete!');
}

main().catch(console.error); 