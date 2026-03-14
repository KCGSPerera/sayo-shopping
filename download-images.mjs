import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
    { url: 'https://images.unsplash.com/photo-1599643478514-da2006ed6a43?q=80&w=1500&auto=format&fit=crop', dest: 'public/assets/about/brand-story.jpg' },
    { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop', dest: 'public/assets/about/elegant-image.jpg' },
    { url: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=1887&auto=format&fit=crop', dest: 'public/assets/home/diamond-solitaire-ring.jpg' },
    { url: 'https://images.unsplash.com/photo-1599643478514-da2006ed6a43?q=80&w=1964&auto=format&fit=crop', dest: 'public/assets/home/emerald-drop-necklace.jpg' },
    { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop', dest: 'public/assets/home/pearl-estate-earrings.jpg' },
    { url: 'https://images.unsplash.com/photo-1573408301145-b98c4654446c?q=80&w=1888&auto=format&fit=crop', dest: 'public/assets/home/heritage-collection.jpg' },
    { url: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=1887&auto=format&fit=crop', dest: 'public/assets/categories/rings.jpg' },
    { url: 'https://images.unsplash.com/photo-1599643478514-da2006ed6a43?q=80&w=1964&auto=format&fit=crop', dest: 'public/assets/categories/necklaces.jpg' },
    { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop', dest: 'public/assets/categories/earrings.jpg' },
    { url: 'https://images.unsplash.com/photo-1588444837495-c6cf0c253b2d?q=80&w=1964&auto=format&fit=crop', dest: 'public/assets/legal/terms-background.jpg' },
    { url: 'https://images.unsplash.com/photo-1599643478514-da2006ed6a43?q=80&w=1964&auto=format&fit=crop', dest: 'public/assets/legal/privacy-background.jpg' },
    { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop', dest: 'public/assets/shipping/shipping-background.jpg' },
    { url: 'https://images.unsplash.com/photo-1599643478524-fb66f7ca0f17?q=80&w=1974&auto=format&fit=crop', dest: 'public/assets/support/support-hero.jpg' },
    { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop', dest: 'public/assets/support/jewellery-care.jpg' }
];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function run() {
    console.log('Downloading images...');
    for (const { url, dest } of downloads) {
        if (!fs.existsSync(dest)) {
            console.log(`Downloading ${dest}...`);
            await downloadImage(url, dest);
        } else {
            console.log(`Skipping ${dest}, already exists.`);
        }
    }
    console.log('Done!');
}

run();
