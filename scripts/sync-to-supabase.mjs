import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Helper to load .env.local or .env manually
function loadEnv() {
  const envFiles = ['.env', '.env.local'];
  for (const file of envFiles) {
    const envPath = path.join(rootDir, file);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let value = trimmed.slice(eqIdx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY (or SUPABASE_SECRET_KEY) must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncData() {
  console.log('🚀 Syncing local JSON data to Supabase Database...');
  console.log(`🔗 Target URL: ${supabaseUrl}\n`);

  const readJson = (file) => JSON.parse(fs.readFileSync(path.join(rootDir, 'data', file), 'utf8'));

  // 1. Sync Posts
  const posts = readJson('posts.json');
  console.log(`📌 Syncing ${posts.length} Blog Posts...`);
  for (const post of posts) {
    const payload = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      category: post.category,
      author: post.author,
      read_time: post.readTime,
      image: post.image,
    };
    const { error } = await supabase.from('posts').upsert(payload, { onConflict: 'slug' });
    if (error) console.error(`  ❌ Failed post ${post.slug}:`, error.message);
    else console.log(`  ✓ Synced post: ${post.slug}`);
  }

  // 2. Sync Services
  const services = readJson('services.json');
  console.log(`\n📌 Syncing ${services.length} Services...`);
  for (const srv of services) {
    const payload = {
      slug: srv.slug,
      title: srv.title,
      short_title: srv.shortTitle || srv.title,
      description: srv.description,
      price_from: srv.priceFrom,
      tag: srv.tag,
      badge_color: srv.badgeColor,
      image: srv.image,
      features: srv.features || [],
      issues: srv.issues || [],
      process: srv.process || [],
      price_table: srv.priceTable || [],
      faqs: srv.faqs || [],
    };
    const { error } = await supabase.from('services').upsert(payload, { onConflict: 'slug' });
    if (error) console.error(`  ❌ Failed service ${srv.slug}:`, error.message);
    else console.log(`  ✓ Synced service: ${srv.slug}`);
  }

  // 3. Sync Products
  const products = readJson('products.json');
  console.log(`\n📌 Syncing ${products.length} Products...`);
  for (const prod of products) {
    const payload = {
      slug: prod.slug,
      name: prod.name,
      brand: prod.brand,
      category: prod.category || 'may-lanh',
      price: prod.price,
      image: prod.image,
      capacity: prod.capacity,
      inverter: prod.inverter,
      origin: prod.origin,
      warranty: prod.warranty,
      specs: prod.specs || [],
      description: prod.description,
    };
    let { error } = await supabase.from('products').upsert(payload, { onConflict: 'slug' });
    if (error && error.message.includes('category')) {
      delete payload.category;
      const res = await supabase.from('products').upsert(payload, { onConflict: 'slug' });
      error = res.error;
    }
    if (error) console.error(`  ❌ Failed product ${prod.slug}:`, error.message);
    else console.log(`  ✓ Synced product: ${prod.slug}`);
  }

  // 4. Sync Projects
  const projects = readJson('projects.json');
  console.log(`\n📌 Syncing ${projects.length} Projects...`);
  for (const proj of projects) {
    const payload = {
      project_id: proj.id,
      title: proj.title,
      category: proj.category,
      location: proj.location,
      image: proj.image,
      description: proj.description,
      completion_date: proj.completionDate,
    };
    const { error } = await supabase.from('projects').upsert(payload, { onConflict: 'project_id' });
    if (error) console.error(`  ❌ Failed project ${proj.id}:`, error.message);
    else console.log(`  ✓ Synced project: ${proj.id}`);
  }

  console.log('\n✅ All data successfully synced to Supabase!');
}

syncData().catch(console.error);
