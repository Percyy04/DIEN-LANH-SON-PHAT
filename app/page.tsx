import React from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Wrench,
  Clock,
  Award,
  Users,
  ChevronRight,
  HelpCircle,
  MapPin,
  Flame,
  Building2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  getSiteConfig,
  getProjects,
  getTestimonials,
  fetchServicesFromSupabase,
  fetchPostsFromSupabase,
} from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import CoverageCard from '@/components/CoverageCard';
import BlogCard from '@/components/BlogCard';
import ContactForm from '@/components/ContactForm';
import MapSection from '@/components/MapSection';
import PartnersSection from '@/components/PartnersSection';
import BannerSlider from '@/components/BannerSlider';

export const revalidate = 60;

export default async function HomePage() {
  const config = getSiteConfig();
  const services = await fetchServicesFromSupabase();
  const projects = getProjects();
  const testimonials = getTestimonials();
  const posts = await fetchPostsFromSupabase();

  // Why Choose Us Items
  const whyChooseUs = [
    {
      icon: Clock,
      title: 'Có mặt nhanh',
      desc: 'Kỹ thuật viên túc trực tại Dương Đông, Bãi Trường, An Thới có mặt tận nơi chỉ sau 20 - 30 phút.',
      badge: 'Cấp Cứu 24/7',
    },
    {
      icon: ShieldCheck,
      title: 'Báo giá minh bạch',
      desc: 'Khảo sát kiểm tra tận nhà miễn phí, báo giá công khai trước khi làm. Cam kết không phát sinh.',
      badge: 'Công Khai',
    },
    {
      icon: Wrench,
      title: 'Kỹ thuật viên kinh nghiệm',
      desc: 'Thợ điện lạnh trên 5 năm kinh nghiệm, thông thuộc địa hình và am hiểu môi trường biển mặn Phú Quốc.',
      badge: 'Thợ Giỏi',
    },
    {
      icon: Award,
      title: 'Bảo hành sau sửa chữa',
      desc: 'Phiếu bảo hành dịch vụ và linh kiện chu đáo từ 3 đến 12 tháng. Khắc phục miễn phí nếu hư hỏng lại.',
      badge: '3 - 12 Tháng',
    },
    {
      icon: Users,
      title: 'Hỗ trợ tận nơi',
      desc: 'Phục vụ tận nhà cho hộ gia đình, biệt thự, homestay, nhà hàng, khách sạn và resort khắp đảo Phú Quốc.',
      badge: 'Toàn Phú Quốc',
    },
  ];

  // Coverage Areas list
  const coverageAreas = [
    'Dương Đông',
    'An Thới',
    'Bãi Trường',
    'Cửa Cạn',
    'Gành Dầu',
    'Hàm Ninh',
  ];

  const faqs = [
    {
      q: 'Cơ Điện Lạnh Sơn Phát phục vụ ở những khu vực nào tại Phú Quốc?',
      a: 'Chúng tôi phục vụ tận nơi tất cả các khu vực: Phường Dương Đông, An Thới, Bãi Trường, Cửa Cạn, Gành Dầu, Hàm Ninh...',
    },
    {
      q: 'Chi phí kiểm tra máy lạnh tận nhà là bao nhiêu?',
      a: 'Sơn Phát miễn phí 100% công kiểm tra sự cố tại nhà khi quý khách đồng ý sử dụng dịch vụ sửa chữa hoặc bảo trì.',
    },
    {
      q: 'Thời tiết Phú Quốc ảnh hưởng gì tới máy lạnh?',
      a: 'Môi trường khí hậu đảo biển chứa hàm lượng muối cao làm xì gas và mục lá tản nhiệt. Sơn Phát sử dụng linh kiện chống ăn mòn chuyên dụng giúp máy lạnh luôn chạy bền bỉ.',
    },
    {
      q: 'Có bảo hành dịch vụ sau khi sửa chữa không?',
      a: 'Có! Sơn Phát cấp phiếu bảo hành chính thức từ 3 - 12 tháng cho tất cả dịch vụ sửa chữa và thay thế linh kiện.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 bg-hvac-bg text-hvac-navy pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-200 text-xs sm:text-sm font-extrabold backdrop-blur-md">
              <Zap className="w-4 h-4 text-hvac-secondary animate-pulse" />
              <span>Dịch vụ điện lạnh khẩn cấp tại Phú Quốc</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Sửa Máy Lạnh, Điện Lạnh Chuyên Nghiệp{' '}
              <span className="text-amber-400 underline decoration-hvac-secondary decoration-4">Tại Phú Quốc</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Sửa chữa - Lắp đặt - Bảo trì máy lạnh tận nơi tại Dương Đông, Bãi Trường, An Thới. <span className="font-extrabold text-white underline">Có mặt sau 20 phút - Bảo hành dài hạn!</span>
            </p>

            {/* Quick Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={`tel:${config.hotlineRaw}`}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-black text-base shadow-glow-orange hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <PhoneCall className="w-5 h-5" />
                <span>GỌI TƯ VẤN MIỄN PHÍ: {config.hotline}</span>
              </a>
              <a
                href={config.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-base border border-white/30 backdrop-blur-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-cyan-300" />
                <span>ZALO TƯ VẤN MIỄN PHÍ</span>
              </a>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/15">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-amber-400">500+</p>
                <p className="text-xs text-slate-300 font-bold">Khách hàng</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-cyan-300">5+ Năm</p>
                <p className="text-xs text-slate-300 font-bold">Kinh nghiệm</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">100%</p>
                <p className="text-xs text-slate-300 font-bold">Phục vụ toàn Phú Quốc</p>
              </div>
            </div>
          </div>

          {/* Hero Right Form Container */}
          <div className="lg:col-span-5">
            <ContactForm
              title="Đặt Lịch Thợ Đến Ngay"
              subtitle="Kỹ thuật viên sẽ gọi lại xác nhận vị trí ngay lập tức"
            />
          </div>
        </div>
      </section>

      {/* PROMOTIONAL BANNER SLIDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <BannerSlider
          banners={[
            '/images/banner.png',
            '/images/banner1.jpg',
            '/images/banner2.jpg',
          ]}
        />
      </section>

      {/* 2. FEATURED SERVICES (Toàn Cầu Cook Showcase Style) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
            DỊCH VỤ NÒNG CỐT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-hvac-navy">
            Dịch Vụ Điện Lạnh Nổi Bật Tại Phú Quốc
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Cung cấp giải pháp sửa chữa, vệ sinh, sạc gas và thi công điện lạnh trọn gói cho hộ gia đình, homestay, nhà hàng & resort.
          </p>
        </div>

        {/* 8 Featured Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* 3. COMPANY STORY (Về Cơ Điện Lạnh Sơn Phát) */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Visual Showcase / Image Grid */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover border border-slate-200 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
                alt="Về Cơ Điện Lạnh Sơn Phát"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hvac-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-extrabold text-hvac-secondary uppercase tracking-widest block">
                  Đội Ngũ Kỹ Thuật Viên Địa Phương
                </span>
                <p className="text-lg font-bold">
                  Kinh nghiệm 5+ năm xử lý điện lạnh trong khí hậu muối biển Phú Quốc
                </p>
              </div>
            </div>

            {/* Experience Counter Floating Box */}
            <div className="absolute -bottom-6 -right-6 bg-hvac-secondary text-white p-5 rounded-2xl shadow-xl hidden sm:flex items-center gap-4 border-2 border-white">
              <span className="text-4xl font-black">5+</span>
              <div className="text-xs font-extrabold leading-tight uppercase">
                Năm Kinh Nghiệm<br />Phục Vụ Đảo Phú Quốc
              </div>
            </div>
          </div>

          {/* Story Text & Value Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
                GIỚI THIỆU DOANH NGHIỆP
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-hvac-navy">
                Về Cơ Điện Lạnh Sơn Phát
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>Cơ Điện Lạnh Sơn Phát</strong> là đơn vị điện lạnh uy tín hàng đầu tại TP. Phú Quốc. Chúng tôi chuyên nhận sửa chữa, vệ sinh, sạc gas, tháo lắp máy lạnh và khắc phục sự cố điện nước tận nhà cho các gia đình, nhà hàng, khách sạn và villa cao cấp.
            </p>

            {/* 4 Steps Process Highlights */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold uppercase text-hvac-navy tracking-wider">
                Quy trình làm việc chuẩn 4 bước:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { step: '01', title: 'Tiếp nhận thông tin', desc: 'Gọi hotline hoặc Zalo' },
                  { step: '02', title: 'Khảo sát tận nhà 20\'', desc: 'Báo giá minh bạch trước khi làm' },
                  { step: '03', title: 'Xử lý triệt để', desc: 'Linh kiện chính hãng 100%' },
                  { step: '04', title: 'Nghiệm thu & Bảo hành', desc: 'Viết phiếu bảo hành 3-12 tháng' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-hvac-bg border border-slate-200 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-hvac-primary text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-extrabold text-hvac-navy">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Commitment Callout */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium flex items-center gap-3">
              <Award className="w-6 h-6 text-hvac-secondary shrink-0" />
              <span>Cam kết hoàn tiền 100% nếu dịch vụ không đạt yêu cầu hoặc máy hỏng hóc lại trong thời hạn bảo hành.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (Trust Section) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
            CAM KẾT DỊCH VỤ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-hvac-navy">
            Tại Sao Khách Hàng Chọn Sơn Phát?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            5 lý do tạo nên thương hiệu điện lạnh hàng đầu được người dân Phú Quốc tin chọn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card-soft hover:shadow-card-hover hvac-card-transition space-y-3 text-center sm:text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-hvac-primary/10 text-hvac-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-hvac-navy">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. COVERAGE AREAS (Khu vực phục vụ Phú Quốc) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-xl bg-hvac-secondary/20 text-hvac-secondary text-xs font-black tracking-wider uppercase border border-hvac-secondary/30">
              MẠNG LƯỚI PHỤC VỤ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Khu Vực Phục Vụ Nhanh Tại Phú Quốc
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Đội ngũ kỹ thuật viên túc trực tại tất cả các khu vực trọng điểm của đảo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageAreas.map((area) => (
              <CoverageCard key={area} areaName={area} responseTime="15 - 20 Phút" />
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SHOWCASE (Grid Cards) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
              CÔNG TRÌNH TIÊU BIỂU
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-hvac-navy">
              Dự Án Đã Thi Công Tại Phú Quốc
            </h2>
          </div>
          <a
            href={`tel:${config.hotlineRaw}`}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-hvac-secondary hover:underline"
          >
            <span>Tư vấn công trình lớn</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>

      {/* 7. PARTNERS & BRANDS (Logo Showcase Wall) */}
      <PartnersSection />

      {/* 8. TESTIMONIALS (Customer Review Cards) */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-xl bg-hvac-accent/10 text-hvac-accent text-xs font-black tracking-wider uppercase border border-hvac-accent/20">
              ĐÁNH GIÁ TỪ KHÁCH HÀNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-hvac-navy">
              Ý Kiến Khách Hàng Tại Phú Quốc
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Xem đánh giá thực tế từ các hộ gia đình, chủ homestay, nhà hàng và khách sạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. BLOG (Toàn Cầu Cook Reference Structure) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
              GÓC TƯ VẤN & MẸO HAY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-hvac-navy">
              Kinh Nghiệm Sửa Chữa & Bảo Trì Máy Lạnh
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-hvac-primary hover:text-hvac-secondary transition-colors"
          >
            <span>Đọc tất cả bài viết</span>
            <ChevronRight className="w-4 h-4 text-hvac-secondary" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-xl bg-hvac-primary/10 text-hvac-primary text-xs font-black tracking-wider uppercase">
            HỎI ĐÁP DỊCH VỤ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-hvac-navy">
            Câu Hỏi Thường Gặp
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card-soft space-y-2">
              <h3 className="font-extrabold text-base text-hvac-navy flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-hvac-secondary shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA (High-Converting Callout) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-hvac-navy via-hvac-primary to-hvac-primaryDark text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-xl bg-hvac-secondary text-white font-black text-xs uppercase tracking-widest shadow-md">
              HỖ TRỢ CẤP CỨU 24/7
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              Máy lạnh gặp sự cố?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Liên hệ ngay để được hỗ trợ nhanh tại Phú Quốc. Thợ có mặt sau 20 phút, báo giá minh bạch!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <a
              href={`tel:${config.hotlineRaw}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-hvac-secondary hover:bg-hvac-secondaryHover text-white font-black text-base shadow-glow-orange hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <PhoneCall className="w-5 h-5" />
              <span>GỌI TƯ VẤN MIỄN PHÍ: 0961 316 346</span>
            </a>
            <a
              href={config.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-base border border-white/30 backdrop-blur-md hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-cyan-300" />
              <span>CHAT ZALO VỚI THỢ</span>
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  );
}
