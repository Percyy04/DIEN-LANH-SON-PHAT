'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MessageSquare, X, ShieldCheck } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';

export default function StickyCTA() {
  const config = getSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <>
      {/* Mobile Sticky Bottom Bar (Visible on mobile screens) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 z-40 shadow-2xl flex items-center justify-between gap-2">
        <a
          href={`tel:${config.hotlineRaw}`}
          className="flex-1 py-3 px-3 rounded-2xl bg-hvac-secondary active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <Phone className="w-4 h-4" />
          <span>GỌI TƯ VẤN MIỄN PHÍ</span>
        </a>
        <a
          href={config.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-2xl bg-hvac-primary active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <MessageCircle className="w-4 h-4 text-cyan-300" />
          <span>CHAT ZALO</span>
        </a>
        <a
          href={config.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-3.5 rounded-2xl bg-slate-800 text-white font-bold text-sm flex items-center justify-center"
          aria-label="Messenger"
        >
          <MessageSquare className="w-4 h-4 text-blue-400" />
        </a>
      </div>

      {/* Floating Action Button & Menu (Visible on Desktop / Tablet) */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        {/* Tooltip Box */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200 w-72 z-50 animate-in fade-in slide-in-from-bottom duration-300">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Close tooltip"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-1.5 text-hvac-primary font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-hvac-accent" />
              <span>Hỗ Trợ Điện Lạnh Phú Quốc 24/7</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Bạn cần thợ kiểm tra máy lạnh hay báo giá nhanh? Hãy gọi hotline <strong className="text-hvac-secondary">{config.hotline}</strong> hoặc Chat Zalo ngay!
            </p>
          </div>
        )}

        {/* Floating Menu Links */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3 z-50 mb-2 animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Direct Call */}
            <a
              href={`tel:${config.hotlineRaw}`}
              className="flex items-center justify-end gap-3 px-4 py-2.5 bg-slate-900 text-white rounded-2xl font-extrabold text-sm shadow-xl hover:scale-105 transition-all group"
            >
              <span>Gọi {config.hotline}</span>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-hvac-secondary text-white shadow-glow-orange">
                <Phone className="w-5 h-5 animate-pulse" />
              </div>
            </a>

            {/* Zalo Chat */}
            <a
              href={config.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-end gap-3 px-4 py-2.5 bg-slate-900 text-white rounded-2xl font-extrabold text-sm shadow-xl hover:scale-105 transition-all group"
            >
              <span>Chat Zalo ngay</span>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
            </a>

            {/* Messenger Chat */}
            <a
              href={config.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-end gap-3 px-4 py-2.5 bg-slate-900 text-white rounded-2xl font-extrabold text-sm shadow-xl hover:scale-105 transition-all group"
            >
              <span>Chat Messenger</span>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-600 text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
            </a>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="flex items-center justify-center w-16 h-16 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
          title="Liên hệ Sơn Phát"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Phone className="w-7 h-7 animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
}
