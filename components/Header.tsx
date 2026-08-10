'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Clock, MapPin, Menu, X, Snowflake, MessageCircle, ChevronRight, Wrench } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';

export default function Header() {
  const config = getSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ HVAC', href: '/dich-vu' },
    { name: 'Sản phẩm máy lạnh', href: '/san-pham' },
    { name: 'Góc tư vấn', href: '/blog' },
    { name: 'Giới thiệu', href: '/gioi-thieu' },
    { name: 'Liên hệ', href: '/lien-he' },
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
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-hvac-primary to-hvac-primaryDark flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-all">
              <Snowflake className="w-6 h-6 animate-spin-slow text-cyan-200" />
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-slate-700 hover:text-hvac-primary transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hvac-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl text-slate-800 hover:bg-slate-100 font-bold transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
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
