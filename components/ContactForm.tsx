'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Phone, MessageCircle, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { getSiteConfig, getServices } from '@/lib/data';

interface Props {
  defaultService?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  defaultService = '',
  title = 'Đặt Lịch Dịch Vụ Điện Lạnh Tận Nhà',
  subtitle = 'Kỹ thuật viên đến ngay sau 20 phút tại Dương Đông, Bãi Trường, An Thới...',
}: Props) {
  const config = getSiteConfig();
  const services = getServices();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: defaultService || services[0]?.title || 'Sửa máy lạnh',
    address: '',
    message: '',
    preferredTime: 'Càng sớm càng tốt (Trong 30 phút)',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Có lỗi xảy ra, vui lòng gọi trực tiếp Hotline!');
      }
    } catch (err) {
      setErrorMsg('Không thể gửi tự động. Vui lòng liên hệ trực tiếp hotline 0961 316 346!');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-card-hover border border-emerald-200 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle className="w-10 h-10 text-hvac-accent" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-hvac-navy">
            Gửi Yêu Cầu Thành Công!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Cảm ơn quý khách <span className="font-bold text-slate-900">{formData.fullName}</span>! Kỹ thuật viên <span className="font-bold text-hvac-primary">{config.brandName}</span> sẽ liên hệ lại số điện thoại <span className="font-bold text-hvac-secondary">{formData.phone}</span> ngay.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2 text-xs text-amber-900">
          <p className="font-extrabold text-sm text-amber-950 flex items-center gap-1.5">
            ⚡ Cần thợ gấp trong 15-20 phút?
          </p>
          <p>Hãy liên hệ trực tiếp qua hotline tổng đài cấp cứu điện lạnh Phú Quốc:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${config.hotlineRaw}`}
            className="py-3.5 px-4 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>GỌI HOTLINE: {config.hotline}</span>
          </a>
          <a
            href={config.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 rounded-2xl bg-hvac-primary hover:bg-hvac-primaryDark text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>NHẮN ZALO TRỰC TIẾP</span>
          </a>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: '',
              phone: '',
              service: defaultService || services[0]?.title || 'Sửa máy lạnh',
              address: '',
              message: '',
              preferredTime: 'Càng sớm càng tốt (Trong 30 phút)',
            });
          }}
          className="text-xs text-hvac-primary hover:underline font-bold"
        >
          ← Gửi yêu cầu dịch vụ khác
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card-hover border border-slate-200 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-2 text-hvac-accent font-extrabold text-xs tracking-wider uppercase">
        <ShieldCheck className="w-4 h-4" />
        <span>Báo giá minh bạch - Có mặt 20 phút</span>
      </div>

      <div className="mb-6 space-y-1">
        <h3 className="text-xl sm:text-2xl font-extrabold text-hvac-navy">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-800">Họ và Tên *</label>
            <input
              type="text"
              required
              placeholder="VD: Anh Minh"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:border-hvac-primary focus:ring-2 focus:ring-hvac-primary/20 text-sm outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-800">Số Điện Thoại *</label>
            <input
              type="tel"
              required
              placeholder="VD: 0961 316 346"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:border-hvac-primary focus:ring-2 focus:ring-hvac-primary/20 text-sm outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-800">Dịch Vụ Cần Hỗ Trợ *</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:border-hvac-primary focus:ring-2 focus:ring-hvac-primary/20 text-sm outline-none transition-all bg-white font-medium"
            >
              {services.map((item) => (
                <option key={item.slug} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-800">Thời Gian Đến</label>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:border-hvac-primary focus:ring-2 focus:ring-hvac-primary/20 text-sm outline-none transition-all bg-white font-medium"
            >
              <option value="Càng sớm càng tốt (Trong 30 phút)">Càng sớm càng tốt (Trong 30 phút)</option>
              <option value="Hôm nay (Buổi sáng 7h - 12h)">Hôm nay (Buổi sáng 7h - 12h)</option>
              <option value="Hôm nay (Buổi chiều 13h - 17h)">Hôm nay (Buổi chiều 13h - 17h)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold text-slate-800">Địa Chỉ Tận Nơi tại Phú Quốc *</label>
          <input
            type="text"
            required
            placeholder="VD: CMT8, Dương Đông (hoặc tên Resort / Homestay)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:border-hvac-primary focus:ring-2 focus:ring-hvac-primary/20 text-sm outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold text-slate-800">Mô Tả Sự Cố (Tùy chọn)</label>
          <textarea
            rows={2}
            placeholder="VD: Máy lạnh chảy nước, hoặc bật 16 độ không mát..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:border-hvac-primary focus:ring-2 focus:ring-hvac-primary/20 text-sm outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang gửi yêu cầu...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>GỬI YÊU CẦU ĐẶT THỢ NGAY</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
