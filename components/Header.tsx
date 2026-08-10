'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Clock, MapPin, Menu, X, MessageCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';

export default function Header() {
  const config = getSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const productCategories = [
    { name: 'Máy lạnh chính hãng', href: '/san-pham?category=may-lanh', desc: 'Daikin, Panasonic, LG, Casper...' },
    { name: 'Tủ lạnh Inverter', href: '/san-pham?category=tu-lanh', desc: 'Tủ lạnh 180L - 322L Side by Side' },
    { name: 'Máy giặt cao cấp', href: '/san-pham?category=may-giat', desc: 'Máy giặt cửa ngang & cửa trên' },
    { name: 'Máy lọc nước RO', href: '/san-pham?category=may-loc-nuoc', desc: 'Lọc nước tinh khiết Karofi' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Banner */}
      <div className="bg-hvac-navy text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-hvac-secondary" />
              <span>{config.address}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-hvac-accent" />
              <span>{config.hours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${config.hotlineRaw}`}
              className="flex items-center gap-1 text-amber-400 font-extrabold hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 animate-pulse text-hvac-secondary" />
              <span>Hotline 24/7: {config.hotline}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={config.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Zalo Tư Vấn Miễn Phí</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="glass-header border-b border-slate-200/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border border-slate-100 group-hover:scale-105 transition-all overflow-hidden">
              <img src="/images/son_phat_logo.png" alt={config.brandName} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-hvac-navy tracking-tight group-hover:text-hvac-primary transition-colors">
                {config.brandName}
              </span>
              <span className="text-[11px] font-bold tracking-wider text-hvac-secondary uppercase">
                Dịch vụ điện lạnh Phú Quốc
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors py-1 relative group"
            >
              Trang chủ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/dich-vu"
              className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors py-1 relative group"
            >
              Dịch vụ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Dropdown Menu for Sản phẩm */}
            <div className="relative group py-1">
              <Link
                href="/san-pham"
                className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors flex items-center gap-1 py-1"
              >
                <span>Sản phẩm</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Dropdown Menu Container */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2">
                {productCategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                  >
                    <div className="text-xs font-extrabold text-slate-800 group-hover/item:text-hvac-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{item.desc}</div>
                  </Link>
                ))}
                <div className="pt-1.5 border-t border-slate-100 mt-1">
                  <Link
                    href="/san-pham"
                    className="block text-center py-2 text-xs font-extrabold text-hvac-secondary hover:underline"
                  >
                    Xem tất cả sản phẩm →
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors py-1 relative group"
            >
              Góc tư vấn
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/gioi-thieu"
              className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors py-1 relative group"
            >
              Giới thiệu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/lien-he"
              className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors py-1 relative group"
            >
              Liên hệ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Header Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${config.hotlineRaw}`}
              className="px-5 py-2.5 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>GỌI TƯ VẤN MIỄN PHÍ</span>
            </a>
          </div>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-hvac-secondary" /> : <Menu className="w-6 h-6 text-hvac-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[108px] bg-white border-b border-slate-200 shadow-2xl z-50 animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
            >
              <span>Trang chủ</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/dich-vu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
            >
              <span>Dịch vụ</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Mobile Expandable Products */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
              >
                <span>Sản phẩm</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileProductsOpen && (
                <div className="pl-4 space-y-1.5 border-l-2 border-slate-200 ml-3">
                  {productCategories.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2.5 rounded-xl text-xs font-extrabold text-slate-700 hover:bg-slate-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/san-pham"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-xl text-xs font-black text-hvac-secondary hover:bg-slate-100"
                  >
                    Xem tất cả sản phẩm →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
            >
              <span>Góc tư vấn</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/gioi-thieu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
            >
              <span>Giới thiệu</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/lien-he"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
            >
              <span>Liên hệ</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`tel:${config.hotlineRaw}`}
                className="w-full text-center py-3 rounded-2xl bg-hvac-secondary text-white font-extrabold text-sm shadow-md hover:bg-hvac-secondaryHover transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>GỌI TƯ VẤN MIỄN PHÍ: {config.hotline}</span>
              </a>
              <a
                href={config.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-2xl bg-hvac-primary text-white font-bold text-sm hover:bg-hvac-primaryDark transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ZALO VỚI KỸ THUẬT VIÊN</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
