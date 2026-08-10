import React from 'react';
import { getSiteConfig } from '@/lib/data';
import { ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Bảo Hành - Cơ Điện Lạnh Sơn Phát Phú Quốc',
  description: 'Cam kết bảo hành chu đáo từ 3 đến 12 tháng sau khi sửa chữa máy lạnh tại Sơn Phát Phú Quốc. Hỗ trợ sự cố nhanh chóng.',
};

export default function WarrantyPage() {
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-12 max-w-4xl mx-auto px-4">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
          CAM KẾT UY TÍN
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Chính Sách Bảo Hành Dịch Vụ
        </h1>
        <p className="text-sm text-slate-600">
          Bảo vệ quyền lợi tối đa cho khách hàng sử dụng dịch vụ tại Phú Quốc.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-900 font-medium">
            Mọi dịch vụ sửa chữa và linh kiện thay thế tại Sơn Phát đều được xuất phiếu bảo hành từ <span className="font-extrabold">3 tháng đến 12 tháng</span>.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Thời Hạn Bảo Hành Cụ Thể</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex justify-between py-2 border-b border-slate-100">
              <span>Sửa máy lạnh chảy nước, thông ống thoát</span>
              <span className="font-bold text-emerald-600">Bảo hành 3 tháng</span>
            </li>
            <li className="flex justify-between py-2 border-b border-slate-100">
              <span>Thay Tụ quạt, Tụ nén block, Cảm biến nhiệt</span>
              <span className="font-bold text-emerald-600">Bảo hành 6 tháng</span>
            </li>
            <li className="flex justify-between py-2 border-b border-slate-100">
              <span>Sửa board mạch điện tử, Thay Block mới</span>
              <span className="font-bold text-emerald-600">Bảo hành 6 - 12 tháng</span>
            </li>
            <li className="flex justify-between py-2 border-b border-slate-100">
              <span>Lắp đặt máy lạnh di dời</span>
              <span className="font-bold text-emerald-600">Bảo hành 6 tháng (rò rỉ gas)</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Quy Trình Tiếp Nhận Bảo Hành</span>
          </h2>
          <p>
            Khi máy lạnh gặp lại sự cố trong thời gian bảo hành, quý khách chỉ cần gọi số Hotline <a href={`tel:${config.hotlineRaw}`} className="font-bold text-amber-600 hover:underline">{config.hotline}</a>.
          </p>
          <p>
            Kỹ thuật viên sẽ có mặt kiểm tra lại trong vòng 20 - 30 phút và khắc phục hoàn toàn miễn phí!
          </p>
        </div>

        <div className="pt-4 text-center">
          <a
            href={`tel:${config.hotlineRaw}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>GỌI TƯ VẤN BẢO HÀNH MIỄN PHÍ: {config.hotline}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
