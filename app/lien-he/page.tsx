import React from 'react';
import { getSiteConfig } from '@/lib/data';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import MapSection from '@/components/MapSection';

export const metadata = {
  title: 'Liên Hệ Cơ Điện Lạnh Sơn Phát Phú Quốc - Hotline 0961 316 346',
  description: 'Thông tin liên hệ, hotline cấp cứu 24/7 và địa chỉ trạm kỹ thuật điện lạnh Sơn Phát tại CMT8, Dương Đông, Phú Quốc.',
};

export default function ContactPage() {
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-16 bg-hvac-bg">
      {/* Header Banner */}
      <section className="bg-hvac-navy text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="px-3 py-1 rounded-xl bg-hvac-secondary text-white text-xs font-black uppercase tracking-widest">
            LIÊN HỆ TRỰC TIẾP
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            Liên Hệ Kỹ Thuật Viên Điện Lạnh
          </h1>
          <p className="text-sm text-slate-300">
            Hỗ trợ yêu cầu dịch vụ sửa chữa, vệ sinh, sạc gas và bảo trì máy lạnh 24/7 toàn đảo Phú Quốc.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact info list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card-soft space-y-6">
            <h2 className="text-xl font-extrabold text-hvac-navy border-b border-slate-100 pb-3">
              Thông Tin Tổng Đài
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-hvac-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 uppercase block">Hotline 24/7:</span>
                  <a href={`tel:${config.hotlineRaw}`} className="text-lg font-black text-hvac-secondary hover:underline">
                    {config.hotline}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 uppercase block">Zalo Kỹ Thuật:</span>
                  <a href={config.zalo} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-cyan-700 hover:underline">
                    {config.zalo}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-hvac-primary/10 text-hvac-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 uppercase block">Trụ sở tại Phú Quốc:</span>
                  <span className="text-sm font-bold text-slate-800">{config.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 uppercase block">Giờ làm việc:</span>
                  <span className="text-sm font-bold text-slate-800">{config.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 uppercase block">Email liên hệ:</span>
                  <span className="text-sm font-bold text-slate-800">{config.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      <MapSection />
    </div>
  );
}
