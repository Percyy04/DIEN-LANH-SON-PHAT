import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, PhoneCall, Zap } from 'lucide-react';
import { ProductItem, getSiteConfig } from '@/lib/data';

interface Props {
  product: ProductItem;
}

export default function ProductCard({ product }: Props) {
  const config = getSiteConfig();

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative h-44 w-full bg-slate-50 p-4 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-cyan-300 font-extrabold text-[11px] rounded-lg">
          {product.brand}
        </span>
        {product.inverter && (
          <span className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-500 text-white font-bold text-[10px] rounded flex items-center gap-1">
            <Zap className="w-3 h-3" /> Inverter
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-brand-500">{product.capacity}</span>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="space-y-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{product.warranty}</span>
          </div>
          <p className="font-bold text-brand-navy text-sm pt-1">{product.price}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            href={`/san-pham/${product.slug}`}
            className="py-2 px-3 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Thông số
          </Link>
          <a
            href={`tel:${config.hotlineRaw}`}
            className="py-2 px-3 text-center rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Tư vấn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
