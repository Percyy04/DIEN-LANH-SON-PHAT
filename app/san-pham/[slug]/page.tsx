import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchProductBySlugFromSupabase, fetchProductsFromSupabase, getSiteConfig } from '@/lib/data';
import { PhoneCall, Zap, CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await fetchProductsFromSupabase();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProductBySlugFromSupabase(resolvedParams.slug);
  if (!product) return { title: 'Sản phẩm không tồn tại' };

  return {
    title: `${product.name} - Điện Lạnh Sơn Phát Phú Quốc`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await fetchProductBySlugFromSupabase(resolvedParams.slug);
  const config = getSiteConfig();

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image.startsWith('http') ? product.image : `https://www.dienlanhsonphat.io.vn${product.image}`,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.dienlanhsonphat.io.vn/san-pham/${product.slug}`,
      priceCurrency: 'VND',
      price: product.price.replace(/[^0-9]/g, '') || '0',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Cơ Điện Lạnh Sơn Phát Phú Quốc',
      },
    },
  };

  return (
    <div className="py-10 space-y-12 max-w-7xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:underline">Sản phẩm</Link>
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Product Image & Key Attributes */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative h-80 sm:h-96 w-full rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden p-6 flex items-center justify-center">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            {product.inverter && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white font-extrabold text-xs rounded-full shadow-md flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Inverter Tiết Kiệm Điện
              </span>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">
              Mô Tả Sản Phẩm
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Product Info & Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-brand-100 text-brand-700 font-extrabold text-xs">
                {product.brand}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
                Công suất: {product.capacity}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-600 font-semibold block">Giá ưu đãi tại Phú Quốc:</span>
                <span className="text-xl font-extrabold text-brand-navy">{product.price}</span>
              </div>
              <a
                href={`tel:${config.hotlineRaw}`}
                className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>GỌI TƯ VẤN MIỄN PHÍ</span>
              </a>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              Thông Số Kỹ Thuật Chi Tiết
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Xuất xứ:</span>
                <span className="font-bold text-slate-900">{product.origin}</span>
              </li>
              <li className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Bảo hành:</span>
                <span className="font-bold text-emerald-600">{product.warranty}</span>
              </li>
              {product.specs.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-2 pt-1 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form CTA */}
          <ContactForm
            defaultService={`Tư vấn máy lạnh: ${product.name}`}
            title="Đăng Ký Khảo Sát & Nhận Báo Giá Máy Lạnh"
            subtitle="Miễn phí giao hàng & công thợ lắp đặt tại Phú Quốc"
          />
        </div>
      </div>
    </div>
  );
}
