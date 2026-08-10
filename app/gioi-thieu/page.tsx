import React from 'react';
import { getSiteConfig } from '@/lib/data';
import { ShieldCheck, Award, Users, Wrench, PhoneCall } from 'lucide-react';
import MapSection from '@/components/MapSection';

export const metadata = {
  title: 'Giới Thiệu Cơ Điện Lạnh Sơn Phát - Phú Quốc',
  description: 'Giới thiệu đội ngũ thợ điện lạnh Sơn Phát tại thành phố đảo Phú Quốc. Hơn 5 năm kinh nghiệm sửa chữa, vệ sinh, bảo trì máy lạnh cho hộ gia đình và dự án.',
};

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-16 bg-hvac-bg">
      {/* Hero */}
      <section className="bg-hvac-navy text-white py-16 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3 py-1 rounded-xl bg-hvac-secondary text-white text-xs font-black uppercase tracking-widest">
            VỀ CHÚNG TÔI
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            Cơ Điện Lạnh Sơn Phát Phú Quốc
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Đồng hành cùng hàng ngàn hộ gia đình, homestay, biệt thự, nhà hàng, khách sạn và resort tại thành phố đảo Phú Quốc với dịch vụ điện lạnh Nhanh chóng — Uy tín — Báo giá trước.
          </p>
        </div>
      </section>

      {/* Story & Value */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-hvac-navy">
            Đội Ngũ Thợ Giỏi Am Hiểu Khí Hậu Biển Đảo
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tại Phú Quốc, khí hậu nắng nóng kéo dài cùng môi trường không khí mang hàm lượng muối biển cao làm linh kiện điện lạnh dễ bị rỉ sét, mục lá nhôm và xì gas.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Được thành lập bởi đội ngũ kỹ thuật viên lâu năm địa phương, <span className="font-bold text-hvac-navy">{config.brandName}</span> cam kết đem đến dịch vụ bảo trì kỹ thuật tối ưu nhất, xử lý dứt điểm chảy nước, rò gas, mất nguồn và lạnh kém.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-extrabold">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-hvac-primary shadow-card-soft">
              ✓ Kiểm tra tận nhà miễn phí
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-hvac-accent shadow-card-soft">
              ✓ Bảo hành 3 đến 12 tháng
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card-hover space-y-6">
          <h3 className="text-lg font-extrabold text-hvac-navy border-b border-slate-100 pb-3">
            Giá Trị Cốt Lõi Sơn Phát
          </h3>
          <ul className="space-y-4 text-xs sm:text-sm">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-hvac-primary/10 text-hvac-primary flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-hvac-navy block">Tận tâm & Nhanh chóng</span>
                <span className="text-slate-600">Có mặt đúng hẹn trong 20 - 30 phút, làm việc sạch sẽ ngăn nắp.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-hvac-secondary/10 text-hvac-secondary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-hvac-navy block">Minh bạch chi phí</span>
                <span className="text-slate-600">Bắt đúng bệnh, báo đúng giá niêm yết, không chìu chi phí ẩn.</span>
              </div>
            </li>
          </ul>

          <div className="pt-2">
            <a
              href={`tel:${config.hotlineRaw}`}
              className="w-full py-3.5 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>GỌI TƯ VẤN MIỄN PHÍ: {config.hotline}</span>
            </a>
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  );
}
