import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ChevronRight, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem, getSiteConfig } from '@/lib/data';

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const config = getSiteConfig();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card-soft hover:shadow-card-hover hvac-card-transition overflow-hidden flex flex-col group">
      {/* Service Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Status Tag Badge (Toàn Cầu Cook style) */}
        {service.tag && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-black text-white ${service.badgeColor || 'bg-hvac-secondary'} shadow-md tracking-wide uppercase`}>
            {service.tag}
          </span>
        )}

        {/* Response Guarantee Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/60 shadow-sm flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-hvac-accent" />
          <span>Có mặt 20'</span>
        </span>

        {/* Price Tag Overlay at bottom left */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1.5 rounded-xl bg-hvac-navy/90 backdrop-blur-md text-amber-400 font-extrabold text-sm border border-slate-700/80 shadow-md">
            {service.priceFrom}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link href={`/dich-vu/${service.slug}`}>
            <div className="text-lg font-extrabold text-hvac-navy group-hover:text-hvac-primary transition-colors line-clamp-1">
              {service.title}
            </div>
          </Link>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Key Features Bullet List */}
          <ul className="pt-2 space-y-1.5 border-t border-slate-100">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-hvac-accent shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          <a
            href={`tel:${config.hotlineRaw}`}
            className="py-2.5 px-3 rounded-xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Tư vấn miễn phí</span>
          </a>
          <Link
            href={`/dich-vu/${service.slug}`}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-hvac-primary hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all"
          >
            <span>Xem dịch vụ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
