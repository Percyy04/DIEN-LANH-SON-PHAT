import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';

interface CoverageCardProps {
  areaName: string;
  responseTime?: string;
}

export default function CoverageCard({ areaName, responseTime = "15 - 20 Phút" }: CoverageCardProps) {
  const config = getSiteConfig();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card-soft hover:shadow-card-hover hvac-card-transition space-y-3 flex flex-col justify-between group">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-2xl bg-hvac-primary/10 text-hvac-primary flex items-center justify-center group-hover:bg-hvac-primary group-hover:text-white transition-all">
          <MapPin className="w-5 h-5" />
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-green-50 text-hvac-accent border border-green-200">
          <Clock className="w-3 h-3" />
          <span>{responseTime}</span>
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-hvac-navy group-hover:text-hvac-primary transition-colors">
          Khu vực {areaName}
        </h3>
        <p className="text-xs text-slate-500">
          Đội KTV túc trực sẵn sàng hỗ trợ sửa chữa & bảo trì tận nơi.
        </p>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <a
          href={`tel:${config.hotlineRaw}`}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-hvac-secondary group-hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Gọi thợ tại {areaName}</span>
        </a>
      </div>
    </div>
  );
}
