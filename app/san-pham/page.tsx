import React from 'react';
import Link from 'next/link';
import { fetchProductsFromSupabase, getSiteConfig } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Sản Phẩm Điện Lạnh Chính Hãng Giá Tốt Tại Phú Quốc - Sơn Phát',
  description: 'Danh mục máy lạnh, tủ lạnh, máy giặt, máy lọc nước chính hãng Daikin, Panasonic, LG, Casper, Karofi. Miễn phí vận chuyển và công lắp đặt tại Phú Quốc.',
};

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const allProducts = await fetchProductsFromSupabase();
  const config = getSiteConfig();

  const filteredProducts = category
    ? allProducts.filter((p) => {
        if (p.category) {
          return p.category === category;
        }
        if (category === 'may-lanh') return p.slug.startsWith('may-lanh');
        if (category === 'tu-lanh') return p.slug.startsWith('tu-lanh');
        if (category === 'may-giat') return p.slug.startsWith('may-giat');
        if (category === 'may-loc-nuoc') return p.slug.startsWith('may-loc-nuoc');
        return false;
      })
    : allProducts;

  const categories = [
    { id: '', label: 'Tất cả sản phẩm' },
    { id: 'may-lanh', label: 'Máy lạnh' },
    { id: 'tu-lanh', label: 'Tủ lạnh' },
    { id: 'may-giat', label: 'Máy giặt' },
    { id: 'may-loc-nuoc', label: 'Máy lọc nước' },
  ];

  return (
    <div className="py-12 space-y-12 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="px-3 py-1 rounded-xl bg-hvac-secondary text-white text-xs font-black uppercase tracking-wider">
            {config.brandName} PHÚ QUỐC
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Sản Phẩm Điện Lạnh & Gia Dụng Chính Hãng
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Phân phối máy lạnh, tủ lạnh, máy giặt và máy lọc nước chính hãng Daikin, Panasonic, LG, Casper, Karofi chống ăn mòn muối biển, tiết kiệm điện.
          </p>
        </div>
      </section>

      {/* Category Tabs & Product Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
          {categories.map((cat) => {
            const isActive = (category || '') === cat.id;
            return (
              <Link
                key={cat.id}
                href={cat.id ? `/san-pham?category=${cat.id}` : '/san-pham'}
                className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-hvac-primary text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-base font-bold text-slate-700">Đang cập nhật danh mục sản phẩm này...</p>
            <p className="text-xs text-slate-500">Vui lòng liên hệ Hotline {config.hotline} để nhận tư vấn báo giá trực tiếp.</p>
          </div>
        )}
      </section>
    </div>
  );
}
