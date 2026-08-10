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
  console.error('❌ Error: SUPABASE_URL and SUPABASE_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function ensureBucket() {
  const BUCKET_NAME = 'products';
  console.log(`📦 Checking Supabase Storage Bucket "${BUCKET_NAME}"...`);
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET_NAME);

  if (!exists) {
    console.log(`🔨 Creating public bucket "${BUCKET_NAME}"...`);
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    });
    if (error) {
      console.warn(`  ⚠️ Bucket creation notice: ${error.message}`);
    }
  } else {
    console.log(`  ✓ Bucket "${BUCKET_NAME}" ready.`);
  }
}

async function uploadFile(localRelativePath) {
  const BUCKET_NAME = 'products';
  const fullPath = path.join(rootDir, 'public', localRelativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️ Local file missing: ${fullPath}`);
    return `/${localRelativePath.replace(/\\/g, '/')}`;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const storagePath = localRelativePath.replace(/\\/g, '/').replace(/^images\//, '');

  let contentType = 'image/jpeg';
  if (storagePath.endsWith('.png')) contentType = 'image/png';
  if (storagePath.endsWith('.webp')) contentType = 'image/webp';

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(storagePath, fileBuffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    console.warn(`  ⚠️ Storage upload notice for ${storagePath}:`, error.message);
    return `/${localRelativePath.replace(/\\/g, '/')}`;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
  console.log(`  ✓ Uploaded to Supabase Storage: ${data.publicUrl}`);
  return data.publicUrl;
}

async function main() {
  await ensureBucket();

  console.log('\n🚀 Uploading images to Supabase Storage & updating product catalog...');

  const imageMap = {
    // Tủ lạnh
    tuLanhPana: await uploadFile('images/tu lanh/panasonic.jpg'),
    tuLanhToshiba: await uploadFile('images/tu lanh/toshiba.jpg'),
    tuLanhSideBySide: await uploadFile('images/tu lanh/tu lanh.jpg'),

    // Máy giặt
    mayGiatLG: await uploadFile('images/may giac/LG.jpg'),
    mayGiatSamsung: await uploadFile('images/may giac/samsung.jpg'),
    mayGiatToshiba: await uploadFile('images/may giac/toshiba.jpg'),

    // Máy lọc nước
    mayLocNuocX16: await uploadFile('images/may loc nuoc/May-loc-nuoc-karofi-KAQ-X16-1.webp'),
    mayLocNuocD36S: await uploadFile('images/may loc nuoc/may-loc-nuoc-karofi-kaq-d36s-1.png'),
    mayLocNuocNE118: await uploadFile('images/may loc nuoc/may-loc-nuoc-tieu-chuan-karofi-n-e118.jpg'),

    // Máy lạnh
    mayLanhDaikin: await uploadFile('images/may_lanh_indoor.jpg'),
  };

  // Full product catalog mapped to real images
  const products = [
    // --- MÁY LẠNH ---
    {
      slug: 'may-lanh-daikin-inverter-1hp-ftkf25xvmv',
      name: 'Máy lạnh Daikin Inverter 1 HP FTKF25XVMV',
      brand: 'Daikin',
      category: 'may-lanh',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayLanhDaikin,
      capacity: '1 HP (Dưới 15m²)',
      inverter: true,
      origin: 'Thái Lan',
      warranty: 'Bảo hành 1 năm thân máy, 5 năm lốc nén',
      specs: [
        'Công suất làm lạnh: 1 HP - 9.200 BTU',
        'Công nghệ tiết kiệm điện: Inverter',
        'Lọc khí: Phin lọc Enzyme Blue + PM2.5',
        'Dàn tản nhiệt: Lá nhôm chống ăn mòn muối biển',
        'Loại Gas: R32'
      ],
      description: 'Máy lạnh Daikin 1HP Inverter cao cấp. Phin lọc Enzyme Blue diệt khuẩn 99.9%, chống ăn mòn muối biển Phú Quốc.'
    },
    {
      slug: 'may-lanh-panasonic-inverter-1-5hp-pu12xkh-8',
      name: 'Máy lạnh Panasonic Inverter 1.5 HP CU/CS-PU12XKH-8',
      brand: 'Panasonic',
      category: 'may-lanh',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayLanhDaikin,
      capacity: '1.5 HP (15m² - 20m²)',
      inverter: true,
      origin: 'Malaysia',
      warranty: 'Bảo hành chính hãng 1 năm',
      specs: [
        'Công suất làm lạnh: 1.5 HP - 11.900 BTU',
        'Công nghệ tiết kiệm điện: Eco A.I & Inverter',
        'Lọc không khí: Nanoe-G lọc bụi mịn PM2.5',
        'Làm lạnh nhanh: Powerful mode',
        'Loại Gas: R32'
      ],
      description: 'Dòng máy lạnh cao cấp Panasonic làm lạnh cực nhanh Powerful, tích hợp trí tuệ nhân tạo Eco A.I tiết kiệm điện.'
    },
    {
      slug: 'may-lanh-casper-inverter-1hp-tc-09is35',
      name: 'Máy lạnh Casper Inverter 1 HP TC-09IS35',
      brand: 'Casper',
      category: 'may-lanh',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayLanhDaikin,
      capacity: '1 HP (Dưới 15m²)',
      inverter: true,
      origin: 'Thái Lan',
      warranty: '1 đổi 1 trong 2 năm, 12 năm lốc nén',
      specs: [
        'Công suất làm lạnh: 1 HP - 9.000 BTU',
        'Công nghệ tiết kiệm điện: i-Saving Inverter',
        'Tự động làm sạch: iClean',
        'Dàn tản nhiệt: Đồng mạ vàng bền bỉ'
      ],
      description: 'Máy lạnh Casper dàn tản nhiệt mạ vàng siêu bền, chống chọi thời tiết biển Phú Quốc cực kỳ hiệu quả.'
    },

    // --- TỦ LẠNH ---
    {
      slug: 'tu-lanh-panasonic-inverter-322l',
      name: 'Tủ lạnh Panasonic Inverter 322 lít NR-BC361VGMV',
      brand: 'Panasonic',
      category: 'tu-lanh',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.tuLanhPana,
      capacity: '322 Lít (3 - 4 người)',
      inverter: true,
      origin: 'Việt Nam',
      warranty: 'Bảo hành chính hãng 2 năm',
      specs: [
        'Dung tích sử dụng: 322 lít (Ngăn đá dưới)',
        'Ngăn đông mềm Prime Fresh+ giữ thịt cá tươi 7 ngày',
        'Công nghệ kháng khuẩn Ag Clean tinh thể bạc',
        'Cảm biến Econavi tiết kiệm điện thông minh'
      ],
      description: 'Tủ lạnh Panasonic ngăn đá dưới trang bị ngăn đông mềm Prime Fresh+ giữ thực phẩm tươi ngon suốt 7 ngày không cần rã đông.'
    },
    {
      slug: 'tu-lanh-toshiba-inverter-180l',
      name: 'Tủ lạnh Toshiba Inverter 180 lít GR-RT252WE-PMV(52)',
      brand: 'Toshiba',
      category: 'tu-lanh',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.tuLanhToshiba,
      capacity: '180 Lít (2 - 3 người)',
      inverter: true,
      origin: 'Thái Lan',
      warranty: 'Bảo hành chính hãng 2 năm',
      specs: [
        'Dung tích sử dụng: 180 lít',
        'Công nghệ Origin Inverter tiết kiệm điện tối đa',
        'Khử mùi diệt khuẩn Ag+ Bio',
        'Ngăn rau quả Origin Fresh cân bằng độ ẩm'
      ],
      description: 'Tủ lạnh Toshiba gọn gàng phù hợp phòng trọ, homestay, gia đình nhỏ tại Phú Quốc. Vận hành êm ái, tiết kiệm điện.'
    },
    {
      slug: 'tu-lanh-aqua-side-by-side-516l',
      name: 'Tủ lạnh Aqua Inverter 516 lít Side By Side AQR-IG525AM(GB)',
      brand: 'Aqua',
      category: 'tu-lanh',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.tuLanhSideBySide,
      capacity: '516 Lít (Trên 5 người)',
      inverter: true,
      origin: 'Trung Quốc',
      warranty: 'Bảo hành chính hãng 2 năm',
      specs: [
        'Dung tích sử dụng: 516 lít (Mặt kính đen sang trọng)',
        'Công nghệ Twin Inverter siêu tiết kiệm điện',
        'Kháng khuẩn khử mùi H-DEO Fresh',
        'Luồng khí lạnh đa chiều 360 độ'
      ],
      description: 'Tủ lạnh Side By Side Aqua 4 cửa mặt kính đen sang trọng cho căn hộ, biệt thự và nhà hàng Phú Quốc.'
    },

    // --- MÁY GIẶT ---
    {
      slug: 'may-giat-lg-inverter-9kg-fb1209s6w',
      name: 'Máy giặt LG Inverter 9 kg FB1209S6W (Cửa ngang)',
      brand: 'LG',
      category: 'may-giat',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayGiatLG,
      capacity: 'Khối lượng giặt 9kg',
      inverter: true,
      origin: 'Thái Lan',
      warranty: 'Bảo hành 2 năm máy, 10 năm động cơ',
      specs: [
        'Khối lượng giặt: 9.0 kg',
        'Động cơ: Truyền động trực tiếp Intello DD',
        'Giặt hơi nước Steam diệt khuẩn 99.9%',
        'Công nghệ giặt: 6 Motion DD mô phỏng giặt tay'
      ],
      description: 'Máy giặt cửa ngang LG động cơ truyền động trực tiếp êm ái, giặt sạch sâu và bảo vệ sợi vải.'
    },
    {
      slug: 'may-giat-samsung-inverter-9-5kg',
      name: 'Máy giặt Samsung Inverter 9.5 kg WW95TA046AX/SV',
      brand: 'Samsung',
      category: 'may-giat',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayGiatSamsung,
      capacity: 'Khối lượng giặt 9.5kg',
      inverter: true,
      origin: 'Việt Nam',
      warranty: 'Bảo hành chính hãng 2 năm',
      specs: [
        'Bong bóng siêu mịn EcoBubble thẩm thấu nhanh gấp 40 lần',
        'Giặt hơi nước Hygiene Steam diệt 99.9% vi khuẩn',
        'Động cơ Digital Inverter vận hành bền bỉ',
        'Chế độ tự làm sạch lồng giặt Drum Clean'
      ],
      description: 'Máy giặt Samsung công nghệ bong bóng siêu mịn EcoBubble giặt sạch vết bẩn cứng đầu hiệu quả.'
    },
    {
      slug: 'may-giat-toshiba-8-5kg-cua-tren',
      name: 'Máy giặt Toshiba 8.5 kg AW-K900DV(WW)',
      brand: 'Toshiba',
      category: 'may-giat',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayGiatToshiba,
      capacity: 'Khối lượng giặt 8.5kg',
      inverter: false,
      origin: 'Thái Lan',
      warranty: 'Bảo hành chính hãng 2 năm',
      specs: [
        'Khối lượng giặt: 8.5 kg (Cửa trên)',
        'Lồng giặt Star Crystal Drum bảo vệ quần áo',
        'Mâm giặt Mega Power tạo luồng nước xoáy mạnh',
        'Tính năng tự vệ sinh lồng giặt I-Clean'
      ],
      description: 'Máy giặt cửa trên Toshiba bền bỉ, dễ sử dụng, thiết kế sang trọng phù hợp hộ gia đình và homestay.'
    },

    // --- MÁY LỌC NƯỚC ---
    {
      slug: 'may-loc-nuoc-karofi-kaq-x16',
      name: 'Máy lọc nước Karofi KAQ-X16 (10 Lõi RO)',
      brand: 'Karofi',
      category: 'may-loc-nuoc',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayLocNuocX16,
      capacity: 'Công suất lọc 20 lít/giờ',
      inverter: false,
      origin: 'Việt Nam',
      warranty: 'Bảo hành 36 tháng chính hãng',
      specs: [
        'Hệ thống 10 lõi lọc SMAX gấp đôi hiệu năng',
        'Màng lọc RO Purifim Mỹ lọc sạch 99.99% kim loại nặng',
        'Bổ sung khoáng chất Hydrogen tươi chống lão hóa',
        'Tủ đứng tràn viền kính cường lực hiện đại'
      ],
      description: 'Máy lọc nước Karofi KAQ-X16 thiết kế tủ đứng tràn viền sang trọng, cho nguồn nước uống trực tiếp tinh khiết chuẩn Bộ Y Tế.'
    },
    {
      slug: 'may-loc-nuoc-nong-lanh-karofi-kaq-d36s',
      name: 'Máy lọc nước Nóng Lạnh Karofi KAQ-D36S',
      brand: 'Karofi',
      category: 'may-loc-nuoc',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayLocNuocD36S,
      capacity: 'Công suất lọc 20L/h - 3 Chế độ Nóng / Lạnh / Nguội',
      inverter: false,
      origin: 'Việt Nam',
      warranty: 'Bảo hành 36 tháng chính hãng',
      specs: [
        '3 chế độ nước: Nóng (85-95°C) - Lạnh (8-10°C) - Tinh khiết',
        'Công nghệ làm lạnh Block cực nhanh và sâu',
        'Công nghệ VoiceSmart cảnh báo thông minh',
        'Tiết kiệm 30% điện năng tiêu thụ'
      ],
      description: 'Máy lọc nước Nóng Lạnh Karofi KAQ-D36S làm lạnh sâu bằng Block, pha trà cà phê tiện lợi cho gia đình và văn phòng.'
    },
    {
      slug: 'may-loc-nuoc-karofi-n-e118',
      name: 'Máy lọc nước Tiêu chuẩn Karofi N-E118 (10 Lõi)',
      brand: 'Karofi',
      category: 'may-loc-nuoc',
      price: 'Liên hệ báo giá ưu đãi',
      image: imageMap.mayLocNuocNE118,
      capacity: 'Công suất lọc 10 lít/giờ',
      inverter: false,
      origin: 'Việt Nam',
      warranty: 'Bảo hành 24 tháng chính hãng',
      specs: [
        'Màng lọc RO Filmtec nhập khẩu Mỹ',
        '10 lõi lọc chức năng bổ sung vi khoáng',
        'Lọc sạch tạp chất, hóa chất, clo dư trong nước',
        'Nước uống trực tiếp không cần nấu sôi'
      ],
      description: 'Máy lọc nước tiêu chuẩn Karofi N-E118 mang lại nguồn nước tinh khiết ngọt mát cho gia đình tại Phú Quốc.'
    }
  ];

  // Write updated products.json
  const jsonPath = path.join(rootDir, 'data', 'products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf8');
  console.log(`\n💾 Saved ${products.length} updated products into data/products.json`);

  // Sync to Supabase Database table "products"
  console.log('\n📌 Syncing all updated products to Supabase Database...');
  for (const prod of products) {
    const payload = {
      slug: prod.slug,
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
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
    else console.log(`  ✓ Synced DB product: ${prod.slug}`);
  }

  console.log('\n🎉 Finished uploading all assets to Supabase Storage & syncing DB!');
}

main().catch(console.error);
