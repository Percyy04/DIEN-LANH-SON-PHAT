import React from 'react';
import { getPartners } from '@/lib/data';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PartnersSection() {
  const partners = getPartners();

  return (
    <section className="bg-slate-50 py-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-hvac-primary" />
            <span>ĐỐI TÁC & THƯƠNG HIỆU ĐỒNG HÀNH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-hvac-navy">
            Đối Tác Thương Hiệu Điện Lạnh Hàng Đầu
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Sơn Phát tự hào cung cấp, thi công & bảo hành linh kiện chính hãng từ các tập đoàn điện lạnh lớn nhất thế giới.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {partner.country}
                  </span>
                  <Award className="w-4 h-4 text-hvac-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-black text-hvac-navy group-hover:text-hvac-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs font-bold text-hvac-primary bg-hvac-primary/5 py-1 px-2 rounded-lg inline-block">
                  {partner.category}
                </p>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {partner.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Linh kiện chính hãng 100%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bottom Banner */}
        <div className="bg-hvac-navy text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-extrabold text-amber-400">
              Cam Kết Vật Tư & Linh Kiện Chính Hãng 100%
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Mọi thiết bị thay thế đều có tem nhãn, nguồn gốc xuất xứ rõ ràng và phiếu bảo hành chính hãng từ nhà sản xuất.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white text-center">
              Bảo hành đến 12 tháng
            </div>
            <div className="px-4 py-2 rounded-xl bg-hvac-secondary text-white text-xs font-black text-center shadow-md">
              1 Đổi 1 Nếu Lỗi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
