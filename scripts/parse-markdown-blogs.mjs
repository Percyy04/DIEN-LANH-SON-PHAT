import fs from 'fs';
import path from 'path';

const mdPath = path.join(process.cwd(), '10-bai-blog-seo-local-co-dien-lanh-son-phat-phu-quoc.md');
const jsonPath = path.join(process.cwd(), 'data', 'posts.json');

const rawMd = fs.readFileSync(mdPath, 'utf-8');

// Split by '## Bài '
const sections = rawMd.split(/(?=## Bài \d+:)/);

const metaMap = [
  {
    slug: 'sua-may-lanh-phu-quoc-7-dau-hieu-can-goi-tho-ngay',
    category: 'Sửa máy lạnh',
    author: 'KTV Sơn Phát',
    readTime: '6 phút đọc',
    image: '/images/sua_1.jpg',
    date: '2026-08-10'
  },
  {
    slug: 'bao-lau-nen-ve-sinh-may-lanh-mot-lan-tai-phu-quoc',
    category: 'Vệ sinh máy lạnh',
    author: 'KTV Sơn Phát',
    readTime: '5 phút đọc',
    image: '/images/sua_2.jpg',
    date: '2026-08-09'
  },
  {
    slug: 'dau-hieu-may-lanh-thieu-gas-va-quy-trinh-bom-gas-chuan',
    category: 'Bơm gas máy lạnh',
    author: 'KTV Sơn Phát',
    readTime: '5 phút đọc',
    image: '/images/sua_3.jpg',
    date: '2026-08-08'
  },
  {
    slug: '7-meo-tiet-kiem-dien-khi-dung-may-lanh-tai-phu-quoc',
    category: 'Tư vấn sử dụng',
    author: 'KTV Sơn Phát',
    readTime: '5 phút đọc',
    image: '/images/lap_1.jpg',
    date: '2026-08-07'
  },
  {
    slug: 'kinh-nghiem-chon-may-lanh-chong-an-mon-muoi-bien-tai-phu-quoc',
    category: 'Tư vấn mua sắm',
    author: 'KTV Sơn Phát',
    readTime: '6 phút đọc',
    image: '/images/lap_2.jpg',
    date: '2026-08-06'
  },
  {
    slug: 'vi-sao-may-lanh-chay-nuoc-va-cach-xu-ly-an-toan',
    category: 'Sửa máy lạnh',
    author: 'KTV Sơn Phát',
    readTime: '5 phút đọc',
    image: '/images/sua_4.jpg',
    date: '2026-08-05'
  },
  {
    slug: 'co-nen-mua-may-lanh-inverter-tai-phu-quoc',
    category: 'Tư vấn mua sắm',
    author: 'KTV Sơn Phát',
    readTime: '5 phút đọc',
    image: '/images/lap_3.jpg',
    date: '2026-08-04'
  },
  {
    slug: 'cac-loi-may-lanh-thuong-gap-mua-nang-nong-o-phu-quoc',
    category: 'Sửa máy lạnh',
    author: 'KTV Sơn Phát',
    readTime: '6 phút đọc',
    image: '/images/sua_1.jpg',
    date: '2026-08-03'
  },
  {
    slug: 'quy-trinh-bao-tri-may-lanh-cho-homestay-va-resort-tai-phu-quoc',
    category: 'Bảo trì dự án',
    author: 'KTV Sơn Phát',
    readTime: '7 phút đọc',
    image: '/images/lap_4.jpg',
    date: '2026-08-02'
  },
  {
    slug: 'cach-chon-don-vi-dien-lanh-uy-tin-tai-phu-quoc',
    category: 'Kinh nghiệm chọn thợ',
    author: 'KTV Sơn Phát',
    readTime: '6 phút đọc',
    image: '/images/sua_2.jpg',
    date: '2026-08-01'
  }
];

const posts = [];

for (let i = 0; i < metaMap.length; i++) {
  const meta = metaMap[i];
  // find section starting with ## Bài (i+1):
  const targetHeader = `## Bài ${i + 1}:`;
  const sec = sections.find(s => s.startsWith(targetHeader));

  if (!sec) {
    console.error(`Could not find section for ${targetHeader}`);
    continue;
  }

  // Lines in section
  const lines = sec.trim().split('\n');
  
  // Extract Title (Line with `# Title` or header after `## Bài X: Title`)
  let title = '';
  let fullContentLines = [];

  for (let l of lines) {
    if (l.startsWith('# ') && !title) {
      title = l.replace('# ', '').trim();
    } else if (!l.startsWith('## Bài ')) {
      fullContentLines.push(l);
    }
  }

  const content = fullContentLines.join('\n').trim();

  // Extract Excerpt (first paragraph under ## Mở đầu or first real text line)
  const moDauIdx = content.indexOf('## Mở đầu');
  let excerpt = '';
  if (moDauIdx !== -1) {
    const afterMoDau = content.substring(moDauIdx + 9).trim();
    const firstPara = afterMoDau.split('\n\n')[0].replace(/\n/g, ' ').trim();
    excerpt = firstPara.substring(0, 160) + '...';
  } else {
    excerpt = content.split('\n\n')[0].substring(0, 160) + '...';
  }

  posts.push({
    slug: meta.slug,
    title: title || meta.slug,
    excerpt,
    date: meta.date,
    category: meta.category,
    author: meta.author,
    readTime: meta.readTime,
    image: meta.image,
    content: content
  });
}

fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf-8');
console.log(`Successfully parsed ${posts.length} blog posts into ${jsonPath}!`);
