import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';

export default function MapSection() {
  const config = getSiteConfig();

  return (
    <section className="w-full bg-slate-50 py-12 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <span className="text-xs font-extrabold tracking-widest text-brand-500 uppercase">
              VỊ TRÍ & PHỤC VỤ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Địa Chỉ Điện Lạnh Sơn Phát Phú Quốc
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trạm kỹ thuật trung tâm đặt tại đường Cách Mạng Tháng 8, P. Dương Đông. Chúng tôi di chuyển nhanh chóng đến mọi ngóc ngách trên đảo Phú Quốc.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white shadow-sm border border-slate-100">
              <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Địa chỉ chính:</span>
                <span className="text-slate-600">{config.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white shadow-sm border border-slate-100">
              <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Hotline kỹ thuật:</span>
                <a href={`tel:${config.hotlineRaw}`} className="text-amber-600 font-bold hover:underline">
                  {config.hotline}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white shadow-sm border border-slate-100">
              <Clock className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Giờ làm việc:</span>
                <span className="text-slate-600">{config.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="lg:col-span-2 min-h-[350px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-200">
          <iframe
            title="Map Điện Lạnh Sơn Phát Phú Quốc"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62744.57685642878!2d103.94520779774653!3d10.222378906353982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314c4b57422f2efd%3A0xbbfd1fae925925a1!2sD%C6%B0%C6%A1ng%20%C4%90%C3%B4ng%2C%20Ph%C3%BA%20Qu%E1%BB%91c%2C%20Kien%20Giang!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '350px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
