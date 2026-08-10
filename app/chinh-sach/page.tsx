import React from 'react';
import { getSiteConfig } from '@/lib/data';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Dịch Vụ - Cơ Điện Lạnh Sơn Phát Phú Quốc',
  description: 'Quy định chính sách dịch vụ, cam kết chất lượng, nguyên tắc báo giá và bảo vệ quyền lợi khách hàng.',
};

export default function PolicyPage() {
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-12 max-w-4xl mx-auto px-4">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          ĐIỀU KHOẢN & QUY ĐỊNH
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Chính Sách Dịch Vụ Điện Lạnh
        </h1>
        <p className="text-sm text-slate-600">
          Cam kết minh bạch, trung thực vì sự hài lòng tuyệt đối của khách hàng.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-500" />
            <span>1. Chính sách báo giá & Phí dịch vụ</span>
          </h2>
          <p>
            - Tất cả chi phí sửa chữa, thay thế linh kiện và nạp gas đều được niêm yết rõ ràng và kỹ thuật viên có nghĩa vụ báo giá chi tiết cho khách hàng trước khi thi công.
          </p>
          <p>
            - Phí kiểm tra tại nhà hoàn toàn MIỄN PHÍ khi khách hàng chọn khắc phục sự cố tại Sơn Phát.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-500" />
            <span>2. Cam kết về linh kiện thay thế</span>
          </h2>
          <p>
            - 100% linh kiện thay thế (tụ quạt, tụ block, mắt nhận, board mạch, van tiết lưu, linh kiện tản nhiệt) đều là hàng chính hãng hoặc tương đương chất lượng cao.
          </p>
          <p>
            - Khách hàng có quyền nghiệm thu linh kiện mới trước khi thợ tiến hành thay vào máy.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-500" />
            <span>3. Thời gian phản hồi & Có mặt</span>
          </h2>
          <p>
            - Trong bán kính các khu vực nội ô Phú Quốc (Dương Đông, An Thới, Bãi Trường), kỹ thuật viên cam kết có mặt từ 20 đến 30 phút sau khi xác nhận đơn hàng.
          </p>
        </div>
      </div>
    </div>
  );
}
