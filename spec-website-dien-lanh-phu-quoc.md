# Spec website dịch vụ điện lạnh Phú Quốc

## Mục tiêu

Xâ©¬dựng website marketing giới thiệu dịch vụ, sản phẩm và blog để kéo traffic, thu lead qua form, gọi điện, Zalo và Facebook. Không có database, không dashboard, không cập nhật trạng thái. Toàn bộ dữ liệu dịch vụ, sản phẩm, blog được fix cứng trong file JSON/TS.

## Phạm vi

- Public website: Trang chủ, Dịch vụ, Sản phẩm, Blog, Giới thiệu, Liên hệ, Chính sách, Bảo hành.
- Form yêu cầu dịch vụ: gửi email/Telegram/Google Sheet, không lưu DB.
- SEO cơ bản: metadata động, sitemap, robots, JSON-LD LocalBusiness.
- Không có login, tài khoản khách, giỏ hàng, thanh toán, dashboard.

## Tech Stack

- **Next.js 14+** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Vercel** deploy
- **Resend** hoặc **Nodemailer** cho form
- **Google Analytics 4** + **Search Console**

## Cấu trúc dữ liệu

```
/data
  siteConfig.json
  services.json
  products.json
  posts.json
```

### siteConfig.json

```json
{
  "brandName": "Cơ điện lạnh Sơn Phát",
  "hotline": "09613163346",
  "address": "CMT8, Duong Dong, Phu Quoc",
  "hours": "7:00 - 17:00",
  "facebook": "https://www.facebook.com/ienlanhthanhson.483076",
  "serviceAreas": ["Duong Dong", "An Thoi", "Bai Truong", "Cua Can"],
  "warranty": "Bao hanh dich vu sau sua",
  "themeColor": "#1E88E5"
}
```

### services.json

```json
[
  {
    "slug": "sua-may-lanh",
    "title": "Sua may lanh tai Phu Quoc",
    "description": "Dich vu sua may lanh tan noi, den nhanh, bao hanh sau sua.",
    "features": ["Den nhanh", "Gia tot", "Tho nhieu kinh nghiem"],
    "priceFrom": "Lien he"
  },
  {
    "slug": "ve-sinh-may-lanh",
    "title": "Ve sinh may lanh",
    "description": "Ve sinh sau, bom ga chinh hang, bao hanh dai han.",
    "features": ["Ve sinh sau", "Bom ga chinh hang", "Bao hanh dai han"],
    "priceFrom": "Lien he"
  },
  {
    "slug": "lap-dat-may-lanh",
    "title": "Lap dat / thao lap may lanh",
    "description": "Khaosat tai nha, lap dat dung chuan, ho tro chon may.",
    "features": ["Khaosat tai nha", "Lap dat dung chuan", "Ho tro chon may"],
    "priceFrom": "Lien he"
  }
]
```

### products.json

```json
[
  {
    "slug": "may-lanh-mono-1hp",
    "name": "May lanh Mono 1HP",
    "brand": "Daikin",
    "price": "Lien he",
    "image": "/images/products/mono-1hp.jpg",
    "specs": ["1HP", "Inverter: Khong", "Phong duoi 15m2"]
  },
  {
    "slug": "may-lanh-inverter-1-5hp",
    "name": "May lanh Inverter 1.5HP",
    "brand": "Panasonic",
    "price": "Lien he",
    "image": "/images/products/inverter-1-5hp.jpg",
    "specs": ["1.5HP", "Inverter: Co", "Tiet kiem dien"]
  }
]
```

### posts.json

```json
[
  {
    "slug": "dau-hieu-can-sua-may-lanh",
    "title": "Dau hieu can sua may lanh tai Phu Quoc",
    "excerpt": "May lanh khong lanh, chay nuoc, keu to, co hoi nong... can goi tho ngay.",
    "content": "...",
    "date": "2026-08-09",
    "category": "Sua may lanh"
  },
  {
    "slug": "kinh-nghiem-chon-may-lanh-cho-phong-15m2",
    "title": "Kinh nghiem chon may lanh cho phong 15m2",
    "excerpt": "Chon 1HP hay 1.5HP, inverter hay non-inverter, thuong hieu nao.",
    "content": "...",
    "date": "2026-08-08",
    "category": "Tu van"
  }
]
```

## Routing

```
/
/dich-vu/[slug]
/san-pham/[slug]
/blog/[slug]
/gioi-thieu
/lien-he
/chinh-sach
/bao-hanh
```

## Components chính

- **Header**: Logo, nav, hotline, Zalo, Facebook.
- **Footer**: Thong tin lien he, dich vu, san pham, chinh sach.
- **StickyCTA**: Nuts goi va Zalo sticky mobile.
- **ServiceCard**: Hien thi dich vu tren homepage.
- **ProductCard**: Hien thi san pham tren homepage.
- **BlogCard**: Hien thi bai blog tren homepage.
- **ContactForm**: Form yeu cau dich vu.
- **MapSection**: Google Maps embed.

## Form yêu cầu dịch vụ

API route:

```ts
POST /api/request
{
  fullName: string
  phone: string
  service: string
  address: string
  message?: string
  preferredTime?: string
}
```

Xu ly:

1. Validate server-side.
2. Gui email/Telegram cho chu shop.
3. Tra ve success message.
4. Khong luu DB.

## SEO

- Metadata dong theo slug.
- sitemap.xml va robots.txt.
- JSON-LD LocalBusiness:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Co dien lanh Son Phat",
  "telephone": "09613163346",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "CMT8, Duong Dong, Phu Quoc"
  },
  "openingHours": "Mo-Su 07:00-17:00",
  "areaServed": ["Duong Dong", "An Thoi", "Bai Truong", "Cua Can"]
}
```

## Build Order

1. Setup layout chung: header, footer, sticky CTA, theme color.
2. Homepage theo ref: hero, dich vu, san pham, blog, CTA, FAQ.
3. Dynamic route cho dich vu: /dich-vu/[slug].
4. Blog: /blog, /blog/[slug], category/tag neu can.
5. San pham: /san-pham, /san-pham/[slug]; chi catalog + nut lien he.
6. Form API va notification.
7. SEO: metadata, sitemap, robots, OG image, JSON-LD.
8. Deploy domain, gan GA4/Search Console va test toan bo CTA.

## Form yêu cầu dịch vụ

API route:

```ts
POST /api/request
{
  fullName: string
  phone: string
  service: string
  address: string
  message?: string
  preferredTime?: string
}
```

Xu ly:

1. Validate server-side.
2. Gui email/Telegram cho chu shop (neu co config).
3. Gui tin nhan Zalo OA cho shop (neu co config).
4. Tra ve success message.
5. Khong luu DB.

## Zalo OA notification

- Neu co bien moi truong `ZALO_OA_ACCESS_TOKEN` va `ZALO_OA_RECIPIENT`:
  - Goi Zalo OA API de gui tin nhan thong bao khi co yeu cau moi.
  - Noi dung tin nhan gom:
    - Ho ten khach
    - So dien thoai
    - Dich vu can ho tro
    - Dia chi
    - Loi nhan / thoi gian mong muon
- Neu khong co config Zalo OA:
  - Chi log ra console, van tra ve success message cho client.

Vi du noi dung tin nhan Zalo:

```text
[Yeu cau moi]
Khach: Nguyen Van A
Dien thoai: 0901234567
Dich vu: Sua may lanh
Dia chi: Duong Dong, Phu Quoc
Loi: May khong lanh
Thoi gian: 14:00 - 16:00
```

## Notes

- Toan bo data fix cung trong JSON/TS.
- Khong can database, khong admin.
- Muon sua noi dung phai edit file.
- Chi phu hop khi khach khong can tu update.
