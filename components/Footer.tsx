import React from 'react';
import Link from 'next/link';
import { Snowflake, Phone, MapPin, Clock, Mail, ShieldCheck, ChevronRight, Facebook, MessageCircle } from 'lucide-react';
import { getSiteConfig, getServices } from '@/lib/data';

export default function Footer() {
  const config = getSiteConfig();
  const services = getServices();

  return (
    <footer className="bg-hvac-navy text-slate-300 pt-16 pb-28 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden">
              <img src="/images/son_phat_logo.png" alt={config.brandName} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-white tracking-tight">
                {config.brandName}
              </span>
              <span className="text-[11px] font-bold text-hvac-secondary uppercase">
                Phú Quốc Service Business
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Đơn vị uy tín hàng đầu tại Phú Quốc chuyên dịch vụ sửa chữa, bảo trì, vệ sinh, sạc gas và tháo lắp máy lạnh tận nhà. Phục vụ siêu tốc 24/7.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a
              href={config.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-hvac-primary text-white flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={config.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-cyan-600 text-white flex items-center justify-center transition-all"
              aria-label="Zalo"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Dịch vụ chuyên nghiệp
          </h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/dich-vu/${item.slug}`}
                  className="hover:text-hvac-secondary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-hvac-secondary" />
                  <span>{item.shortTitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Liên kết nhanh
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/gioi-thieu" className="hover:text-hvac-secondary transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-hvac-secondary" />
                <span>Về Cơ Điện Lạnh Sơn Phát</span>
              </Link>
            </li>
            <li>
              <Link href="/san-pham" className="hover:text-hvac-secondary transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-hvac-secondary" />
                <span>Máy lạnh chính hãng giá tốt</span>
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-hvac-secondary transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-hvac-secondary" />
                <span>Góc tư vấn & Kinh nghiệm</span>
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-hvac-secondary transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-hvac-secondary" />
                <span>Yêu cầu báo giá dịch vụ</span>
              </Link>
            </li>
          </ul>

          <div className="pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-hvac-accent shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-snug">
                {config.warranty}
              </p>
            </div>
          </div>
        </div>

        {/* Col 4: Contact & Areas */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Thông tin liên hệ
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-hvac-secondary shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`tel:${config.hotlineRaw}`} className="font-extrabold text-amber-400 hover:underline">
                {config.hotline}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-hvac-accent shrink-0" />
              <span>{config.hours}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs">{config.email}</span>
            </li>
          </ul>

          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">Phục vụ các khu vực Phú Quốc:</span>
            <div className="flex flex-wrap gap-1.5">
              {config.serviceAreas.map((area) => (
                <span key={area} className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-medium">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2026 {config.brandName}. Tất cả quyền được bảo lưu.</p>
        <p>Phục vụ tận tâm - Có mặt sau 20 phút - Bảo hành dài hạn từ 3 - 12 tháng.</p>
      </div>
    </footer>
  );
}
