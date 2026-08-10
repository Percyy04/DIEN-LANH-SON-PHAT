import React from 'react';
import { fetchProductsFromSupabase, getSiteConfig } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Máy Lạnh Chính Hãng Giá Tốt Tại Phú Quốc - Sơn Phát',
  description: 'Danh mục máy lạnh chính hãng Daikin, Panasonic, LG, Casper 1HP đến 2.5HP Inverter. Miễn phí vận chuyển và công lắp đặt tại Phú Quốc.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await fetchProductsFromSupabase();
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            {config.brandName}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Máy Lạnh Chính Hãng Phú Quốc
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Phân phối các dòng máy lạnh Daikin, Panasonic, Casper, LG có khả năng chống ăn mòn muối biển cao, làm lạnh sâu và tiết kiệm điện.
          </p>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
