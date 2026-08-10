# SEO Fix Task - dienlanhsonphat.io.vn

## Website

https://www.dienlanhsonphat.io.vn

## Goal

Khắc phục toàn bộ các lỗi SEO được Seobility cảnh báo, ưu tiên các lỗi ảnh hưởng trực tiếp đến khả năng xếp hạng Google.

---

# 1. Meta Title quá dài

## Hiện tại

Cơ điện lạnh Sơn Phát - Sửa Máy Lạnh Tận Nơi Tại Phú Quốc | Hotline 0961 316 346

Chiều dài:

- 771px
- Vượt ngưỡng khuyến nghị 580px

## Yêu cầu

Rút gọn title còn khoảng 50-60 ký tự.

### Đề xuất

Option 1:

```html
<title>Sửa Máy Lạnh Phú Quốc | Điện Lạnh Sơn Phát</title>
```

Option 2:

```html
<title>Điện Lạnh Sơn Phát - Sửa Máy Lạnh Phú Quốc</title>
```

Option 3:

```html
<title>Sửa Máy Lạnh Tại Phú Quốc | Hotline 0961 316 346</title>
```

Ưu tiên Option 1.

---

# 2. Meta Description quá dài

## Hiện tại

Dịch vụ sửa chữa, vệ sinh & lắp đặt điện lạnh chuyên nghiệp tại Phú Quốc. Phục vụ nhanh sau 20 phút tại Dương Đông, Bãi Trường, An Thới. Thợ giỏi, báo giá công khai, bảo hành 3-12 tháng.

Chiều dài:

- 1185px
- Vượt giới hạn 1000px

## Yêu cầu

Rút còn khoảng 140-155 ký tự.

### Đề xuất

```html
<meta
  name="description"
  content="Sửa máy lạnh, vệ sinh và lắp đặt điện lạnh tại Phú Quốc. Hỗ trợ nhanh, báo giá rõ ràng, bảo hành dài hạn. Hotline 0961 316 346."
/>
```

---

# 3. Thiếu Canonical URL

## Hiện trạng

Seobility báo lỗi Canonical Link.

## Yêu cầu

Thêm vào <head>

```html
<link rel="canonical" href="https://www.dienlanhsonphat.io.vn/" />
```

Nếu dùng Next.js App Router:

```tsx
export const metadata = {
  alternates: {
    canonical: "https://www.dienlanhsonphat.io.vn",
  },
};
```

---

# 4. Nội dung bị Duplicate

## Hiện trạng

Seobility phát hiện:

"Phú Quốc có nhịp sử dụng điều hòa rất khác đất liền..."

xuất hiện nhiều lần.

## Yêu cầu

Agent cần:

- Scan toàn bộ homepage
- Tìm các đoạn text bị render lặp
- Kiểm tra:
  - FAQ
  - Service Cards
  - SEO Sections
  - Blog Preview
  - Hidden Mobile Layout

Đảm bảo mỗi đoạn nội dung chỉ xuất hiện một lần.

---

# 5. Quá nhiều Heading

## Hiện trạng

70 headings

Seobility đánh giá quá nhiều so với 3189 từ.

## Yêu cầu

Giảm xuống khoảng:

- 1 H1
- 6–10 H2
- 10–20 H3

### Cần kiểm tra

Các component:

- ServiceCard
- FAQ
- FeatureCard
- Hero
- Testimonials
- BlogPreview

Không dùng:

```html
<h2>
  <h3></h3>
</h2>
```

cho mọi card nhỏ.

Đổi thành:

```html
<div>
  <span> <p></p></span>
</div>
```

nếu không phải tiêu đề nội dung chính.

---

# 6. H1 chưa chứa đủ từ khóa

## Hiện tại

```html
<h1>Dịch vụ điện lạnh chuyên nghiệp tại Phú Quốc</h1>
```

## Đề xuất

```html
<h1>Sửa Máy Lạnh, Điện Lạnh Chuyên Nghiệp Tại Phú Quốc</h1>
```

hoặc

```html
<h1>Dịch Vụ Sửa Máy Lạnh Tận Nơi Tại Phú Quốc</h1>
```

---

# 7. Internal Link Anchor bị trùng

## Hiện trạng

Nhiều anchor text giống nhau.

## Yêu cầu

Đa dạng hóa anchor text.

Ví dụ:

Không dùng:

```text
Xem thêm
Xem thêm
Xem thêm
Xem thêm
```

Thay bằng:

```text
Chi tiết dịch vụ
Tìm hiểu thêm
Xem bảng giá
Xem quy trình sửa chữa
```

---

# 8. X-Powered-By Header đang bị lộ

## Hiện trạng

Response header gửi:

```http
X-Powered-By: Next.js
```

## Yêu cầu

Ẩn header này.

### next.config.ts

```ts
const nextConfig = {
  poweredByHeader: false,
};

export default nextConfig;
```

---

# 9. Bổ sung Structured Data

Hiện tại:

No additional markup found

## Yêu cầu

Thêm JSON-LD:

### LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Điện Lạnh Sơn Phát",
  "telephone": "0961316346",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Phú Quốc",
    "addressCountry": "VN"
  }
}
```

### FAQ Schema

Tự động generate từ section FAQ.

---

# 10. Social Sharing

## Hiện trạng

Thiếu Social Media Signals.

## Yêu cầu

Thêm:

### OpenGraph

```html
<meta property="og:title" />
<meta property="og:description" />
<meta property="og:image" />
<meta property="og:url" />
```

### Twitter

```html
<meta name="twitter:card" />
<meta name="twitter:title" />
<meta name="twitter:description" />
<meta name="twitter:image" />
```

---

# 11. Tối ưu Local SEO

Bổ sung thêm các keyword tự nhiên:

- sửa máy lạnh phú quốc
- điện lạnh phú quốc
- vệ sinh máy lạnh phú quốc
- nạp gas máy lạnh phú quốc
- sửa điều hòa phú quốc
- thợ điện lạnh phú quốc

Mỗi keyword xuất hiện:

- 2–4 lần
- phân bổ tự nhiên trong nội dung

Không nhồi nhét.

---

# 12. Tăng Trust Signals

Thêm section:

## Vì sao chọn Sơn Phát

- Có mặt nhanh 20–30 phút
- Báo giá trước khi sửa
- Bảo hành 3–12 tháng
- Kỹ thuật viên nhiều kinh nghiệm
- Hỗ trợ tất cả khu vực Phú Quốc

---

# 13. Backlink Strategy

Hiện tại:

- 1 referring domain
- 1 backlink

## Kế hoạch

Tạo hồ sơ doanh nghiệp:

- Google Business Profile
- Cốc Cốc Map
- Bing Places
- Facebook Page
- Zalo OA

Đăng bài trên:

- Blogspot
- Medium
- WordPress
- Các diễn đàn địa phương Phú Quốc

Mục tiêu:

- 20+ referring domains
- 50+ backlinks trong 60 ngày

---

# Acceptance Criteria

- Meta Title < 60 ký tự
- Meta Description 140–155 ký tự
- Canonical hoạt động
- Không còn duplicate content
- Heading giảm từ 70 xuống dưới 25
- H1 chứa từ khóa chính
- Ẩn X-Powered-By
- Có LocalBusiness Schema
- Có FAQ Schema
- Có OpenGraph
- Điểm Seobility >= 90%
