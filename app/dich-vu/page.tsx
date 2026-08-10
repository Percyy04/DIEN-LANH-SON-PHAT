import React from 'react';
import { fetchServicesFromSupabase, getSiteConfig } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Dịch Vụ Điện Lạnh Phú Quốc - Sửa Chữa, Vệ Sinh, Bơm Gas, Lắp Đặt',
  description: 'Danh sách tổng hợp 8 dịch vụ sửa chữa máy lạnh, vệ sinh máy lạnh, sạc gas, lắp đặt, sửa tủ lạnh, máy giặt tận nhà tại Phú Quốc. Có mặt sau 20 phút.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await fetchServicesFromSupabase();
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-16 bg-hvac-bg">
      {/* Header Banner */}
      <section className="bg-hvac-navy text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="px-3 py-1 rounded-xl bg-hvac-secondary text-white text-xs font-black uppercase tracking-wider">
            TRỌN GÓI UY TÍN
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            Dịch Vụ Điện Lạnh Chuyên Nghiệp Phú Quốc
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Giải pháp sửa chữa, vệ sinh, bảo trì và lắp đặt máy lạnh trọn gói cho hộ gia đình, homestay, biệt thự, resort và khách sạn.
          </p>
        </div>
      </section>

      {/* Services Grid (8 Services) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-3xl mx-auto px-4">
        <ContactForm />
      </section>
    </div>
  );
}
