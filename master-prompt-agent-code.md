# Master Prompt — Agent Code Website Điện Lạnh Phú Quốc

Bạn là một senior full‑stack engineer chuyên Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui.

Nhiệm vụ:

- Đọc file spec: `spec-website-dien-lanh-phu-quoc.md` trong repo này.
- Tạo một dự án Next.js 14+ hoàn chỉnh theo đúng spec, không thêm tính năng ngoài phạm vi.
- Code sạch, đúng chuẩn UI/UX theo rules trong `.antigravity/skills/impeccable` (nếu có).
- Fix cứng toàn bộ data trong file JSON/TS, không database, không admin, không login.

Yê©¬u cầu chi tiết:

## 1. Khởi tạo dự án

- Next.js 14+ (App Router) + TypeScript.
- Tailwind CSS + shadcn/ui.
- Cấu trúc thư mục rõ ràng, dễ đọc.
- Đảm bảo responsive mobile‑first, performance tốt.

## 2. Dữ liệu

- Tạo thư mục `/data` với các file:
  - `siteConfig.json`
  - `services.json`
  - `products.json`
  - `posts.json`
- Nội dung JSON lấy đúng từ spec, thương hiệu là **"Cơ điện lạnh Sơn Phát"**.
- Toàn bộ content dịch vụ, sản phẩm, blog đọc từ các file này, không hard‑code trong component.
- Nếu chưa có ảnh thật, dùng placeholder (ví¤¤ `https://via.placeholder.com/600x400?text=May+lanh`).

## 3. Routing

Triển khai đúng các route sau:

- `/` – Trang chủ
- `/dich-vu/[slug]` – Chi tiết dịch vụ
- `/san-pham/[slug]` – Chi tiết sản phẩm
- `/blog/[slug]` – Chi tiết bài viết
- `/gioi-thieu`
- `/lien-he`
- `/chinh-sach`
- `/bao-hanh`

Tất cả slug đều ánh xạ theo data trong JSON.

## 4. Components

Triển khai các components chính:

- `Header`: logo, nav, hotline, Zalo, Facebook.
- `Footer`: thông tin liên hệ, dịch vụ, sản phẩm, chính sách.
- `StickyCTA`: nút gọi và Zalo sticky trên mobile.
- `ServiceCard`, `ProductCard`, `BlogCard`: hiển thị danh sách trên homepage.
- `ContactForm`: form yêu cầu dịch vụ.
- `MapSection`: Google Maps embed.

Tuần thủ guidelines UI/UX trong `.antigravity/skills/impeccable` về spacing, typography, màu sắc, hover/focus states.

## 5. Form yêu cầu dịch vụ

- API route: `POST /api/request`
- Body:
  - `fullName` (string, bắt buộc)
  - `phone` (string, bắt buộc)
  - `service` (string, bắt buộc)
  - `address` (string, bắt buộc)
  - `message?` (string)
  - `preferredTime?` (string)
- Xử lý:
  - Validate server‑side đầy đủ.
  - Nếu đã config Resend/Nodemailer thì gửi email/Telegram cho chủ shop.
  - Nếu đã config Zalo OA (`ZALO_OA_ACCESS_TOKEN`, `ZALO_OA_RECIPIENT`) thì gửi tin nhắn Zalo OA cho shop.
  - Nếu chưa có config, log ra console và trả về success message.
  - Không lưu database.
- Sau khi submit:
  - Hiển thị lời cảm ơn.
  - Có nút gọi ngay và Zalo để khách cần gấp liên hệ trực tiếp.

## 5.1. Zalo OA notification (tỳ chọn)

- Nếu có biến môi trường:
  - `ZALO_OA_ACCESS_TOKEN`
  - `ZALO_OA_RECIPIENT` (số điện thoại hoặc user_id nhận tin)
- Thì gọi Zalo OA API để gửi tin nhắn thông báo khi có yêu cầu mới.
- Nội dung tin nhắn gồm:
  - Họ tên khách
  - Số điện thoại
  - Dịch vụ cần hỗ trợ
  - Địa chỉ
  - Lời nhắn / thời gian mong muốn
- Nếu không có config Zalo OA:
  - Chỉ log ra console, vẫn trả về success message cho client.

Ví¤¤ nội dung tin nhắn Zalo:

```text
[Yeu cau moi]
Khach: Nguyen Van A
Dien thoai: 0901234567
Dich vu: Sua may lanh
Dia chi: Duong Dong, Phu Quoc
Loi: May khong lanh
Thoi gian: 14:00 - 16:00
```

## 6. SEO

- Metadata động theo slug cho:
  - Trang chủ
  - Mỗi trang dịch vụ
  - Mỗi sản phẩm
  - Mỗi bài blog
- Tạo:
  - `sitemap.xml`
  - `robots.txt`
- Thêm JSON‑LD `LocalBusiness` vào trang chủ theo đúng mẫu trong spec, với:
  - `"name": "Co dien lanh Son Phat"`
  - Thông tin hotline, địa chỉ, giờ làm, khu vực phục vụ đúng spec.
- Đảm bảo mỗi trang có:
  - `<title>`
  - `<meta name="description">`
  - Open Graph tags cơ bản.

## 7. Build order ưu tiên

Thực hiện tuần tự:

1. Setup layout chung: header, footer, sticky CTA, theme color.
2. Homepage theo spec: hero, dịch vụ, sản phẩm, blog, CTA, FAQ.
3. Dynamic route cho dịch vụ: `/dich-vu/[slug]`.
4. Blog: `/blog`, `/blog/[slug]`, category/tag nếu cần.
5. Sản phẩm: `/san-pham`, `/san-pham/[slug]`; chỉ catalog + nút liên hệ.
6. Form API và notification.
7. SEO: metadata, sitemap, robots, OG image, JSON‑LD.
8. Chuẩn bị deploy trên Vercel, để sẵn các biến môi trường cho email/Telegram/Zalo OA (nếu có).

## 8. Rà©¬ng buộc

- Không thêm:
  - Login, đăng ký, tài khoản khách.
  - Giỏ hàng, thanh toán.
  - Dashboard, quản lý lead, cập nhật trạng thái.
- Không dùng database.
- Mọi thay đổi nội dung đều qua việc sửa file JSON/TS.
- Code phải chạy được ngay sau khi cài dependency (`npm install` + `npm run dev`).

## 9. Output mong đợi

- Repo chứa:
  - Dự án Next.js hoàn chỉnh.
  - File spec `spec-website-dien-lanh-phu-quoc.md`.
  - Thư mục `/data` với đầy đủ JSON.
  - Các trang, components, API route đúng spec.
- Khi chạy `npm run dev`, website mở ra với:
  - Trang chủ đầy đủ sections.
  - Các trang dịch vụ, sản phẩm, blog hoạt động.
  - Form gửi yêu cầu hoạt động (tối thiểu là log console + message success).
  - SEO cơ bản đã cấu hình.

Bắt đầu bằng việc:

1. Đọc kỹ `spec-website-dien-lanh-phu-quoc.md`.
2. Liệt kê ngắn gọn các bước bạn sẽ làm (3–8 gạch đầu dòng).
3. Sau đó tiến hành tạo/sửa file và code luôn theo plan.
