import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');

const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));

const postUpdates = {
  'sua-may-lanh-phu-quoc-7-dau-hieu-can-goi-tho-ngay': {
    excerpt: 'Tổng hợp 7 dấu hiệu cảnh báo máy lạnh bị hỏng cần thợ kiểm tra gấp tại Phú Quốc: kém lạnh, chảy nước, có mùi khét, tự ngắt...',
    intro: 'Nhận biết sớm 7 dấu hiệu hỏng hóc ở điều hòa giúp gia đình và cơ sở kinh doanh tại Phú Quốc chủ động khắc phục, tránh nguy cơ hư hỏng nặng và tốn kém chi phí.',
  },
  'bao-lau-nen-ve-sinh-may-lanh-mot-lan-tai-phu-quoc': {
    excerpt: 'Hướng dẫn tần suất vệ sinh máy lạnh chuẩn cho hộ gia đình, homestay, resort tại Phú Quốc giúp tiết kiệm điện và tăng tuổi thọ thiết bị.',
    intro: 'Khí hậu ven biển Phú Quốc với nhiều bụi bẩn và hơi muối đòi hỏi lịch bảo trì vệ sinh điều hòa định kỳ hợp lý để giữ luồng khí trong lành và tiết kiệm điện.',
  },
  'dau-hieu-may-lanh-thieu-gas-va-quy-trinh-bom-gas-chuan': {
    excerpt: 'Nhận biết sớm các dấu hiệu máy lạnh hết gas, rò rỉ gas và quy trình nạp gas R32, R410A chuẩn kỹ thuật an toàn tại Phú Quốc.',
    intro: 'Máy lạnh thiếu gas không chỉ làm giảm khả năng làm lạnh mà còn khiến máy nén hoạt động quá tải. Tìm hiểu cách chẩn đoán và quy trình nạp gas chuẩn kỹ thuật.',
  },
  '7-meo-tiet-kiem-dien-khi-dung-may-lanh-tai-phu-quoc': {
    excerpt: 'Bật mí 7 mẹo đơn giản giúp giảm 30% tiền điện điều hòa hàng tháng tại Phú Quốc mà vẫn giữ phòng mát sâu, êm ái.',
    intro: 'Thời tiết nắng nóng quanh năm tại Phú Quốc khiến hóa đơn tiền điện tăng cao. Áp dụng 7 mẹo vận hành điều hòa thông minh giúp tối ưu chi phí hiệu quả.',
  },
  'kinh-nghiem-chon-may-lanh-chong-an-mon-muoi-bien-tai-phu-quoc': {
    excerpt: 'Kinh nghiệm chọn mua điều hòa có lá tản nhiệt mạ vàng, vỏ chống ăn mòn muối biển phù hợp cho nhà ở và resort ven biển Phú Quốc.',
    intro: 'Môi trường hơi muối biển tại Phú Quốc dễ làm rỉ sét dàn nóng điều hòa. Khám phá các công nghệ tản nhiệt mạ vàng BlueFin, GoldFin bảo vệ thiết bị bền lâu.',
  },
  'vi-sao-may-lanh-chay-nuoc-va-cach-xu-ly-an-toan': {
    excerpt: 'Nguyên nhân máy lạnh chảy nước tràn tường và hướng dẫn cách xử lý tạm thời an toàn trước khi kỹ thuật viên đến hỗ trợ.',
    intro: 'Máy lạnh chảy nước ngấm tường gây mốc và nguy cơ chập điện. Tìm hiểu các nguyên nhân tắc ống thoát nước, bẩn dàn và cách khắc phục triệt để.',
  },
  'co-nen-mua-may-lanh-inverter-tai-phu-quoc': {
    excerpt: 'Phân tích ưu nhược điểm của máy lạnh Inverter tiết kiệm điện khi sử dụng tại Phú Quốc: khi nào nên mua và lưu ý bảo dưỡng.',
    intro: 'Máy lạnh Inverter có thực sự tiết kiệm điện như lời đồn trong điều kiện thời tiết nắng nóng tại Phú Quốc? Cùng Điện Lạnh Sơn Phát phân tích chi tiết.',
  },
  'cac-loi-may-lanh-thuong-gap-mua-nang-nong-o-phu-quoc': {
    excerpt: 'Điểm qua những sự cố máy lạnh phổ biến trong mùa nắng cao điểm Phú Quốc và biện pháp khắc phục sự cố nhanh chóng.',
    intro: 'Vào mùa nắng nóng đỉnh điểm tại Phú Quốc, tần suất sử dụng điều hòa tăng đột biến dễ dẫn đến sự cố quá tải. Hãy trang bị kiến thức xử lý nhanh.',
  },
  'quy-trinh-bao-tri-may-lanh-cho-homestay-va-resort-tai-phu-quoc': {
    excerpt: 'Giải pháp bảo trì máy lạnh định kỳ trọn gói cho homestay, khách sạn, resort Phú Quốc giúp duy trì trải nghiệm tốt nhất cho du khách.',
    intro: 'Đối với homestay, resort tại Phú Quốc, sự cố điều hòa ảnh hưởng trực tiếp đến đánh giá của khách hàng. Tìm hiểu quy trình bảo trì chuyên nghiệp trọn gói.',
  },
  'cach-chon-don-vi-dien-lanh-uy-tin-tai-phu-quoc': {
    excerpt: 'Tiêu chí lựa chọn dịch vụ điện lạnh uy tín, thợ giỏi, báo giá minh bạch và có bảo hành chu đáo tại đảo Phú Quốc.',
    intro: 'Lựa chọn đúng trung tâm sửa chữa điện lạnh uy tín tại Phú Quốc giúp bạn an tâm về chất lượng, linh kiện chính hãng và chính sách bảo hành rõ ràng.',
  },
};

let count = 0;
for (const post of posts) {
  if (postUpdates[post.slug]) {
    post.excerpt = postUpdates[post.slug].excerpt;
    post.content = post.content.replace(
      /## Mở đầu\n\nPhú Quốc có nhịp sử dụng điều hòa rất khác đất liền: nắng nóng kéo dài, độ ẩm cao, nhiều công trình gần biển và lượng khách lưu trú biến động theo mùa\. Vì vậy, một thiết bị vẫn chạy chưa chắc đang vận hành hiệu quả\. Với hộ gia đình, villa, homestay, resort và khách sạn, kiểm tra đúng thời điểm giúp giữ phòng mát ổn định, hạn chế gián đoạn trải nghiệm của khách và tránh khoản sửa lớn phát sinh bất ngờ\. Cơ Điện Lạnh Sơn Phát phục vụ các khu vực Dương Đông, An Thới, Bãi Trường, Cửa Cạn, Hàm Ninh và Gành Dầu, ưu tiên khảo sát tình trạng thực tế thay vì kết luận chỉ qua một triệu chứng\./,
      `## Mở đầu\n\n${postUpdates[post.slug].intro}`
    );
    count++;
  }
}

fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
console.log(`✅ Updated ${count} blog posts with unique excerpts & intros!`);
