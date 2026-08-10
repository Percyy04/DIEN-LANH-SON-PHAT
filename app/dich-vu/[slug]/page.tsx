import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchServiceBySlugFromSupabase, fetchServicesFromSupabase, getSiteConfig } from '@/lib/data';
import { PhoneCall, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await fetchServicesFromSupabase();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await fetchServiceBySlugFromSupabase(resolvedParams.slug);
  if (!service) return { title: 'Dịch vụ không tồn tại' };

  return {
    title: `${service.title} Tại Phú Quốc - Có Mặt Sau 20Phút`,
    description: service.description,
    openGraph: {
      title: `${service.title} - Cơ Điện Lạnh Sơn Phát`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = await fetchServiceBySlugFromSupabase(resolvedParams.slug);
  const config = getSiteConfig();

  if (!service) {
    notFound();
  }

  return (
    <div className="py-10 space-y-12">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-wider">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <span>/</span>
              <Link href="/dich-vu" className="hover:underline">Dịch vụ</Link>
              <span>/</span>
              <span className="text-white">{service.shortTitle}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-tight">{service.title}</h1>
            <p className="text-slate-300 text-base leading-relaxed">{service.description}</p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`tel:${config.hotlineRaw}`}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>GỌI TƯ VẤN MIỄN PHÍ: {config.hotline}</span>
              </a>
              <a
                href={config.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm transition-colors"
              >
                Zalo Tư Vấn Miễn Phí
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-700">
            <Image src={service.image} alt={service.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-10">
          {/* Key Features */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Ưu Điểm Dịch Vụ Tại Sơn Phát
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Issues */}
          {service.issues && service.issues.length > 0 && (
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200/80 space-y-4">
              <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Các Lỗi Thường Gặp Cần Xử Lý Kịp Thời</span>
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {service.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing Table */}
          {service.priceTable && service.priceTable.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Bảng Giá Dịch Vụ Tham Khảo
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="p-3 rounded-l-lg">Hạng mục dịch vụ</th>
                      <th className="p-3 rounded-r-lg text-right">Chi phí tham khảo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {service.priceTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-800 font-medium">{row.item}</td>
                        <td className="p-3 text-right font-bold text-brand-600">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 italic">
                * Giá thực tế có thể thay đổi tùy thuộc vào vị trí thi công và công suất máy. KTV sẽ báo giá chính xác trước khi thực hiện.
              </p>
            </div>
          )}

          {/* Process */}
          {service.process && service.process.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Quy Trình Thực Hiện Chuẩn Kỹ Thuật
              </h2>
              <div className="space-y-4">
                {service.process.map((p) => (
                  <div key={p.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {p.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Thắc Mắc Liên Quan
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs text-slate-600 pl-5 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24">
            <ContactForm defaultService={service.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
